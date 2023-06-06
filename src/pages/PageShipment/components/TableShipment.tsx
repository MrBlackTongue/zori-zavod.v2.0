import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined, DownOutlined} from '@ant-design/icons';
import {getAllShipment} from "../../../services";
import {TableProps, TypeShipment, TableParam, TypeClient} from "../../../types";
import dayjs from 'dayjs';

export const TableShipment: React.FC<TableProps> = ({
                                                      isUpdateTable,
                                                      openDrawer,
                                                      onDelete,
                                                      openDetailDrawer
                                                    }) => {
  // Лоудер и список всех отгрузок
  const [isLoading, setIsLoading] = useState(false);
  const [allShipment, setAllShipment] = useState<TypeShipment[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
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
      key: 'idShipment',
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
      sorter: (a, b) => (a.client?.title ?? '') < (b.client?.title ?? '') ? -1 : 1,
      render: ((client: TypeClient) =>
        client !== null ? (<div>{client.title}</div>) : null)
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
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllShipment().then((data) => {
      setAllShipment(data);
      setIsLoading(false);
    });
  }, [])

  useEffect(() => {
    handleUpdateTable()
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allShipment}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
    />
  );
};