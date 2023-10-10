import React, { useState } from 'react';
import { Button, FloatButton, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../App.css';
import { createMeter, deleteMeterById, updateMeter } from '../../services';
import { TypeMeter, TypeMeterFormValue } from '../../types';
import { TableMeter } from './components/TableMeter';
import { CreateModalMeter } from './components/CreateModalMeter';
import { UpdateDrawerMeter } from './components/UpdateDrawerMeter';

export const PageMeter: React.FC = () => {
  const { Title } = Typography;

  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного счетчика
  const [selectedMeterId, setSelectedMeterId] = useState<number>();

  // Добавить новый счетчик
  const handleCreateMeter = async (
    values: TypeMeterFormValue,
  ): Promise<void> => {
    const meter: TypeMeter = {
      serialNumber: values.serialNumber,
      title: values.title,
      meterType: { id: values.meterType },
    };
    setIsModalOpen(false);
    await createMeter(meter);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedMeterId(id);
    setIsDrawerOpen(true);
  };

  // Обновить счетчик
  const handleUpdateMeter = async (
    values: TypeMeterFormValue,
  ): Promise<void> => {
    const meter: TypeMeter = {
      id: selectedMeterId,
      serialNumber: values.serialNumber,
      title: values.title,
      meterType: { id: values.meterType },
    };
    setIsDrawerOpen(false);
    await updateMeter(meter);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteMeter = async (id: number): Promise<void> => {
    await deleteMeterById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Счетчики</Title>
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
      <TableMeter
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteMeter}
      />
      <CreateModalMeter
        isOpen={isModalOpen}
        createItem={handleCreateMeter}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerMeter
        isOpen={isDrawerOpen}
        selectedItemId={selectedMeterId}
        updateItem={handleUpdateMeter}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
