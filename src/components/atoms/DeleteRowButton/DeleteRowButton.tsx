import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface DeleteRowButtonProps<T> {
  record: T;
  handleDeleteRow: (row: T) => void;
}

export const DeleteRowButton = <T,>({
  record,
  handleDeleteRow,
}: DeleteRowButtonProps<T>) => {
  return (
    <div className="delete-button">
      <Popconfirm
        placement="topLeft"
        title="Вы действительно хотите удалить строку?"
        onConfirm={() => handleDeleteRow(record)}
        okText="Да"
        cancelText="Отмена">
        <Button
          size="small"
          style={{ color: 'tomato', borderColor: 'tomato' }}
          type="default"
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </div>
  );
};
