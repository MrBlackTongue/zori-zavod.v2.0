import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { createClient, deleteClientById, updateClient } from '../../services';
import { TypeClient, TypeClientFormValue } from '../../types';
import { TableClient } from './components/TableClient';
import { CreateModalClient } from './components/CreateModalClient';
import { UpdateDrawerClient } from './components/UpdateDrawerClient';
import AddButton from '../../components/AddButton/AddButton';

export const PageClient: React.FC = () => {
  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного клиента
  const [selectedClientId, setSelectedClientId] = useState<number>();

  // Добавить нового клиента
  const handleCreateClient = async (
    values: TypeClientFormValue,
  ): Promise<void> => {
    const client: TypeClient = {
      title: values.title,
    };
    setIsModalOpen(false);
    await createClient(client);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedClientId(id);
    setIsDrawerOpen(true);
  };

  // Обновить клиента
  const handleUpdateClient = async (
    values: TypeClientFormValue,
  ): Promise<void> => {
    const client: TypeClient = {
      id: selectedClientId,
      title: values.title,
    };
    setIsDrawerOpen(false);
    await updateClient(client);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteClient = async (id: number): Promise<void> => {
    await deleteClientById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButton setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableClient
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteClient}
      />
      <CreateModalClient
        isOpen={isModalOpen}
        createItem={handleCreateClient}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerClient
        isOpen={isDrawerOpen}
        selectedItemId={selectedClientId}
        updateItem={handleUpdateClient}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
