import React, {useState} from "react";
import {Drawer} from "antd";
import {DetailProps, TypeShipment} from "../../../types";
import {TableDetailShipment} from "./TableDetailShipment";


export const DetailDrawerShipment: React.FC<DetailProps<TypeShipment>> = ({
                                                                 isOpen,
                                                                 closeDrawer,
                                                                 selectedItemId
                                                               }) => {

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

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
    >
      <TableDetailShipment
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        filterById={selectedItemId}
      />
    </Drawer>
  );
}