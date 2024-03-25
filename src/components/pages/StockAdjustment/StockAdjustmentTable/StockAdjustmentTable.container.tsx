import React, { useCallback, useEffect } from 'react';
import {
  deleteStockAdjustmentById,
  getAllStockAdjustment,
  STOCK_ADJUSTMENT,
} from '../../../../api';
import { TypeStockAdjustment } from '../../../../types';
import { StockAdjustmentTableView } from './StockAdjustmentTable.view';
import { useDataListLoader } from '../../../../hooks';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';
import usePagination from '../../../../hooks/usePagination';
import useRowSelection from '../../../../hooks/useRowSelection';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';

export const StockAdjustmentTableContainer = () => {
  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeStockAdjustment[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(STOCK_ADJUSTMENT);

  // Хук для выбора строк
  const {
    hasSelected,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  } = useRowSelection<TypeStockAdjustment>();

  // Функция массового удаления
  const handleDeleteSelected = useCallback(() => {
    (async () => {
      try {
        // Проходим по всем выбранным ключам и удаляем соответствующие записи
        await Promise.all(
          selectedRowKeys.map(key => deleteStockAdjustmentById(Number(key))),
        );
        await getDataList(getAllStockAdjustment);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Ошибка при удалении записи', error.message);
        }
      } finally {
        setSelectedRowKeys([]);
      }
    })();
  }, [selectedRowKeys, getDataList, setSelectedRowKeys]);

  useEffect(() => {
    getDataList(getAllStockAdjustment).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    });
  }, [getDataList]);

  return (
    <BasicTableProvider<TypeStockAdjustment>
      value={{
        data: dataList,
        isLoading,
        pagination,
        selectedRowKeys,
        hasSelected,
        rowSelection,
        handleNavigateToForm,
        handleChangeTable,
        handleDeleteSelected,
        handleClearSelected,
      }}>
      <StockAdjustmentTableView />
    </BasicTableProvider>
  );
};
