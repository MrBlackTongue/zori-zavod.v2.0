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
import './staff.css';

const {Title} = Typography;

type EmployeeType = {
  firstName: string;
  lastName: string;
  phone: string
  salaryRate: number;
  hired: boolean;
  id: number;
}

interface EmployeeCreateFormProps {
  open: boolean;
  onCreate: (values: EmployeeType) => void;
  onCancel: () => void;
}

const Staff = () => {
  interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
  }

  type TablePaginationPosition = 'bottomCenter'


  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [salaryRate, setSalaryRate] = useState();
  const [hired, setHired] = useState();
  const [id, setId] = useState();
  const [employeeData, setEmployeeData] = useState<EmployeeType | null>(null);

  const EmployeeCreateForm: React.FC<EmployeeCreateFormProps> = ({
                                                                   open,
                                                                   onCreate,
                                                                   onCancel,
                                                                 }) => {
    const [form] = Form.useForm();

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
      form.setFieldsValue({hired: e.target.checked});
      console.log(`checked = ${e.target.checked}`);
    }

    return (
      <Modal
        title={`Добавление нового сотрудника`}
        open={open}
        onCancel={onCancel}
        width={500}
        okText={'Сохранить'}
        cancelText={'Отмена'}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          name="add-new-employee"
          initialValues={{
            modifier: 'public'
          }}
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
            name="salaryRate"
            label="Ставка"
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
            <Checkbox onChange={onChangeCheckbox}>Нанят</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    )
  }

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
                getEmployeeById(id)
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

  // const getRandomuserParams = (params: TableParams) => ({
  //   results: params.pagination?.pageSize,
  //   page: params.pagination?.current,
  //   ...params,
  // });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOOpen] = useState(false);

  const [data, setData] = useState<EmployeeType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
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
    console.log('values: ', values);
    setIsModalOpen(false)
    postNewEmployee(employee);
    return employee;
  };

  const getAllEmployees = () => {
    setLoading(true);
    fetch(`http://localhost:8081/api/employee`)
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            // total: 100,
            // total: data.totalCount,
          },
        });
      });
  };

  async function postNewEmployee(data: EmployeeType) {
    try {
      const config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      };
      const response = await fetch('http://localhost:8081/api/employee', config);
      if (response.ok) {
        console.log('Данные успешно отправлены!');
        return message.success('Запись добавлена');
      } else {
        console.error(response.statusText);
        return message.error('Ошибка при добавлении нового сотрудника');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getEmployeeById(id: number) {
    try {
      const response = await fetch(`http://localhost:8081/api/employee/${id}`);
      const data = await response.json();
      setEmployeeData(data)
      if (response.ok) {
        return data;
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // async function putChangeEmployee(data: EmployeeType) {
  //   try {
  //     const config = {
  //       method: 'PUT',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(data),
  //     };
  //     const response = await fetch('http://localhost:8081/api/employee', config);
  //     if (response.ok) {
  //       console.log('Данные успешно изменены!');
  //       return message.success('Запись изменена');
  //     } else {
  //       console.error(response.statusText);
  //       return message.error('Ошибка при изменении записи');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    getAllEmployees();
  }, [JSON.stringify(tableParams)])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<EmployeeType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
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

  const [form] = Form.useForm();

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading}/>}
            onClick={getAllEmployees}
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
        dataSource={data}
        // rowKey={(record) => record.lastName}
        pagination={{position: [bottom]}}
        // pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <EmployeeCreateForm
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
          name="change-worker"
          // initialValues={{
          //   remember: true,
          // }}
          initialValues={employeeData as any}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="hired"
            wrapperCol={{offset: 8, span: 16}}>
            <Checkbox>Нанят</Checkbox>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Staff;