import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type AddNewRowButtonProps = {
  onClick: () => void;
};

export const AddNewRowButton: React.FC<AddNewRowButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      type="link"
      icon={<PlusOutlined />}
      style={{ marginTop: 15 }}
      onClick={onClick}>
      Добавить
    </Button>
  );
};
