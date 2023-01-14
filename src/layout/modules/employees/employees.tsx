import React, {useEffect, useState} from 'react';
import {
  Typography,
  Space,
  Button,
  Table,
  Tooltip,
  Popconfirm,
  Modal,
  Input,
  Form,
  Checkbox,
  Drawer,
  InputNumber,
  message,
} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './employees.css';
import {
  getAllEmployees,
  getEmployeeById,
  postNewEmployee,
} from "../../../requests/requests";
import {AddEmployeeProps, EmployeeType, TableParams} from "../../../types/types";
import {AddEmployee} from "./addEmployee";
import {EmployeesTable} from "./employeesTable";

const {Title} = Typography;

const Employees = () => {

  const [form] = Form.useForm();

  type TablePaginationPosition = 'bottomCenter'

  const [loading, setLoading] = useState(false);
  const [allEmployees, setAllEmployees] = useState<EmployeeType[]>();
  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  // const [isHired, setIsHired] = useState(employee?.hired);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [salaryRate, setSalaryRate] = useState();
  const [hired, setHired] = useState(employee?.hired);
  const [id, setId] = useState<number>();


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
      render: ((id) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                showDrawer()
                getEmployeeById(id, setEmployee)
              }}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              title="Вы действительно хотите удалить этого сотрудника?"
              onConfirm={() => {
                // this.deleteBlockInfo(id);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOOpen] = useState(false);
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');

  const onCreate = (values: { [key: string]: any }): EmployeeType => {
    const employee: EmployeeType = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
      id: values.number,
    };
    setIsModalOpen(false)
    postNewEmployee(employee);
    return employee;
  };

  useEffect(() => {
    getAllEmployees(setLoading, setAllEmployees);
  }, []);

  useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    }
  }, [employee, form]);

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

  // Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Drawer
  const showDrawer = () => {
    setIsDrawerOOpen(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerOOpen(false);
  };

  const onFinish = (values: EmployeeType) => {
    console.log('SuccessModal:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  console.log('hired', hired)
  console.log('employee?.hired', employee?.hired)

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading}/>}
            onClick={() => {
              getAllEmployees(setLoading, setAllEmployees)
            }}
            className='greenButton'>
            {loading ? 'Обновление' : 'Обновить'}
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={allEmployees}
        // rowKey={(record) => record.lastName}
        pagination={{position: [bottom]}}
        // pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      {/*<EmployeesTable*/}
      {/*  // dataSource={allEmployees}*/}
      {/*  // columns={columns}*/}
      {/*  // loading={loading}*/}
      {/*  // setLoading={setLoading}*/}
      {/*  // pagination={tableParams.pagination}*/}
      {/*  // setPagination={setTableParams}*/}
      {/*/>*/}


      {/*<EmployeesTable/>*/}
      <AddEmployee
        open={isModalOpen}
        onCreate={onCreate}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <Drawer
        title="Редактирование сотрудника"
        width={600}
        onClose={onCloseDrawer}
        open={isDrawerOpen}
        bodyStyle={{paddingBottom: 80}}
        extra={
          <Space>
            <Button onClick={onCloseDrawer}>Отмена</Button>
            <Button onClick={() => {
              onCloseDrawer()
              // putChangeEmployee()
            }} type="primary" form='change-worker' htmlType="submit">
              Сохранить
            </Button>
          </Space>
        }
      >
        <Form
          id='change-worker'
          form={form}
          // name="change-worker"
          // initialValues={employeeData} // установить инициализационные значения
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{span: 6}}
          wrapperCol={{span: 16}}
          style={{marginTop: 30}}
        >
          <Form.Item
            label="Имя"
            name="firstName"
            rules={[{required: true, message: 'Пожалуйста введите имя'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[{required: true, message: 'Пожалуйста введите фамилию'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Телефон"
            name="phone"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Ставка"
            name="salaryRate"
            rules={[{
              type: 'number',
              message: 'Пожалуйста напишите ставку цифрами больше 1',
              warningOnly: true,
              // pattern: /[1-9]/,
            }]}
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            name="hired"
            wrapperCol={{offset: 8, span: 16}}>
            <Checkbox checked={employee?.hired} onChange={() => setHired(hired)}>Нанят</Checkbox>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Employees;