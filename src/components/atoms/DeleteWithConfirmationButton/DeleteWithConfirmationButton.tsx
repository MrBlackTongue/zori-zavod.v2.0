import React from 'react';
import { Button, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useBasicTable } from '../../../contexts/BasicTableContext';

export const DeleteWithConfirmationButton = () => {
  const {
    hasSelected,
    selectedRowKeys,
    handleDeleteSelected,
    handleClearSelected,
  } = useBasicTable();

  return (
    <Space style={{ marginBottom: 16 }}>
      <Popconfirm
        placement="topRight"
        disabled={!hasSelected}
        title="Вы действительно хотите удалить выбранные элементы из таблицы?"
        onConfirm={handleDeleteSelected}
        onCancel={handleClearSelected}
        okText="Да"
        cancelText="Отмена">
        <Button type="primary" disabled={!hasSelected} danger>
          <DeleteOutlined /> Удалить
        </Button>
      </Popconfirm>
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Выбранные элементы ${selectedRowKeys?.length}` : ''}
      </span>
    </Space>
  );
};
