import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { TypeProductMovement, TypeStock } from '../../../../types';
import { useParams } from 'react-router-dom';
import {
  createProductMovement,
  deleteProductMovementByIdAndEntityType,
  getAllStock,
  getProductMovementByIdAndEntityType,
  updateProductMovement,
} from '../../../../api';
import { EditableSelect } from '../../../molecules/EditableSelect/EditableSelect';
import { EditableInputNumber } from '../../../molecules/EditableInputNumber/EditableInputNumber';
import { renderNumber } from '../../../../utils';
import { useLoadingAndSaving } from '../../../../contexts/LoadingAndSavingContext';
import { DeleteRowButton } from '../../../atoms/DeleteRowButton/DeleteRowButton';
import { AddNewRowButton } from '../../../atoms/AddNewRowButton/AddNewRowButton';

const ENTITY_TYPE = 'STOCK_ADJUSTMENT';

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const ProductMovementTableContainer = () => {
  const { setIsSaving } = useLoadingAndSaving();

  const [dataSource, setDataSource] = useState<TypeProductMovement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;

  const columns: ColumnTypes = [
    {
      title: '',
      dataIndex: 'number',
      width: 40,
      render: (_, __, index) => index + 1 + '.',
    },
    {
      title: 'Товар',
      dataIndex: ['stock', 'product'],
      width: '40%',
      render: (_, record) => (
        <EditableSelect
          value={record.stock?.id}
          label={record.stock?.product?.title}
          placeholder="Выберите товар"
          fetchDataList={getAllStock}
          getId={item => item.id ?? 0}
          getLabel={item => item?.product?.title ?? ''}
          onValueChange={value => onSaveStock(record.key, value)}
        />
      ),
    },
    {
      title: 'Движение',
      dataIndex: 'amount',
      width: '20%',
      render: (_, record: TypeProductMovement) => (
        <EditableInputNumber
          dataIndex="amount"
          record={record}
          save={onSaveAmount}>
          {renderNumber(record.amount)}{' '}
          <span style={{ color: '#61666D' }}>
            {record.stock?.product?.unit?.name}
          </span>
        </EditableInputNumber>
      ),
    },
    {
      title: 'На складе',
      dataIndex: 'stock',
      render: (stock: TypeStock) => {
        const amount = stock?.amount ?? 0;
        const unitName = stock?.product?.unit?.name ?? '';
        return (
          <>
            {renderNumber(amount)}{' '}
            <span style={{ color: '#61666D' }}>{unitName}</span>
          </>
        );
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      width: '3%',
      align: 'center',
      render: (_, record) => (
        <DeleteRowButton record={record} deleteRow={deleteRow} />
      ),
    },
  ];

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

  const deleteRow = useCallback(async (row: TypeProductMovement) => {
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
  }, []);

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
    [dataSource, itemId],
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
    [dataSource, itemId],
  );

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

  useEffect(() => {
    updateTable();
  }, [updateTable]);

  return (
    <div>
      <Table
        bordered
        size={'small'}
        pagination={false}
        loading={isLoading}
        className={'editable-table'}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columns}
      />
      <AddNewRowButton onClick={addNewRow} />
    </div>
  );
};
