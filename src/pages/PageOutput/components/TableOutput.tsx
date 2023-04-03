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
import {getAllOutput, deleteOutputById} from "../../../services";
import {TableProps, TypeOutput, TableParams} from "../../../types";
import dayjs from 'dayjs';

export const TableOutput: React.FC<TableProps<TypeOutput>> = ({
                                                                isUpdateTable,
                                                                openDrawer,
                                                              }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех единиц измерения
  const [loading, setLoading] = useState(false);
  const [allOutput, setAllOutput] = useState<TypeOutput[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOutput> = [
    {
      title: 'ID',
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
    },
    {
      title: 'Товар',
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
              placement="topRight"
              title="Вы действительно хотите удалить этот выпуск продукции?"
              onConfirm={() => {
                deleteOutputById(id).then(() => {
                  getAllOutput().then((allOutputs) => setAllOutput(allOutputs))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle" style={{color: 'tomato', borderColor: 'tomato'}} ghost
                      onClick={() => {
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
    sorter: SorterResult<TypeOutput>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllOutput([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllOutput().then((allOutputs) => {
      setAllOutput(allOutputs);
      setLoading(false);
    });
  }, [!isUpdateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allOutput}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};