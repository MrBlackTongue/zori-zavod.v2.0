import React, {useState, useEffect} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined, DownOutlined} from '@ant-design/icons';
import {getAllShipment} from "../../../services";
import {TableProps, TypeShipment, TableParams} from "../../../types";
import dayjs from 'dayjs';

export const TableShipment: React.FC<TableProps> = ({
                                                      isUpdateTable,
                                                      openDrawer,
                                                      onDelete,
                                                      openDetailDrawer
                                                    }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Состояния для загрузки данных и списка всех отгрузок
  const [isLoading, setIsLoading] = useState(false);
  const [allShipment, setAllShipment] = useState<TypeShipment[]>();

  // Состояние для параметров пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeShipment> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'Клиент',
      dataIndex: 'client',
      key: 'client',
      sorter: (a: any, b: any) => a.client.title < b.client.title ? -1 : 1,
      render: ((client: any) =>
        client !== null ? (<div key={client.id}>{client.title}</div>) : null)
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Подробнее" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              onClick={() => openDetailDrawer && id && openDetailDrawer(id)}
            >
              <DownOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer && openDrawer(id)}
            >
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту отгрузку?"
              onConfirm={() => onDelete && onDelete(id)}
              okText="Да"
              cancelText="Отмена"
            >
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

  // Параметры изменения таблицы
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({pagination});
  };

  // Функция для обновления таблицы
  const updateTable = () => {
    setIsLoading(true);
    getAllShipment().then((allShipment) => {
      setAllShipment(allShipment);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    updateTable()
  }, [isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allShipment}
      pagination={{...tableParams.pagination, position: [bottom]}}
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
};