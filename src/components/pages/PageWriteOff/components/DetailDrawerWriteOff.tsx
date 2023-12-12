import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import {
  DetailDrawerProps,
  TypeWriteOffMovement,
  TypeWriteOffMovementFormValue,
} from '../../../../types';
import { TableDetailWriteOff } from './TableDetailWriteOff';
import { PlusOutlined } from '@ant-design/icons';
import {
  createWriteOffMovement,
  deleteWriteOffMovementById,
} from '../../../../services';
import dayjs from 'dayjs';
import { CreateModalDetailWriteOff } from './CreateModalDetailWriteOff';

export const DetailDrawerWriteOff: React.FC<DetailDrawerProps> = ({
  isOpen,
  onCancel,
  selectedItemId,
}) => {
  // Обновление таблицы, открыть закрыть модальное окно
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Функция добавления нового движения товара в списание
  const handleCreateWriteOffMovement = async (
    values: TypeWriteOffMovementFormValue,
  ): Promise<void> => {
    const writeOffMovement: TypeWriteOffMovement = {
      amount: values.amount,
      income: values.income,
      stock: { id: values.stock },
      date: dayjs(values.date).format('YYYY-MM-DD'),
      writeOff: { id: selectedItemId },
    };
    setIsModalOpen(false);
    await createWriteOffMovement(writeOffMovement);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteWriteOffMovement = async (id: number): Promise<void> => {
    await deleteWriteOffMovementById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <Drawer
      title="Движение товара"
      placement={'bottom'}
      height={400}
      open={isOpen}
      onClose={onCancel}
      extra={
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}>
            Добавить
          </Button>
        </Space>
      }>
      <TableDetailWriteOff
        isUpdateTable={isUpdateTable}
        idDetail={selectedItemId}
        onDelete={handleDeleteWriteOffMovement}
      />
      <CreateModalDetailWriteOff
        isOpen={isModalOpen}
        createItem={handleCreateWriteOffMovement}
        onCancel={() => setIsModalOpen(false)}
      />
    </Drawer>
  );
};
