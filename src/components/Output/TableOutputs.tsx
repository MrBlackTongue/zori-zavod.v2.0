import React, {useEffect, useState} from 'react';
import {
  Space,
  Button,
  Table,
  Tooltip,
  Popconfirm,
} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  getAllOutputs,
  deleteOutputById,
} from "../../services";
import {OutputsTableProps, OutputTypes, TableParams} from "../../types";
import dayjs from 'dayjs';

export const TableOutputs: React.FC<OutputsTableProps> = ({
                                                                updateTable,
                                                                openDrawer,
                                                              }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех единиц измерения
  const [loading, setLoading] = useState(false);
  const [allOutputs, setAllOutputs] = useState<OutputTypes[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<OutputTypes> = [
    {
      title: 'Идентификатор',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
      // sorter: (a, b) => a.name < b.name ? -1 : 1,
      // defaultSortOrder: 'ascend',
    },
    {
      title: 'Продукт',
      dataIndex: 'product',
      key: 'product',
      render: ((product: any) =>
      product !== null ? (<div key={product.id}>{product.title}</div>) : null)
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: ((id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                openDrawer(id)
              }}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              title="Вы действительно хотите удалить этот выпуск продукции?"
              onConfirm={() => {
                deleteOutputById(id).then(() => {
                  getAllOutputs().then((allOutputs) => setAllOutputs(allOutputs))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle" style={{color: 'tomato', borderColor: 'tomato'}} ghost onClick={() => {
              }}>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

  // Параметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<OutputTypes>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllOutputs([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllOutputs().then((allOutputs) => {
      setAllOutputs(allOutputs);
      setLoading(false);
    });
  }, [!updateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allOutputs}
      pagination={{position: [bottom]}}
      // pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};