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
import '../../../App.css'
import './pageEmployees.css';
import {
  postNewEmployee,
  putChangeEmployee,
} from "../../../requests/employeesRequests";
import {EmployeeType} from "../../../types/employeeType";
import {AddEmployee} from "./addEmployee";
import {EmployeesTable} from "./employeesTable";
import {EditEmployee} from "./editEmployee";

const {Title} = Typography;

const PageEmployees: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

  // Сотрудники в таблице, обновить сотрудников
  const [updateTable, setUpdateTable] = useState(false);

  // Создать нового сотрудника
  const [employee] = useState<EmployeeType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть сотрудника по id
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | undefined>();

  const addEmployee = async (values: { [key: string]: any }): Promise<EmployeeType> => {
    const employee: EmployeeType = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
      id: values.number,
    };
    setIsModalOpen(false)
    await postNewEmployee(employee)
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

  const updateEmployee = async (values: { [key: string]: any }): Promise<EmployeeType> => {
    const employee: EmployeeType = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
      id: values.id,
    };
    setIsDrawerOpen(false)
    await putChangeEmployee(employee)
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
            icon={<SyncOutlined spin={loading}/>}
            onClick={() => setUpdateTable(!updateTable)}
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
        addEmployee={addEmployee}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditEmployee
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