import React, {useState, useCallback} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css'
import {postNewShipment, putChangeShipment, deleteShipmentById} from "../../services";
import {TypeShipment} from "../../types";
import {TableShipment} from "./components/TableShipment";
import {AddModalShipment} from "./components/AddModalShipment";
import {EditDrawerShipment} from "./components/EditDrawerShipment";
import {DetailDrawerShipment} from "./components/DetailDrawerShipment";

const {Title} = Typography;

export const PageShipment: React.FC = () => {

  // Состояние для обновления таблицы, id выбранной отгрузки
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState<number>();

  // Состояния для контроля открытия/закрытия модалки и драверов
  const [openState, setOpenState] = useState({
    isModalOpen: false,
    isDrawerOpen: false,
    isBottomDrawerOpen: false,
  });

  // Функция добавления новой отгрузки
  const handleAddShipment = useCallback((values: { [key: string]: any }): void => {
    const shipment: TypeShipment = {
      date: values['date'].format('YYYY-MM-DD'),
      client: values.client,
    };
    setOpenState({...openState, isModalOpen: false});
    postNewShipment(shipment);
    setIsTableUpdate(prevState => !prevState);
  }, [openState]);

  // Функция открытия дравера редактирования отгрузки
  const openDrawer = useCallback((shipmentId: number) => {
    setSelectedShipmentId(shipmentId);
    setOpenState({...openState, isDrawerOpen: true});
  }, [openState]);

  // Функция открытия детального дравера отгрузки с использованием useCallback
  const openDetailShipment = useCallback((shipmentId: number) => {
    setSelectedShipmentId(shipmentId);
    setOpenState({...openState, isBottomDrawerOpen: true});
  }, [openState]);

  // Функция обновления отгрузки
  const handleUpdateShipment = useCallback((values: { [key: string]: any }): void => {
    const shipment: TypeShipment = {
      id: selectedShipmentId,
      date: values['date'].format('YYYY-MM-DD'),
      client: values.client,
    };
    setOpenState({...openState, isDrawerOpen: false});
    putChangeShipment(shipment);
    setIsTableUpdate(prevState => !prevState);
  }, [openState, selectedShipmentId]);

  // Удалить запись из таблицы
  const handleDeleteShipment = (id: number): void => {
    deleteShipmentById(id).catch((error) => console.error(error));
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Отгрузки</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsTableUpdate(prevState => !prevState)}
            className='greenButton'>
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
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeleteShipment}
        openDetailDrawer={openDetailShipment}
      />
      <AddModalShipment
        isOpen={openState.isModalOpen}
        addItem={handleAddShipment}
        onCancel={() => setOpenState({...openState, isModalOpen: false})}
      />
      <EditDrawerShipment
        isOpen={openState.isDrawerOpen}
        selectedItemId={selectedShipmentId}
        updateItem={handleUpdateShipment}
        closeDrawer={() => setOpenState({...openState, isDrawerOpen: false})}
      />
      <DetailDrawerShipment
        selectedItemId={selectedShipmentId}
        isOpen={openState.isBottomDrawerOpen}
        closeDrawer={() => setOpenState({...openState, isBottomDrawerOpen: false})}
      />
    </div>
  );
};