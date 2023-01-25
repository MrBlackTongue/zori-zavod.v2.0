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
import './index.css';
import {
  getAllEmployees,
  postNewEmployee,
  putChangeEmployee,
} from "../../../requests/EmployeeRequests";
import {AddEmployeeProps, EmployeeType, TableParams} from "../../../types/employeeType";
import {AddEmployee} from "./addEmployee";
import {EmployeesTable} from "./employeesTable";
import {EditEmployee} from "./editEmployee";

const {Title} = Typography;

const Index: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить"
  const [loading, setLoading] = useState(false);
  const [updateButton, setUpdateButton] = useState('Обновить')

  // Сотрудники в таблице, обновить сотрудников
  const [allEmployees, setAllEmployees] = useState<EmployeeType[]>();
  const [updateTable, setUpdateTable] = useState(false);

  // Создать нового сотрудника
  const [employee, setEmployee] = useState<EmployeeType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть сотрудника по id
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | undefined>();

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
    postNewEmployee(employee)
      .then(() => updateEmployeeTable())
    return employee;
  };

  const updateEmployeeTable = () => {
    setLoading(true)
    setUpdateButton('Обновление');
    setUpdateTable(!updateTable)
    // getAllEmployees(setAllEmployees);
    setUpdateButton('Обновить');
    setLoading(false);
  }

  useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    }
  }, [employee, form]);

  // Drawer
  const openDrawer = (employeeId: number) => {
    setSelectedEmployeeId(employeeId)
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const onFinish = (values: { [key: string]: any }): EmployeeType => {
    const employee: EmployeeType = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
      id: values.id,
    };
    console.log('SuccessModal:', values);
      putChangeEmployee(employee)
        .then(()=> updateEmployeeTable())
    return employee
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleDrawerOpen = (open: boolean) => {
    setIsDrawerOpen(open);
  }

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading}/>}
            onClick={updateEmployeeTable}
            className='greenButton'>
            {updateButton}
            {/*{loading ? 'Обновление' : 'Обновить'}*/}
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
      <EmployeesTable
        updateTable={updateTable}
        updateEmployeeTable={updateEmployeeTable}
        openDrawer={openDrawer}
      />
      <AddEmployee
        open={isModalOpen}
        onCreate={onCreate}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditEmployee
        isOpen={isDrawerOpen}
        selectedEmployeeId={selectedEmployeeId}
        closeDrawer={closeDrawer}
        onFinish={onFinish}
      />
    </div>
  );
};

export default Index;