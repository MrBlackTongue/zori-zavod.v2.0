import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface DeleteRowButtonProps<T> {
  record: T;
  deleteRow: (row: T) => void;
}

export const DeleteRowButton = <T,>({
  record,
  deleteRow,
}: DeleteRowButtonProps<T>) => {
  return (
    <div className="delete-button">
      <Popconfirm
        placement="topLeft"
        title="Вы действительно хотите удалить строку?"
        onConfirm={() => deleteRow(record)}
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
