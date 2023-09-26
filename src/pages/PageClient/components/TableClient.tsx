import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllClient} from "../../../services";
import {TableProps, TypeClient} from "../../../types";
import dayjs from "dayjs";

export const TableClient: React.FC<TableProps> = ({
                                                    isUpdateTable,
                                                    openDrawer,
                                                    onDelete,
                                                  }) => {
  // Лоудер и список всех клиентов
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allClient, setAllClient] = useState<TypeClient[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeClient> = [
    {
      title: 'Имя',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      sorter: (a, b) => (a.title ?? '') < (b.title ?? '') ? -1 : 1,
    },
    {
      title: 'Последняя отгрузка',
      dataIndex: 'lastShipment',
      key: 'lastShipment',
      width: 200,
      sorter: (a, b) => (a.lastShipment ?? '') < (b.lastShipment ?? '') ? -1 : 1,
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
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
              onClick={() => openDrawer?.(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этого клиента?"
              onConfirm={() => onDelete?.(id)}
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
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination((prevPagination) => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllClient()
      .then((data) => {
        setAllClient(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, [])

  useEffect(() => {
    handleUpdateTable()
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allClient}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};