import React, { FC } from 'react';
import { Button } from 'antd';
import './AddButton.css';
import { PlusOutlined } from '@ant-design/icons';

interface AddButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const AddButton: FC<AddButtonProps> = ({ setIsModalOpen }) => (
  <div className="add-new-item-button">
    <Button
      style={{ top: -35 }}
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => setIsModalOpen(true)}>
      Добавить
    </Button>
  </div>
);

export default AddButton;
