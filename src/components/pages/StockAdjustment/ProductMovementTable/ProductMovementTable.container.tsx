import React, { useCallback, useEffect, useState } from 'react';
import { TypeProductMovement } from '../../../../types';
import { useParams } from 'react-router-dom';
import {
  createProductMovement,
  deleteProductMovementByIdAndEntityType,
  getProductMovementByIdAndEntityType,
  updateProductMovement,
} from '../../../../api';
import { useLoadingAndSaving } from '../../../../contexts/LoadingAndSavingContext';
import { ProductMovementTableView } from './ProductMovementTable.view';

const ENTITY_TYPE = 'STOCK_ADJUSTMENT';

export const ProductMovementTableContainer = () => {
  const { setIsSaving } = useLoadingAndSaving();

  const [dataSource, setDataSource] = useState<TypeProductMovement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;

  // Обновить таблицу
  const updateTable = useCallback(() => {
    if (itemId) {
      setIsLoading(true);
      getProductMovementByIdAndEntityType(ENTITY_TYPE, itemId)
        .then(data => {
          if (data) {
            const newDataSource = data.map((item, index) => ({
              ...item,
              key: index.toString(),
            }));
            setDataSource(newDataSource);
          }
        })
        .catch(error => console.error('Ошибка при получении данных: ', error))
        .finally(() => setIsLoading(false));
    }
  }, [itemId]);

  const addNewRow = () => {
    const newRow: TypeProductMovement = {
      stock: { id: undefined },
      amount: 0,
    };

    setDataSource(prevDataSource => [
      ...prevDataSource,
      { ...newRow, key: prevDataSource.length.toString() },
    ]);
  };

  const updateRow = useCallback(async (row: TypeProductMovement) => {
    const { key, date, ...rowWithoutKeyDate } = row;
    await updateProductMovement(rowWithoutKeyDate);
  }, []);

  const createNewRow = useCallback(
    async (row: TypeProductMovement) => {
      const { key, date, ...rowWithoutKeyDate } = row;
      const response = await createProductMovement(
        ENTITY_TYPE,
        itemId!,
        rowWithoutKeyDate,
      );
      if (response?.data?.id) {
        row.id = response.data.id;
      }
    },
    [itemId],
  );

  const deleteRow = useCallback(
    async (row: TypeProductMovement) => {
      setIsSaving(true);

      if (row.id) {
        try {
          await deleteProductMovementByIdAndEntityType(ENTITY_TYPE, row.id);
        } catch (error) {
          console.error('Ошибка при удалении данных:', error);
        }
      }

      setDataSource(prevDataSource =>
        prevDataSource.filter(item => item.key !== row.key),
      );

      updateTable();
      setIsSaving(false);
    },
    [setIsSaving, updateTable],
  );

  const updateDataSource = useCallback((row: TypeProductMovement) => {
    setDataSource(prevDataSource => {
      const newData = [...prevDataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      return newData;
    });
  }, []);

  const onSaveAmount = useCallback(
    async (row: TypeProductMovement) => {
      try {
        const isExistingRow = !!row.id;
        const originalItem = dataSource.find(item => item.key === row.key);
        const isNewRowValid = row.stock?.id;
        const isAmountUnchanged =
          originalItem && originalItem.amount === row.amount;

        if (isExistingRow && isAmountUnchanged) {
          return;
        }

        if (isExistingRow) {
          setIsSaving(true);
          await updateRow(row);
        } else if (isNewRowValid) {
          setIsSaving(true);
          await createNewRow(row);
        } else {
          return;
        }

        updateDataSource(row);
        updateTable();
      } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
      } finally {
        setIsSaving(false);
      }
    },
    [
      createNewRow,
      dataSource,
      setIsSaving,
      updateDataSource,
      updateRow,
      updateTable,
    ],
  );

  const onSaveStock = useCallback(
    async (key: string, stockId: number | undefined) => {
      setIsSaving(true);
      try {
        const newData = [...dataSource];
        const index = newData.findIndex(item => key === item.key);
        const item = newData[index];
        const updatedItem = {
          ...item,
          stock: { id: stockId },
          amount: 0,
        };

        const isExistingRow = !!item.id;

        if (isExistingRow) {
          await updateRow(updatedItem);
        } else if (itemId) {
          await createNewRow(updatedItem);
          updatedItem.id = dataSource.length + 1;
        }

        updateDataSource(updatedItem);
        updateTable();
      } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
      } finally {
        setIsSaving(false);
      }
    },
    [
      dataSource,
      itemId,
      createNewRow,
      setIsSaving,
      updateRow,
      updateTable,
      updateDataSource,
    ],
  );

  useEffect(() => {
    updateTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductMovementTableView
      dataSource={dataSource}
      isLoading={isLoading}
      addNewRow={addNewRow}
      deleteRow={deleteRow}
      onSaveAmount={onSaveAmount}
      onSaveStock={onSaveStock}
    />
  );
};
