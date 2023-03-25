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
import {getAllClients, deleteClientById} from "../../../services";
import {TableProps, ClientType, TableParams} from "../../../types/_index";

export const TableClient: React.FC<TableProps<ClientType>> = ({
                                                                      isUpdateTable,
                                                                      openDrawer,
                                                                    }) => {
  type TablePaginationPosition = 'bottomCenter'
  // Лоудер и список всех клиентов
  const [loading, setLoading] = useState(false);
  const [allClients, setAllClients] = useState<ClientType[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<ClientType> = [
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
              title="Вы действительно хотите удалить этого клиента?"
              onConfirm={() => {
                deleteClientById(id).then(() => {
                  getAllClients().then((allClients) => setAllClients(allClients))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost onClick={() => {
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
    sorter: SorterResult<ClientType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllClients([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllClients().then((allClients) => {
      setAllClients(allClients);
      setLoading(false);
    });
  }, [!isUpdateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allClients}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};