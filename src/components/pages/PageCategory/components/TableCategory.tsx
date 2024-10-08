import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getCategoryTree } from '../../../../api';
import { TableProps, TypeCategory } from '../../../../types';
import { CustomPopover } from '../../../atoms/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../atoms/CustomPopover/ContentPopover';

export const TableCategory: React.FC<TableProps> = ({
  isUpdateTable,
  openDrawer,
  onDelete,
}) => {
  // Spinner и список всех категорий
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState<TypeCategory[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeCategory> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: (
        <>
          Действия
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                {ACTIONS_OVERVIEW_CONTENT}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_EDIT}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_DELETE}
              </p>
            }
          />
        </>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'center',
      render: (id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer?.(id)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту категорию?"
              onConfirm={() => onDelete?.(id)}
              okText="Да"
              cancelText="Отмена">
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{ color: 'tomato', borderColor: 'tomato' }}
                ghost>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Рекурсивная функция для удаления пустых дочерних элементов
  const removeEmptyChildren = useCallback(
    (category: TypeCategory): TypeCategory => {
      if (category.children && category.children.length === 0) {
        const { children, ...rest } = category;
        return rest;
      }
      if (category.children) {
        return {
          ...category,
          children: category.children.map(removeEmptyChildren),
        };
      }
      return category;
    },
    [],
  );

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setLoading(true);
    getCategoryTree()
      .then(data => {
        const updatedData = data.map(removeEmptyChildren);
        setAllCategory(updatedData);
        setLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, [removeEmptyChildren]);

  useEffect(() => {
    handleUpdateTable();
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={allCategory}
      loading={loading}
      onChange={handleChangeTable}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
      rowClassName={(_, index) =>
        index % 2 === 0 ? 'table-even-row' : 'table-odd-row'
      }
    />
  );
};
