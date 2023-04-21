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
                                                                 selectedItemId
                                                               }) => {

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Добавить новый товар в отгрузку
  const addShipmentMovement = (values: { [key: string]: any }): TypeShipment => {
    const productMovement: TypeShipmentProductMovement = {
      date: values['date'].format('YYYY-MM-DD'),
      stock: values['stock'],
      amount: values['amount'],
    };
    setIsModalOpen(false)
    postNewShipmentProductMovement(productMovement)
    setUpdateTable(!updateTable)
    return productMovement;
  };

  // Пока заглушка
  const openDrawer = () => {};

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
        filterById={selectedItemId}
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