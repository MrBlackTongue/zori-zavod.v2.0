import React, {useEffect, useState} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllClient, deleteClientById} from "../../../services";
import {TableProps, TypeClient, TableParams} from "../../../types";

export const TableClient: React.FC<TableProps<TypeClient>> = ({
                                                                isUpdateTable,
                                                                openDrawer,
                                                              }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех клиентов
  const [loading, setLoading] = useState(false);
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
              onClick={() => openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этого клиента?"
              onConfirm={() => {
                deleteClientById(id).then(() => {
                  getAllClient().then((allClients) => setAllClient(allClients))
                })
              }}
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
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TypeClient>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllClient([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllClient().then((allClients) => {
      setAllClient(allClients);
      setLoading(false);
    });
  }, [isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allClient}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};