import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css'
import {createShipment, updateShipment, deleteShipmentById} from "../../services";
import {TypeShipment, TypeShipmentFormValue} from "../../types";
import {TableShipment} from "./components/TableShipment";
import {CreateModalShipment} from "./components/CreateModalShipment";
import {UpdateDrawerShipment} from "./components/UpdateDrawerShipment";
import {DetailDrawerShipment} from "./components/DetailDrawerShipment";
import dayjs from "dayjs";

export const PageShipment: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

  // Состояния для контроля открытия/закрытия модалки и драверов
  const [openState, setOpenState] = useState({
    isModalOpen: false,
    isDrawerOpen: false,
    isBottomDrawerOpen: false,
  });

  //  id выбранной отгрузки
  const [selectedShipmentId, setSelectedShipmentId] = useState<number>();

  // Функция добавления новой отгрузки
  const handleCreateShipment = (values: TypeShipmentFormValue): void => {
    const shipment: TypeShipment = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      client: {id: values.client},
    };
    setOpenState({...openState, isModalOpen: false});
    void createShipment(shipment);
    setIsUpdateTable(prevState => !prevState);
  }

  // Функция открытия дравера редактирования отгрузки
  const openDrawer = (shipmentId: number): void => {
    setSelectedShipmentId(shipmentId);
    setOpenState({...openState, isDrawerOpen: true});
  }

  // Функция открытия детального дравера отгрузки с использованием useCallback
  const openDetailShipment = (shipmentId: number): void => {
    setSelectedShipmentId(shipmentId);
    setOpenState({...openState, isBottomDrawerOpen: true});
  }

  // Функция обновления отгрузки
  const handleUpdateShipment = (values: TypeShipmentFormValue): void => {
    const shipment: TypeShipment = {
      id: selectedShipmentId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      client: {id: values.client},
    };
    setOpenState({...openState, isDrawerOpen: false});
    void updateShipment(shipment);
    setIsUpdateTable(prevState => !prevState);
  }

  // Удалить запись из таблицы
  const handleDeleteShipment = (id: number): void => {
    void deleteShipmentById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Отгрузки</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setOpenState({...openState, isModalOpen: true})}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableShipment
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteShipment}
        openDetailDrawer={openDetailShipment}
      />
      <CreateModalShipment
        isOpen={openState.isModalOpen}
        createItem={handleCreateShipment}
        onCancel={() => setOpenState({...openState, isModalOpen: false})}
      />
      <UpdateDrawerShipment
        isOpen={openState.isDrawerOpen}
        selectedItemId={selectedShipmentId}
        updateItem={handleUpdateShipment}
        onCancel={() => setOpenState({...openState, isDrawerOpen: false})}
      />
      <DetailDrawerShipment
        isOpen={openState.isBottomDrawerOpen}
        selectedItemId={selectedShipmentId}
        onCancel={() => setOpenState({...openState, isBottomDrawerOpen: false})}
      />
    </div>
  );
};