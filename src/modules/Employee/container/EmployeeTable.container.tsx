import React, { useCallback, useEffect, useState } from 'react';
import type { TablePaginationConfig } from 'antd/es/table';
import type { TableRowSelection } from 'antd/lib/table/interface';
import {
  deleteEmployeeById,
  EMPLOYEE,
  getAllEmployee,
} from '../../../services';
import { TypeEmployee } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { EmployeeTableView } from '../view/EmployeeTable.view';

export const EmployeeTableContainer = () => {
  const navigate = useNavigate();

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

  // Spinner и список всех сотрудников
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allEmployee, setAllEmployee] = useState<TypeEmployee[]>();

  // Состояние для выбранных строк
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const hasSelected = selectedRowKeys.length > 0;

  // Переход на другую страницу по адресу
  const handleNavigateToEmployeeForm = (id?: number): void => {
    const path = id ? `${EMPLOYEE}/${id}` : EMPLOYEE;
    navigate(path);
  };

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Обработчик выбора строк
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Конфигурация для rowSelection
  const rowSelection: TableRowSelection<TypeEmployee> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Функция для очистки выбранных строк
  const handleClearSelected = () => {
    setSelectedRowKeys([]);
  };

  // Функция массового удаления
  const handleDeleteSelected = async () => {
    setIsLoading(true);
    // Проходим по всем выбранным ключам и удаляем соответствующие записи
    await Promise.all(
      selectedRowKeys.map(key => deleteEmployeeById(Number(key))),
    );
    setSelectedRowKeys([]);
    setIsUpdateTable(prev => !prev);
    setIsLoading(false);
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllEmployee()
      .then(data => {
        setAllEmployee(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  useEffect(() => {
    handleUpdateTable();
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <EmployeeTableView
      allEmployee={allEmployee}
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
