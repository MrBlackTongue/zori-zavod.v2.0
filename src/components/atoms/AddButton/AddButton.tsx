import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTable } from '../../../contexts/TableContext';

export const AddButton = () => {
  const { handleNavigateToForm } = useTable();

  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => handleNavigateToForm()}>
      Добавить
    </Button>
  );
};
