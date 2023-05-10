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

  // Состояние для обновления таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Состояния для хранения ID отгрузки
  const [selectedShipmentId, setSelectedShipmentId] = useState<number>();

  // Состояния для контроля открытия/закрытия модалки и драверов
  const [openStates, setOpenStates] = useState({
    isModalOpen: false,
    isDrawerOpen: false,
    isBottomDrawerOpen: false,
  });

  // Функция добавления новой отгрузки с использованием useCallback для предотвращения ненужных рендеров
  const addShipment = useCallback((values: { [key: string]: any }): void => {
    const shipment: TypeShipment = {
      date: values['date'].format('YYYY-MM-DD'),
      client: values.client,
    };
    setOpenStates({...openStates, isModalOpen: false});
    postNewShipment(shipment);
    setUpdateTable(!updateTable);
  }, [openStates]);

  // Функция открытия дравера редактирования отгрузки с использованием useCallback
  const openDrawer = useCallback((shipmentId: number) => {
    setSelectedShipmentId(shipmentId);
    setOpenStates({...openStates, isDrawerOpen: true});
  }, [openStates]);

  // Функция открытия детального дравера отгрузки с использованием useCallback
  const openDetailShipment = useCallback((shipmentId: number) => {
    setSelectedShipmentId(shipmentId);
    setOpenStates({...openStates, isBottomDrawerOpen: true});
  }, [openStates]);

  // Функция обновления отгрузки с использованием useCallback для предотвращения ненужных рендеров
  const updateShipment = useCallback((values: { [key: string]: any }): void => {
    const shipment: TypeShipment = {
      date: values['date'].format('YYYY-MM-DD'),
      id: selectedShipmentId,
      client: values.client,
    };
    setOpenStates({...openStates, isDrawerOpen: false});
    putChangeShipment(shipment);
    setUpdateTable(!updateTable);
  }, [openStates, selectedShipmentId]);

  // Удалить строку из таблицы
  const handleDeleteShipment = async (id: number) => {
    await deleteShipmentById(id)
    setUpdateTable(!updateTable)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Отгрузки</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setOpenStates({...openStates, isModalOpen: true})}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableShipment
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteShipment}
        openDetailDrawer={openDetailShipment}
      />
      <AddModalShipment
        isOpen={openStates.isModalOpen}
        addItem={addShipment}
        onCancel={() => setOpenStates({...openStates, isModalOpen: false})}
      />
      <EditDrawerShipment
        isOpen={openStates.isDrawerOpen}
        selectedItemId={selectedShipmentId}
        updateItem={updateShipment}
        closeDrawer={() => setOpenStates({...openStates, isDrawerOpen: false})}
      />
      <DetailDrawerShipment
        selectedItemId={selectedShipmentId}
        isOpen={openStates.isBottomDrawerOpen}
        closeDrawer={() => setOpenStates({...openStates, isBottomDrawerOpen: false})}
      />
    </div>
  );
};