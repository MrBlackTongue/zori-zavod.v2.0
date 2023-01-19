import React, {useEffect, useState, useRef} from 'react';
import {
  Typography,
  Space,
  Button,
  Input,
  Form,
  Drawer,
  InputNumber,
  message,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './employees.css';
import {
  getAllEmployees,
  postNewEmployee,
} from "../../../requests/requests";
import {AddEmployeeProps, EmployeeType, TableParams} from "../../../types/types";
import {AddEmployee} from "./addEmployee";
import {EmployeesTable} from "./employeesTable";
import {EditEmployee} from "./editEmployee";

const {Title} = Typography;

const Employees:React.FC = () => {

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [allEmployees, setAllEmployees] = useState<EmployeeType[]>();
  const [updateTable, setUpdateTable] = useState(false);
  const [employee, setEmployee] = useState<EmployeeType | null>(null);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    refreshEmployeeTable()
    return employee;
  };

  const refreshEmployeeTable = () => {
    // console.log('TYT')
    setLoading(true);
    getAllEmployees(setAllEmployees);
    setUpdateTable(!updateTable)
    setLoading(false);
  }

  // useEffect(() => {
  //   refreshEmployeeTable();
  // }, []);
  // const refreshRef = useRef(refreshEmployeeTable);

  // useEffect(() => {
  //   getAllEmployees(setAllEmployees);
  // }, []);

  useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    }
  }, [employee, form]);

  // Drawer
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const onFinish = (values: EmployeeType) => {
    console.log('SuccessModal:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading}/>}
            onClick={refreshEmployeeTable}
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
      <EmployeesTable updateTable={updateTable} refresh={refreshEmployeeTable}/>
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
            {/*<Checkbox checked={employee?.hired} onChange={() => setHired(hired)}>Нанят</Checkbox>*/}
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Employees;