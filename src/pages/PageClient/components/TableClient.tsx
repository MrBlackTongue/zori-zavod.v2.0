import React, {useState, useEffect} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllClient} from "../../../services";
import {TableProps, TypeClient, TableParams} from "../../../types";

export const TableClient: React.FC<TableProps> = ({
                                                    isUpdateTable,
                                                    openDrawer,
                                                    onDelete,
                                                  }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех клиентов
  const [isLoading, setIsLoading] = useState(false);
  const [allClient, setAllClient] = useState<TypeClient[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeClient> = [
    {
      title: 'Имя',
      dataIndex: 'title',
      key: 'title',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.title < b.title ? -1 : 1,
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer && openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этого клиента?"
              onConfirm={() => onDelete && onDelete(id)}
              okText="Да"
              cancelText="Отмена">
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
    getAllClient().then((allClients) => {
      setAllClient(allClients);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    updateTable()
  }, [isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allClient}
      pagination={{...tableParams.pagination, position: [bottom]}}
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
};