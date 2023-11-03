import React, { ReactNode, useState } from 'react';
import { Popover } from 'antd';
import {
  CloseOutlined,
  QuestionCircleFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';

interface CustomPopoverProps {
  content: ReactNode;
}

export const CustomPopover: React.FC<CustomPopoverProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const IconComponent = isOpen ? QuestionCircleFilled : QuestionCircleOutlined;

  const handleOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const popoverContent = (
    <div>
      <div style={{ position: 'relative' }}>
        <CloseOutlined
          style={{
            position: 'absolute',
            right: 0,
            top: -12,
            cursor: 'pointer',
          }}
          onClick={handleClose}
        />
      </div>
      {content}
    </div>
  );

  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      open={isOpen}
      onOpenChange={handleOpen}
      content={popoverContent}>
      <div
        style={{
          display: 'inline-block',
          marginRight: 5,
          marginLeft: 5,
          cursor: 'pointer',
          opacity: 0.5,
        }}
        onClick={() => setIsOpen(!isOpen)}>
        <IconComponent
          style={{ color: '#1677ff', transform: 'translateY(-5px)' }}
        />
      </div>
    </Popover>
  );
};
