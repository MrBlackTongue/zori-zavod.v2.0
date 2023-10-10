import React, { useState } from 'react';
import { Button, FloatButton, Input, Space, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import '../../App.css';
import {
  createOperation,
  deleteOperationById,
  updateOperation,
} from '../../services';
import { TypeOperation, TypeOperationFormValue } from '../../types';
import { TableOperation } from './components/TableOperation';
import { CreateModalOperation } from './components/CreateModalOperation';
import { UpdateDrawerOperation } from './components/UpdateDrawerOperation';

export const PageOperation: React.FC = () => {
  const { Title } = Typography;

  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной операции, Текст поиска
  const [selectedOperationId, setSelectedOperationId] = useState<number>();
  const [searchText, setSearchText] = useState<string>('');

  // Добавить новую операцию
  const handleCreateOperation = async (
    values: TypeOperationFormValue,
  ): Promise<void> => {
    const operation: TypeOperation = {
      title: values.title,
      unit: { id: values.unit },
      rate: values.rate,
    };
    setIsModalOpen(false);
    await createOperation(operation);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedOperationId(id);
    setIsDrawerOpen(true);
  };

  // Обновить операцию
  const handleUpdateOperation = async (
    values: TypeOperationFormValue,
  ): Promise<void> => {
    const operation: TypeOperation = {
      id: selectedOperationId,
      title: values.title,
      unit: { id: values.unit },
      rate: values.rate,
    };
    setIsDrawerOpen(false);
    await updateOperation(operation);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteOperation = async (id: number): Promise<void> => {
    await deleteOperationById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Типы операций</Title>
        <Space>
          <Input
            allowClear
            style={{ width: '210px' }}
            placeholder="Поиск по операциям"
            onChange={event => setSearchText(event.target.value)}
            prefix={<SearchOutlined />}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}>
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableOperation
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteOperation}
        searchText={searchText}
      />
      <CreateModalOperation
        isOpen={isModalOpen}
        createItem={handleCreateOperation}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerOperation
        isOpen={isDrawerOpen}
        selectedItemId={selectedOperationId}
        updateItem={handleUpdateOperation}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
