import React, {useState} from "react";
import {Button, Drawer, Space} from "antd";
import {DetailProps, TypeShipment} from "../../../types";
import {TableDetailShipment} from "./TableDetailShipment";
import {PlusOutlined, SyncOutlined} from "@ant-design/icons";
import {postNewShipmentProductMovement} from "../../../services";
import {TypeShipmentProductMovement} from "../../../types/TypeShipmentProductMovement";
import {AddModalDetailShipment} from "./AddModalDetailShipment";


export const DetailDrawerShipment: React.FC<DetailProps<TypeShipment>> = ({
                                                                 isOpen,
                                                                 closeDrawer,
                                                                 selectedItem
                                                               }) => {

  // Состояния для обновления таблицы и модального окна
  const [updateTable, setUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция добавления нового товара в отгрузку
  const addShipmentMovement = (values: { [key: string]: any }): TypeShipment => {
    const productMovement: TypeShipmentProductMovement = {
      date: selectedItem?.date,
      stock: values['stock'],
      amount: values['amount'],
      shipment: selectedItem,
      income: false
    };
    setIsModalOpen(false)
    postNewShipmentProductMovement(productMovement)
    setUpdateTable(!updateTable)
    return productMovement;
  };

  // Заглушка для функции открытия дравера
  const openDrawer = () => {};

  // Функция закрытия детального дравера
  const handleClose = () => {
    closeDrawer()
  }

  return (
    <Drawer
      title="Отгруженные товары"
      placement={"bottom"}
      height={500}
      open={isOpen}
      onClose={handleClose}
      bodyStyle={{paddingBottom: 80}}
      extra={
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
      }
    >
      <TableDetailShipment
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        filterById={selectedItem?.id}
      />
      <AddModalDetailShipment
        isOpen={isModalOpen}
        addItem={addShipmentMovement}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
    </Drawer>
  );
}