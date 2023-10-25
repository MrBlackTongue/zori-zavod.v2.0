import React, { ReactNode, useState } from 'react';
import { Button, Popover } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

interface CustomPopoverProps {
  content: ReactNode;
}

export const CustomPopover: React.FC<CustomPopoverProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      onOpenChange={handleOpenChange}
      content={content}>
      <Button
        type="primary"
        size="small"
        shape="circle"
        ghost={!isOpen}
        style={{ marginRight: 7, marginLeft: 7, top: -4 }}>
        <QuestionOutlined />
      </Button>
    </Popover>
  );
};
