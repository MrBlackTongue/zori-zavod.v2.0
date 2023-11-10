import React, { useCallback, useEffect } from 'react';
import {
  deleteEmployeeById,
  EMPLOYEE,
  getAllEmployee,
} from '../../../../services';
import { TypeEmployee } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { EmployeeTableView } from './EmployeeTable.view';
import usePagination from '../../../../hooks/usePagination';
import useRowSelection from '../../../../hooks/useRowSelection';
import { useDataListLoader } from '../../../../hooks';

export const EmployeeTableContainer = () => {
  const navigate = useNavigate();

  // Хук для получения всех данных и загрузки
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeEmployee[]>();

  // Хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  // Хук для выбора строк
  const {
    hasSelected,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  } = useRowSelection<TypeEmployee>();

  // Переход на другую страницу по адресу
  const handleNavigateToEmployeeForm = useCallback(
    (id?: number): void => {
      const path = id ? `${EMPLOYEE}/${id}` : EMPLOYEE;
      navigate(path);
    },
    [navigate],
  );

  // Функция массового удаления
  const handleDeleteSelected = useCallback(async () => {
    try {
      // Проходим по всем выбранным ключам и удаляем соответствующие записи
      await Promise.all(
        selectedRowKeys.map(key => deleteEmployeeById(Number(key))),
      );
      await getDataList(getAllEmployee);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Ошибка при удалении сотрудников', error.message);
      }
    } finally {
      setSelectedRowKeys([]);
    }
  }, [selectedRowKeys, getDataList, setSelectedRowKeys]);

  useEffect(() => {
    getDataList(getAllEmployee).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    });
  }, [getDataList]);

  return (
    <EmployeeTableView
      allEmployee={dataList}
      isLoading={isLoading}
      pagination={pagination}
      selectedRowKeys={selectedRowKeys}
      hasSelected={hasSelected}
      rowSelection={rowSelection}
      handleNavigateToEmployeeForm={handleNavigateToEmployeeForm}
      handleChangeTable={handleChangeTable}
      handleDeleteSelected={handleDeleteSelected}
      handleClearSelected={handleClearSelected}
    />
  );
};
