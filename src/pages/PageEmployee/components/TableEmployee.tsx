import React, {useState, useEffect} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllEmployee} from "../../../services";
import {TableProps, TypeEmployee, TableParams} from "../../../types";

export const TableEmployee: React.FC<TableProps> = ({
                                                      isUpdateTable,
                                                      openDrawer,
                                                      onDelete,
                                                    }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех сотрудников
  const [isLoading, setIsLoading] = useState(false);
  const [allEmployee, setAllEmployee] = useState<TypeEmployee[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
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
      render: ((hired) => {
        if (hired) return 'Да'
        else return 'Нет'
      }),
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
              onClick={() => openDrawer && openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этого сотрудника?"
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
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TypeEmployee>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllEmployee(allEmployee);
    }
  };

  // Функция для обновления таблицы
  const updateTable = () => {
    setIsLoading(true);
    getAllEmployee().then((allEmployees) => {
      setAllEmployee(allEmployees);
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
      dataSource={allEmployee}
      pagination={{
        position: [bottom],
        current: tableParams?.pagination?.current,
        pageSize: tableParams?.pagination?.pageSize,
      }}
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
};