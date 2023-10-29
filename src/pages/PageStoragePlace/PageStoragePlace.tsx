import React, { useState } from 'react';
import { Button, FloatButton, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  createStoragePlace,
  deleteStoragePlaceById,
  updateStoragePlace,
} from '../../services';
import { TypeStoragePlace, TypeStoragePlaceFormValue } from '../../types';
import { TableStoragePlace } from './components/TableStoragePlace';
import { CreateModalStoragePlace } from './components/CreateModalStoragePlace';
import { UpdateDrawerStoragePlace } from './components/UpdateDrawerStoragePlace';

export const PageStoragePlace: React.FC = () => {
  const { Title } = Typography;

  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного места хранения
  const [selectedStoragePlaceId, setSelectedStoragePlaceId] =
    useState<number>();

  // Добавить новое место хранения
  const handleCreateStoragePlace = async (
    values: TypeStoragePlaceFormValue,
  ): Promise<void> => {
    const storagePlace: TypeStoragePlace = {
      title: values.title,
    };
    setIsModalOpen(false);
    await createStoragePlace(storagePlace);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedStoragePlaceId(id);
    setIsDrawerOpen(true);
  };

  // Обновить место хранения
  const handleUpdateStoragePlace = async (
    values: TypeStoragePlaceFormValue,
  ): Promise<void> => {
    const storagePlace: TypeStoragePlace = {
      id: selectedStoragePlaceId,
      title: values.title,
    };
    setIsDrawerOpen(false);
    await updateStoragePlace(storagePlace);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteStoragePlace = async (id: number): Promise<void> => {
    await deleteStoragePlaceById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="content-title-bar">
        <Title level={3}>Место хранения</Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}>
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableStoragePlace
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteStoragePlace}
      />
      <CreateModalStoragePlace
        isOpen={isModalOpen}
        createItem={handleCreateStoragePlace}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerStoragePlace
        isOpen={isDrawerOpen}
        selectedItemId={selectedStoragePlaceId}
        updateItem={handleUpdateStoragePlace}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
