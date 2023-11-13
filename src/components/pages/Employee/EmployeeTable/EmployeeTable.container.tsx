import React, { useCallback, useEffect } from 'react';
import {
  deleteEmployeeById,
  EMPLOYEE,
  getAllEmployee,
} from '../../../../services';
import { TypeEmployee } from '../../../../types';
import { EmployeeTableView } from './EmployeeTable.view';
import usePagination from '../../../../hooks/usePagination';
import useRowSelection from '../../../../hooks/useRowSelection';
import { useDataListLoader } from '../../../../hooks';
import useNavigateToPath from '../../../../hooks/useNavigateToPath';
import { BasicTableProvider } from '../../../../contexts/BasicTableContext';

export const EmployeeTableContainer = () => {
  // Хук для загрузки и получения всех данных
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeEmployee[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для навигации
  const handleNavigateToForm = useNavigateToPath(EMPLOYEE);

  // Хук для выбора строк
  const {
    hasSelected,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  } = useRowSelection<TypeEmployee>();

  // Функция массового удаления
  const handleDeleteSelected = useCallback(() => {
    (async () => {
      try {
        // Проходим по всем выбранным ключам и удаляем соответствующие записи
        await Promise.all(
          selectedRowKeys.map(key => deleteEmployeeById(Number(key))),
        );
        await getDataList(getAllEmployee);
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
    getDataList(getAllEmployee).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    });
  }, [getDataList]);

  return (
    <BasicTableProvider<TypeEmployee>
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
      <EmployeeTableView />
    </BasicTableProvider>
  );
};
