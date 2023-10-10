import React, { useState } from 'react';
import { Button, FloatButton, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../App.css';
import { createOutput, deleteOutputById, updateOutput } from '../../services';
import { TypeOutput, TypeOutputFormValue } from '../../types';
import { TableOutput } from './components/TableOutput';
import { CreateModalOutput } from './components/CreateModalOutput';
import { UpdateDrawerOutput } from './components/UpdateDrawerOutput';
import dayjs from 'dayjs';

export const PageOutput: React.FC = () => {
  const { Title } = Typography;

  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного выпуска продукции
  const [selectedOutputId, setSelectedOutputId] = useState<number>();

  // Добавить новый выпуск продукции
  const handleCreateOutput = async (
    values: TypeOutputFormValue,
  ): Promise<void> => {
    const output: TypeOutput = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      product: { id: values.product },
    };
    setIsModalOpen(false);
    await createOutput(output);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedOutputId(id);
    setIsDrawerOpen(true);
  };

  // Обновить выпуск продукции
  const handleUpdateOutput = async (
    values: TypeOutputFormValue,
  ): Promise<void> => {
    const output: TypeOutput = {
      id: selectedOutputId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      product: { id: values.product },
    };
    setIsDrawerOpen(false);
    await updateOutput(output);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteOutput = async (id: number): Promise<void> => {
    await deleteOutputById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Выпуски продукции</Title>
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
      <TableOutput
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteOutput}
      />
      <CreateModalOutput
        isOpen={isModalOpen}
        createItem={handleCreateOutput}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerOutput
        isOpen={isDrawerOpen}
        selectedItemId={selectedOutputId}
        updateItem={handleUpdateOutput}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
