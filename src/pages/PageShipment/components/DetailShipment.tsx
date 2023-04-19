import React from "react";
import {Button, Drawer, Space} from "antd";

interface ShipmentDetailsProps {
  shipmentId: number;
  isOpen: boolean;
  closeDrawer: () => void;
}

export const DetailShipment: React.FC<ShipmentDetailsProps> = ({
                                                                 isOpen,
                                                                 closeDrawer
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