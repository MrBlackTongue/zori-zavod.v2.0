import React, {useState, useEffect} from 'react';
import {
  Typography,
  Space,
  Button,
  Form,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../App.css'
import {postNewShipment, putChangeShipment} from "../../services";
import {TypeShipment} from "../../types";
import {TableShipment} from "./components/TableShipment";
import {AddModalShipment} from "./components/AddModalShipment";
import {EditDrawerShipment} from "./components/EditDrawerShipment";
import {DetailDrawerShipment} from "./detail/DetailDrawerShipment";

const {Title} = Typography;

export const PageShipment: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Отгрузки
  const [Shipment] = useState<TypeShipment | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  // Выбрана отгрузка по id
  const [selectedShipmentId, setSelectedShipmentId] = useState<number>();

  // Добавить новую отгрузку
  const addShipment = (values: { [key: string]: any }): TypeShipment => {
    const shipment: TypeShipment = {
      date: values['date'].format('YYYY-MM-DD'),
      client: values['client'],
    };
    setIsModalOpen(false)
    postNewShipment(shipment)
    setUpdateTable(!updateTable)
    return shipment;
  };

  // Открыть дравер
  const openDrawer = (ShipmentId: number) => {
    setSelectedShipmentId(ShipmentId)
    setIsDrawerOpen(true);
  };

  const openDetailShipment = (shipmentId: number) => {
    setSelectedShipmentId(shipmentId);
    setIsBottomDrawerOpen(true)
  };

  // Обновить отгрузку
  const updateShipment = (values: { [key: string]: any }): TypeShipment => {
    const Shipment: TypeShipment = {
      date: values['date'].format('YYYY-MM-DD'),
      id: selectedShipmentId,
      client: values.client,
    };
    setIsDrawerOpen(false)
    putChangeShipment(Shipment)
    setUpdateTable(!updateTable)
    return Shipment
  };

  useEffect(() => {
    if (Shipment) {
      form.setFieldsValue(Shipment);
    }
  }, [Shipment, form]);

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
              setIsModalOpen(true)
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
        isOpen={isModalOpen}
        addItem={addShipment}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerShipment
        isOpen={isDrawerOpen}
        selectedItemId={selectedShipmentId}
        updateItem={updateShipment}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
      <DetailDrawerShipment
        selectedItemId={selectedShipmentId}
        isOpen={isBottomDrawerOpen}
        closeDrawer={() => {
          setIsBottomDrawerOpen(false);
        }}
      />
    </div>
  );
};