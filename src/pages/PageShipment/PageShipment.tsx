import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form} from 'antd';
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

  const [form] = Form.useForm();

  // Состояние для обновления таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Состояние для хранения отгрузки
  const [shipment] = useState<TypeShipment | null>(null);

  // Состояния для открытия/закрытия модального окна и драверов
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  // Состояния для хранения выбранной отгрузки по ID и самой отгрузки
  const [selectedShipmentId, setSelectedShipmentId] = useState<number>();
  const [selectedShipment, setSelectedShipment] = useState<TypeShipment>();

  // Функция для добавления новой отгрузки
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

  // Функция для открытия дравера редактирования отгрузки
  const openDrawer = (shipmentId: number) => {
    setSelectedShipmentId(shipmentId)
    setIsDrawerOpen(true);
  };

  // Функция для открытия детального дравера отгрузки
  const openDetailShipment = (shipment: TypeShipment) => {
    setSelectedShipment(shipment);
    setIsBottomDrawerOpen(true)
  };

  // Функция для обновления отгрузки
  const updateShipment = (values: { [key: string]: any }): TypeShipment => {
    const shipment: TypeShipment = {
      date: values['date'].format('YYYY-MM-DD'),
      id: selectedShipmentId,
      client: values.client,
    };
    setIsDrawerOpen(false)
    putChangeShipment(shipment)
    setUpdateTable(!updateTable)
    return shipment
  };

  // Эффект для установки значений формы при наличии отгрузки
  useEffect(() => {
    if (shipment) {
      form.setFieldsValue(shipment);
    }
  }, [shipment, form]);

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
        selectedItem={selectedShipment}
        isOpen={isBottomDrawerOpen}
        closeDrawer={() => {
          setIsBottomDrawerOpen(false);
        }}
      />
    </div>
  );
};