import React, {useState, useCallback} from 'react';
import {Typography, Space, Button} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css'
import {postNewShipment, putChangeShipment} from "../../services";
import {TypeShipment} from "../../types";
import {TableShipment} from "./components/TableShipment";
import {AddModalShipment} from "./components/AddModalShipment";
import {EditDrawerShipment} from "./components/EditDrawerShipment";
import {DetailDrawerShipment} from "./detail/DetailDrawerShipment";

const {Title} = Typography;

export const PageShipment: React.FC = () => {

  // Состояние для обновления таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Состояния для хранения выбранной отгрузки и её ID
  const [selectedShipmentId, setSelectedShipmentId] = useState<number>();
  const [selectedShipment, setSelectedShipment] = useState<TypeShipment>();

  // Состояния для контроля открытия/закрытия модалки и драверов
  const [openStates, setOpenStates] = useState({
    isModalOpen: false,
    isDrawerOpen: false,
    isBottomDrawerOpen: false,
  });

  // Функция добавления новой отгрузки с использованием useCallback для предотвращения ненужных рендеров
  const addShipment = useCallback((values: { [key: string]: any }): void => {
    const {date, client} = values;
    const shipment: TypeShipment = {
      date: date.format('YYYY-MM-DD'),
      client,
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
  const openDetailShipment = useCallback((shipment: TypeShipment) => {
    setSelectedShipment(shipment);
    setOpenStates({...openStates, isBottomDrawerOpen: true});
  }, [openStates]);

  // Функция обновления отгрузки с использованием useCallback для предотвращения ненужных рендеров
  const updateShipment = useCallback((values: { [key: string]: any }): void => {
    const {date, client} = values;
    const shipment: TypeShipment = {
      date: date.format('YYYY-MM-DD'),
      id: selectedShipmentId,
      client,
    };
    setOpenStates({...openStates, isDrawerOpen: false});
    putChangeShipment(shipment);
    setUpdateTable(!updateTable);
  }, [openStates, selectedShipmentId]);

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
            onClick={() => {
              setOpenStates({...openStates, isModalOpen: true});
            }}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <TableShipment
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        openDetailDrawer={openDetailShipment}
      />
      <AddModalShipment
        isOpen={openStates.isModalOpen}
        addItem={addShipment}
        onCancel={() => {
          setOpenStates({...openStates, isModalOpen: false});
        }}
      />
      <EditDrawerShipment
        isOpen={openStates.isDrawerOpen}
        selectedItemId={selectedShipmentId}
        updateItem={updateShipment}
        closeDrawer={() => {
          setOpenStates({...openStates, isDrawerOpen: false});
        }}
      />
      <DetailDrawerShipment
        selectedItem={selectedShipment}
        isOpen={openStates.isBottomDrawerOpen}
        closeDrawer={() => {
          setOpenStates({...openStates, isBottomDrawerOpen: false});
        }}
      />
    </div>
  );
};