import React, {useEffect, useState} from 'react';
import {
  Typography,
  Space,
  Button,
  Form,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './index.css';
import {
  postNewEmployee,
  putChangeEmployee,
} from "../../../requests/employeesRequests";
import {EmployeeType} from "../../../types/employeeType";
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
      .then(() => setUpdateTable(true))
    return employee;
  };

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

  const onChange = (values: { [key: string]: any }): EmployeeType => {
    const employee: EmployeeType = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
      id: values.id,
    };
    setIsDrawerOpen(false)
    putChangeEmployee(employee)
      .then(() => setUpdateTable(true))
    return employee
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading}/>}
            onClick={async ()=> {
              await setUpdateTable(true)
              await setUpdateTable(false)
            }}
            className='greenButton'>
            {updateButton}
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
        openDrawer={openDrawer}
      />
      <AddEmployee
        isOpen={isModalOpen}
        onCreate={async (employee) => {
          await onCreate(employee)
          await setUpdateTable(false)
        }}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditEmployee
        isOpen={isDrawerOpen}
        selectedEmployeeId={selectedEmployeeId}
        onChange={async (employee) => {
          await onChange(employee)
          await setUpdateTable(false)
        }}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default Index;