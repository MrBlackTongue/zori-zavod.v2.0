import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAllOperation, getAllOperationByTitle } from '../../../../api';
import { TableProps, TypeOperation, TypeUnit } from '../../../../types';
import { CustomPopover } from '../../../atoms/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../atoms/CustomPopover/ContentPopover';

export const TableOperation: React.FC<TableProps> = ({
  isUpdateTable,
  openDrawer,
  onDelete,
  searchText,
}) => {
  // Spinner и список всех операций
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOperation> = [
    {
      title: 'Операция',
      dataIndex: 'title',
      key: 'title',
      showSorterTooltip: false,
      sorter: (a, b) => ((a.title ?? '') < (b.title ?? '') ? -1 : 1),
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
      render: (unit: TypeUnit) =>
        unit !== null ? <div> {unit.name}</div> : null,
    },
    {
      title: 'Норма',
      dataIndex: 'rate',
      key: 'rate',
      showSorterTooltip: false,
      sorter: (a, b) => ((a.rate ?? 0) < (b.rate ?? 0) ? -1 : 1),
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
              title="Вы действительно хотите удалить эту операцию?"
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
    getAllOperation()
      .then(data => {
        setAllOperation(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  // Функция для поиска по таблице
  const handleSearchTable = useCallback((): void => {
    setIsLoading(true);
    getAllOperationByTitle(searchText ?? '')
      .then(data => {
        setAllOperation(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, [searchText]);

  useEffect(() => {
    if (searchText) {
      handleSearchTable();
    } else {
      handleUpdateTable();
    }
  }, [isUpdateTable, searchText, handleUpdateTable, handleSearchTable]);

  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={allOperation}
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
