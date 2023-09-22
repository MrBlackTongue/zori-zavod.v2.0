import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {TableProps, TypeWorkHours} from "../../../types";
import dayjs from "dayjs";
import {getAllWorkHours} from "../../../services/apiWorkHours";

export const TableWorkHours: React.FC<TableProps> = ({
                                                       isUpdateTable,
                                                       openDrawer,
                                                       onDelete,
                                                     }) => {
  // Лоудер и список всех единиц измерения
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allHours, setAllHours] = useState<TypeWorkHours[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeWorkHours> = [
    {
      title: 'Имя',
      dataIndex: ['employee', 'firstName'],
      key: 'firstName',
      sorter: (a, b) => (a.employee.firstName ?? '') < (b.employee.firstName ?? '') ? -1 : 1,
    },
    {
      title: 'Фамилия',
      dataIndex: ['employee', 'lastName'],
      key: 'lastName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => (a.employee.lastName ?? '') < (b.employee.lastName ?? '') ? -1 : 1,
    },
    {
      title: 'Дата',
      dataIndex: 'workDate',
      key: 'workDate',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'Рабочие часы',
      dataIndex: 'hours',
      key: 'hours',
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
              title="Вы действительно хотите удалить эту единицу измерения?"
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
    getAllWorkHours()
      .then((data) => {
        setAllHours(data);
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
      dataSource={allHours}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
}