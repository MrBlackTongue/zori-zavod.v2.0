import React, { useState } from 'react';
import { Button, FloatButton, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../App.css';
import {
  createMeterRecord,
  deleteMeterRecordById,
  updateMeterRecord,
} from '../../services';
import { TypeMeterRecord, TypeMeterRecordFormValue } from '../../types';
import { TableMeterRecord } from './components/TableMeterRecord';
import { CreateModalMeterRecord } from './components/CreateModalMeterRecord';
import { UpdateDrawerMeterRecord } from './components/UpdateDrawerMeterRecord';
import dayjs from 'dayjs';

export const PageMeterRecord: React.FC = () => {
  const { Title } = Typography;

  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного типа счетчика
  const [selectedMeterRecordId, setSelectedMeterRecordId] = useState<number>();

  // Добавить новый тип счетчика
  const handleCreateMeterRecord = async (
    values: TypeMeterRecordFormValue,
  ): Promise<void> => {
    const meterRecord: TypeMeterRecord = {
      value: values.value,
      date: values.date
        ? dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss')
        : undefined,
      meter: { id: values.meter },
    };
    setIsModalOpen(false);
    await createMeterRecord(meterRecord);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedMeterRecordId(id);
    setIsDrawerOpen(true);
  };

  // Обновить запись счетчика
  const handleUpdateMeterRecord = async (
    values: TypeMeterRecordFormValue,
  ): Promise<void> => {
    const meterRecord: TypeMeterRecord = {
      id: selectedMeterRecordId,
      value: values.value,
      date: values.date
        ? dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss')
        : undefined,
      meter: { id: values.meter },
    };
    setIsDrawerOpen(false);
    await updateMeterRecord(meterRecord);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteMeterRecord = async (id: number): Promise<void> => {
    await deleteMeterRecordById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Записи счетчиков</Title>
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
      <TableMeterRecord
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteMeterRecord}
      />
      <CreateModalMeterRecord
        isOpen={isModalOpen}
        createItem={handleCreateMeterRecord}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerMeterRecord
        isOpen={isDrawerOpen}
        selectedItemId={selectedMeterRecordId}
        updateItem={handleUpdateMeterRecord}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
