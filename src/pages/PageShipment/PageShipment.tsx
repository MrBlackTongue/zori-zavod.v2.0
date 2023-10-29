import React, { useState } from 'react';
import { Button, FloatButton, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  createShipment,
  deleteShipmentById,
  updateShipment,
} from '../../services';
import { TypeShipment, TypeShipmentFormValue } from '../../types';
import { TableShipment } from './components/TableShipment';
import { CreateModalShipment } from './components/CreateModalShipment';
import { UpdateDrawerShipment } from './components/UpdateDrawerShipment';
import { DetailDrawerShipment } from './components/DetailDrawerShipment';
import dayjs from 'dayjs';

export const PageShipment: React.FC = () => {
  const { Title } = Typography;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

  // Состояния для контроля открытия/закрытия modal и drawers
  const [openState, setOpenState] = useState({
    isModalOpen: false,
    isDrawerOpen: false,
    isBottomDrawerOpen: false,
  });

  //  id выбранной отгрузки
  const [selectedShipmentId, setSelectedShipmentId] = useState<number>();

  // Функция добавления новой отгрузки
  const handleCreateShipment = async (
    values: TypeShipmentFormValue,
  ): Promise<void> => {
    const shipment: TypeShipment = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      client: { id: values.client },
    };
    setOpenState({ ...openState, isModalOpen: false });
    await createShipment(shipment);
    setIsUpdateTable(prevState => !prevState);
  };

  // Функция открытия drawer редактирования отгрузки
  const openDrawer = (id: number): void => {
    setSelectedShipmentId(id);
    setOpenState({ ...openState, isDrawerOpen: true });
  };

  // Функция открытия детального drawer отгрузки
  const openDetailDrawer = (shipmentId: number): void => {
    setSelectedShipmentId(shipmentId);
    setOpenState({ ...openState, isBottomDrawerOpen: true });
  };

  // Функция обновления отгрузки
  const handleUpdateShipment = async (
    values: TypeShipmentFormValue,
  ): Promise<void> => {
    const shipment: TypeShipment = {
      id: selectedShipmentId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      client: { id: values.client },
    };
    setOpenState({ ...openState, isDrawerOpen: false });
    await updateShipment(shipment);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteShipment = async (id: number): Promise<void> => {
    await deleteShipmentById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="content-title-bar">
        <Title level={3}>Отгрузки</Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenState({ ...openState, isModalOpen: true })}>
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableShipment
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteShipment}
        openDetailDrawer={openDetailDrawer}
      />
      <CreateModalShipment
        isOpen={openState.isModalOpen}
        createItem={handleCreateShipment}
        onCancel={() => setOpenState({ ...openState, isModalOpen: false })}
      />
      <UpdateDrawerShipment
        isOpen={openState.isDrawerOpen}
        selectedItemId={selectedShipmentId}
        updateItem={handleUpdateShipment}
        onCancel={() => setOpenState({ ...openState, isDrawerOpen: false })}
      />
      <DetailDrawerShipment
        isOpen={openState.isBottomDrawerOpen}
        selectedItemId={selectedShipmentId}
        onCancel={() =>
          setOpenState({ ...openState, isBottomDrawerOpen: false })
        }
      />
    </div>
  );
};
