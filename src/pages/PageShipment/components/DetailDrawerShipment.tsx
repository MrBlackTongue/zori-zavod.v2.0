import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Space} from "antd";
import {DetailDrawerProps, TypeShipment, TypeShipmentProductMovement} from "../../../types";
import {TableDetailShipment} from "./TableDetailShipment";
import {PlusOutlined, SyncOutlined} from "@ant-design/icons";
import {
  deleteShipmentProductMovementById,
  getShipmentById,
  postNewShipmentProductMovement
} from "../../../services";
import {AddModalDetailShipment} from "./AddModalDetailShipment";


export const DetailDrawerShipment: React.FC<DetailDrawerProps<TypeShipment>> = ({
                                                                                  isOpen,
                                                                                  closeDrawer,
                                                                                  selectedItemId
                                                                                }) => {

  // Состояния для обновления таблицы, модального окна, выбранная отгрузка
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<TypeShipment>();

  // Функция добавления нового товара в отгрузку
  const handleAddShipmentMovement = (values: TypeShipmentProductMovement): void => {
    const productMovement: TypeShipmentProductMovement = {
      // date: selectedShipment?.date,
      stock: values['stock'],
      amount: values['amount'],
      shipment: selectedShipment,
      income: false
    };
    setIsModalOpen(false)
    postNewShipmentProductMovement(productMovement)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteShipmentMovement = (id: number): void => {
    deleteShipmentProductMovementById(id).catch((error) => console.error(error));
    setIsTableUpdate(prevState => !prevState)
  };

  // Функция для получения данных об отгрузке по id и обновления формы
  const handleGetShipment = useCallback((): void => {
    if (selectedItemId) {
      getShipmentById(selectedItemId).then((shipment) => setSelectedShipment(shipment))
    }
  }, [selectedItemId]);

  useEffect(() => {
    handleGetShipment();
  }, [selectedItemId, handleGetShipment]);

  return (
    <Drawer
      title="Отгруженные товары"
      placement={"bottom"}
      height={400}
      open={isOpen}
      onClose={closeDrawer}
      extra={
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsTableUpdate(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      }
    >
      <TableDetailShipment
        isUpdateTable={isTableUpdate}
        idDetail={selectedShipment?.id}
        onDelete={handleDeleteShipmentMovement}
      />
      <AddModalDetailShipment
        isOpen={isModalOpen}
        addItem={handleAddShipmentMovement}
        onCancel={() => setIsModalOpen(false)}
      />
    </Drawer>
  );
}