import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAllUnit } from '../../../services';
import { TableProps, TypeUnit } from '../../../types';
import { CustomPopover } from '../../../components/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../components/CustomPopover/ContentPopover';

export const TableUnit: React.FC<TableProps> = ({
  isUpdateTable,
  openDrawer,
  onDelete,
}) => {
  // Spinner и список всех единиц измерения
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeUnit> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      showSorterTooltip: false,
      sorter: (a, b) => ((a.name ?? '') < (b.name ?? '') ? -1 : 1),
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
              title="Вы действительно хотите удалить эту единицу измерения?"
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

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllUnit()
      .then(data => {
        setAllUnit(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  useEffect(() => {
    handleUpdateTable();
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={allUnit}
      loading={isLoading}
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
