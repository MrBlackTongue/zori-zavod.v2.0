import React, { useCallback, useEffect } from 'react';
import { CLIENT, deleteClientById, getAllClient } from '../../../../api';
import { TypeClient } from '../../../../types';
import { ClientTableView } from './ClientTable.view';
import usePagination from '../../../../hooks/usePagination';
import { useDataListLoader } from '../../../../hooks';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';
import useRowSelection from '../../../../hooks/useRowSelection';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';

export const ClientTableContainer = () => {
  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeClient[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(CLIENT);

  // Хук для выбора строк
  const {
    hasSelected,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  } = useRowSelection<TypeClient>();

  // Функция массового удаления
  const handleDeleteSelected = useCallback(() => {
    (async () => {
      try {
        // Проходим по всем выбранным ключам и удаляем соответствующие записи
        await Promise.all(
          selectedRowKeys.map(key => deleteClientById(Number(key))),
        );
        await getDataList(getAllClient);
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
    getDataList(getAllClient).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    });
  }, [getDataList]);

  return (
    <BasicTableProvider<TypeClient>
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
      <ClientTableView />
    </BasicTableProvider>
  );
};
