import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type AddButtonProps = {
  onClick: () => void;
};

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
      Добавить
    </Button>
  );
};
