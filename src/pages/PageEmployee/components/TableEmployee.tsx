import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllEmployee} from "../../../services";
import {TableProps, TypeEmployee, TableParam} from "../../../types";

export const TableEmployee: React.FC<TableProps> = ({
                                                      isUpdateTable,
                                                      openDrawer,
                                                      onDelete,
                                                    }) => {
  // Лоудер и список всех сотрудников
  const [isLoading, setIsLoading] = useState(false);
  const [allEmployee, setAllEmployee] = useState<TypeEmployee[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeEmployee> = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => (a.firstName ?? '') < (b.firstName ?? '') ? -1 : 1,
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => (a.lastName ?? '') < (b.lastName ?? '') ? -1 : 1,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Ставка',
      dataIndex: 'salaryRate',
      key: 'salaryRate',
      sorter: (a, b) => (a.salaryRate ?? 0) - (b.salaryRate ?? 0),
    },
    {
      title: 'Нанят',
      dataIndex: 'hired',
      key: 'hired',
      render: (hired => hired ? 'Да' : 'Нет'),
      sorter: (a, b) => (Number(a.hired) ?? 0) - (Number(b.hired) ?? 0)
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
              title="Вы действительно хотите удалить этого сотрудника?"
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
    setTableParams({pagination});
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllEmployee()
      .then((data) => {
        setAllEmployee(data);
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
      dataSource={allEmployee}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...tableParams.pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};