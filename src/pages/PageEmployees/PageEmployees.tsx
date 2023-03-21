import React, {useState, useEffect} from 'react';
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
import '../../App.css'
import {postNewEmployee, putChangeEmployee} from "../../services";
import {EmployeeType} from "../../types";
import {AddModalEmployee, EditDrawerEmployee, TableEmployees} from "../../components";

const {Title} = Typography;

const PageEmployees: React.FC = () => {

  const [form] = Form.useForm();

  // Сотрудники в таблице, обновить сотрудников
  const [updateTable, setUpdateTable] = useState(false);

  // Создать нового сотрудника
  const [employee] = useState<EmployeeType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть сотрудника по id
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

  const addEmployee = (values: { [key: string]: any }): EmployeeType => {
    const employee: EmployeeType = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
    };
    setIsModalOpen(false)
    postNewEmployee(employee)
    setUpdateTable(!updateTable)
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

  const updateEmployee = (values: { [key: string]: any }): EmployeeType => {
    const employee: EmployeeType = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
      id: selectedEmployeeId,
    };
    setIsDrawerOpen(false)
    putChangeEmployee(employee)
    setUpdateTable(!updateTable)
    return employee
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
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
      <TableEmployees
        updateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalEmployee
        isOpen={isModalOpen}
        addEmployee={addEmployee}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerEmployee
        isOpen={isDrawerOpen}
        selectedEmployeeId={selectedEmployeeId}
        updateEmployee={updateEmployee}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default PageEmployees;