import React, {useCallback, useEffect, useState} from "react";
import {Button, Drawer, Space} from "antd";
import {DetailProps, TypeShipment, TypeShipmentProductMovement} from "../../../types";
import {TableDetailShipment} from "./TableDetailShipment";
import {PlusOutlined, SyncOutlined} from "@ant-design/icons";
import {getShipmentById, postNewShipmentProductMovement} from "../../../services";
import {AddModalDetailShipment} from "./AddModalDetailShipment";


export const DetailDrawerShipment: React.FC<DetailProps<TypeShipment>> = ({
                                                                            isOpen,
                                                                            closeDrawer,
                                                                            selectedItemId
                                                                          }) => {

  // Состояния для обновления таблицы, модального окна и выбранной отгрузки
  const [updateTable, setUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<TypeShipment>();

  // Функция добавления нового товара в отгрузку
  const addShipmentMovement = (values: { [key: string]: any }): void => {
    const productMovement: TypeShipmentProductMovement = {
      date: selectedShipment?.date,
      stock: values['stock'],
      amount: values['amount'],
      shipment: selectedShipment,
      income: false
    };
    setIsModalOpen(false)
    postNewShipmentProductMovement(productMovement)
    setUpdateTable(!updateTable)
  };

  // Функция для получения данных об отгрузке по ID и обновления формы
  const handleGetShipmentById = useCallback(() => {
    if (selectedItemId) {
      getShipmentById(selectedItemId).then((shipment) => setSelectedShipment(shipment))
    }
  }, [selectedItemId]);

  // Эффект для вызова handleGetShipmentById при изменении selectedItemId
  useEffect(() => {
    handleGetShipmentById();
  }, [selectedItemId, handleGetShipmentById]);

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
            onClick={() => setUpdateTable(!updateTable)}
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
        isUpdateTable={updateTable}
        idDetail={selectedShipment?.id}
      />
      <AddModalDetailShipment
        isOpen={isModalOpen}
        addItem={addShipmentMovement}
        onCancel={() => setIsModalOpen(false)}
      />
    </Drawer>
  );
}