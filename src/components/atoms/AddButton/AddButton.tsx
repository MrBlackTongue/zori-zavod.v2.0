import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useBasicTable } from '../../../contexts/BasicTableContext';

export const AddButton = () => {
  const { handleNavigateToForm } = useBasicTable();

  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => handleNavigateToForm()}>
      Добавить
    </Button>
  );
};
