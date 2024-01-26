import React, { useCallback, useEffect } from 'react';
import { deleteWriteOffById, getAllWriteOff, WRITE_OFF } from '../../../../api';
import { TypeWriteOff } from '../../../../types';
import { WriteOffTableView } from './WriteOffTable.view';
import { useDataListLoader } from '../../../../hooks';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';
import usePagination from '../../../../hooks/usePagination';
import useRowSelection from '../../../../hooks/useRowSelection';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';

export const WriteOffTableContainer = () => {
  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeWriteOff[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(WRITE_OFF);

  // Хук для выбора строк
  const {
    hasSelected,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  } = useRowSelection<TypeWriteOff>();

  // Функция массового удаления
  const handleDeleteSelected = useCallback(() => {
    (async () => {
      try {
        // Проходим по всем выбранным ключам и удаляем соответствующие записи
        await Promise.all(
          selectedRowKeys.map(key => deleteWriteOffById(Number(key))),
        );
        await getDataList(getAllWriteOff);
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
    getDataList(getAllWriteOff).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    });
  }, [getDataList]);

  return (
    <BasicTableProvider<TypeWriteOff>
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
      <WriteOffTableView />
    </BasicTableProvider>
  );
};
