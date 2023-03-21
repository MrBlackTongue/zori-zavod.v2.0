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
import './PageEmployees.css';
import {postNewEmployee, putChangeEmployee} from "../../services";
import {EmployeeTypes} from "../../types";
import {AddModalEmployee, EditDrawerEmployee, TableEmployees} from "../../components";

const {Title} = Typography;

export const PageEmployees: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

  // Сотрудники в таблице, обновить сотрудников
  const [updateTable, setUpdateTable] = useState(false);

  // Создать нового сотрудника
  const [employee] = useState<EmployeeTypes | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть сотрудника по id
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

  const addEmployee = (values: { [key: string]: any }): EmployeeTypes => {
    const employee: EmployeeTypes = {
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

  const updateEmployee = (values: { [key: string]: any }): EmployeeTypes => {
    const employee: EmployeeTypes = {
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
      <TableEmployees
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalEmployee
        isOpen={isModalOpen}
        addItem={addEmployee}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerEmployee
        isOpen={isDrawerOpen}
        selectedItemId={selectedEmployeeId}
        updateItem={updateEmployee}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};