import React, { useCallback, useEffect, useState } from 'react';
import { CLIENT, deleteClientById, getAllClient } from '../../../services';
import { TypeClient } from '../../../types';
import { ClientTableView } from './ClientTable.view';
import { useNavigate } from 'react-router-dom';
import { TableRowSelection } from 'antd/lib/table/interface';
import usePagination from '../../../hooks/usePagination';

export const ClientTableContainer = () => {
  const navigate = useNavigate();

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

  // Spinner и список всех клиентов
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allClient, setAllClient] = useState<TypeClient[]>();

  // Состояние для выбранных строк
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Использование хука для пагинации
  const { pagination, handleChangeTable } = usePagination(10);

  const hasSelected = selectedRowKeys.length > 0;

  // Переход на другую страницу по адресу
  const handleNavigateToClientForm = (id?: number): void => {
    const path = id ? `${CLIENT}/${id}` : CLIENT;
    navigate(path);
  };

  // Обработчик выбора строк
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Конфигурация для rowSelection
  const rowSelection: TableRowSelection<TypeClient> = {
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
      selectedRowKeys.map(key => deleteClientById(Number(key))),
    );
    setSelectedRowKeys([]);
    setIsUpdateTable(prev => !prev);
    setIsLoading(false);
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllClient()
      .then(data => {
        setAllClient(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  useEffect(() => {
    handleUpdateTable();
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <ClientTableView
      allClient={allClient}
      isLoading={isLoading}
      pagination={pagination}
      selectedRowKeys={selectedRowKeys}
      hasSelected={hasSelected}
      rowSelection={rowSelection}
      handleNavigateToClientForm={handleNavigateToClientForm}
      handleChangeTable={handleChangeTable}
      handleDeleteSelected={handleDeleteSelected}
      handleClearSelected={handleClearSelected}
    />
  );
};
