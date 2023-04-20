import React from "react";
import {Button, Drawer, Space} from "antd";
import {DetailProps, TypeShipment} from "../../../types";


export const DetailDrawerShipment: React.FC<DetailProps<TypeShipment>> = ({
                                                                 isOpen,
                                                                 closeDrawer,
                                                                 selectedItemId
                                                               }) => {

  const handleClose = () => {
    closeDrawer()
  }

  return (
    <Drawer
      title="Привет"
      placement={"bottom"}
      height={500}
      open={isOpen}
      onClose={handleClose}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
    </Drawer>
  );
}