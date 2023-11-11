import React from 'react';
import { Button, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type DeleteWithConfirmationButtonProps = {
  hasSelected: boolean; // Состояние выбора элементов
  selectedCount: number; // Количество выбранных элементов
  onConfirm: () => void; // Функция, вызываемая при подтверждении удаления
  onCancel: () => void; // Функция, вызываемая при отмене удаления
};

export const DeleteWithConfirmationButton: React.FC<
  DeleteWithConfirmationButtonProps
> = ({ hasSelected, selectedCount, onConfirm, onCancel }) => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <Popconfirm
        placement="topRight"
        disabled={!hasSelected}
        title="Вы действительно хотите удалить выбранные записи из таблицы?"
        onConfirm={onConfirm}
        onCancel={onCancel}
        okText="Да"
        cancelText="Отмена">
        <Button type="primary" disabled={!hasSelected} danger>
          <DeleteOutlined /> Удалить
        </Button>
      </Popconfirm>
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Выбранные элементы ${selectedCount}` : ''}
      </span>
    </Space>
  );
};
