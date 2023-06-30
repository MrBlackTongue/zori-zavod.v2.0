import React, {useState, useEffect, useCallback} from "react";
import {Button, Drawer, Space} from "antd";
import {
  DetailDrawerProps,
  TypeShipment,
  TypeShipmentProductMovement,
  TypeShipmentProductMovementFormValue
} from "../../../types";
import {TableDetailShipment} from "./TableDetailShipment";
import {PlusOutlined, SyncOutlined} from "@ant-design/icons";
import {
  deleteShipmentProductMovementById,
  getShipmentById,
  createShipmentProductMovement
} from "../../../services";
import {CreateModalDetailShipment} from "./CreateModalDetailShipment";

export const DetailDrawerShipment: React.FC<DetailDrawerProps<TypeShipment>> = ({
                                                                                  isOpen,
                                                                                  onCancel,
                                                                                  selectedItemId
                                                                                }) => {

  // Обновление таблицы, Открыть закрыть модальное окно, Выбранная отгрузка
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedShipment, setSelectedShipment] = useState<TypeShipment>();

  // Функция добавления нового товара в отгрузку
  const handleCreateShipmentMovement = (values: TypeShipmentProductMovementFormValue): void => {
    const productMovement: TypeShipmentProductMovement = {
      date: selectedShipment?.date,
      stock: {id: values.stock},
      amount: values.amount,
      shipment: {id: selectedShipment?.id},
      income: false
    };
    setIsModalOpen(false)
    void createShipmentProductMovement(productMovement)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteShipmentMovement = (id: number): void => {
    void deleteShipmentProductMovementById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  // Функция для получения данных об отгрузке по id и обновления формы
  const handleGetShipment = useCallback((): void => {
    if (selectedItemId) {
      void getShipmentById(selectedItemId).then((data) => setSelectedShipment(data))
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
      onClose={onCancel}
      extra={
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
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      }
    >
      <TableDetailShipment
        isUpdateTable={isUpdateTable}
        idDetail={selectedShipment?.id}
        onDelete={handleDeleteShipmentMovement}
      />
      <CreateModalDetailShipment
        isOpen={isModalOpen}
        createItem={handleCreateShipmentMovement}
        onCancel={() => setIsModalOpen(false)}
      />
    </Drawer>
  );
}