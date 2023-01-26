import React, {useEffect, useState} from 'react';
import {
  Typography,
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
import './index.css';
import {
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
} from "../../../requests/employeesRequests";
import {AddEmployeeProps, EmployeesTableProps, EmployeeType, TableParams} from "../../../types/employeeType";

const {Title} = Typography;

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
                                                                updateTable,
                                                                updateEmployeeTable,
                                                                openDrawer}) => {

  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех сотрудников
  const [loading, setLoading] = useState(false);
  const [allEmployees, setAllEmployees] = useState<EmployeeType[]>();

  // Открытие дравера
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [employee, setEmployee] = useState<EmployeeType | null>(null);

  // Параментры для пагинации
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<EmployeeType> = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName < b.firstName ? -1 : 1,
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.lastName < b.lastName ? -1 : 1,

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
      sorter: (a, b) => a.salaryRate - b.salaryRate,

    },
    {
      title: 'Нанят',
      dataIndex: 'hired',
      key: 'hired',
      render: ((hired) => {
        if (hired == true) return 'Да'
        else return 'Нет'
      }),
      sorter: (a, b) => a.hired < b.hired ? -1 : 1,

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
                // showDrawer()
                // setEmployee(id)
                openDrawer(id)
                // getEmployeeById(id, setEmployee)
              }}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              title="Вы действительно хотите удалить этого сотрудника?"
              onConfirm={() => {
                deleteEmployeeById(id).then(() => {
                  getAllEmployees().then((allEmployees) => setAllEmployees(allEmployees))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle" ghost onClick={() => {
              }}>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

  // Паметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<EmployeeType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllEmployees([]);
    }
  };

  // Drawer
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    setLoading(true)
    getAllEmployees().then((allEmployees) => setAllEmployees(allEmployees))
    // getAllEmployees(setAllEmployees);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (updateTable) {
      setLoading(true);
      getAllEmployees().then((allEmployees) => setAllEmployees(allEmployees))
      // updateEmployeeTable();
      // getAllEmployees(setAllEmployees);
      setLoading(false);
    }
  }, [updateTable, updateEmployeeTable]);

  useEffect(() => {
    // getEmployeeById(employee, setEmployee)
  }, [isDrawerOpen,])

  return (
    <Table
      columns={columns}
      dataSource={allEmployees}
      // rowKey={(record) => record.lastName}
      pagination={{position: [bottom]}}
      // pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};