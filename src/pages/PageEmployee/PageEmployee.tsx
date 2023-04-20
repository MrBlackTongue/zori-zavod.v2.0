import React, {useState, useEffect} from 'react';
import {
  Typography,
  Space,
  Button,
  Form, FloatButton,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../App.css'
import {postNewEmployee, putChangeEmployee} from "../../services";
import {TypeEmployee} from "../../types";
import {TableEmployee} from "./components/TableEmployee";
import {AddModalEmployee} from "./components/AddModalEmployee";
import {EditDrawerEmployee} from "./components/EditDrawerEmployee";

const {Title} = Typography;

export const PageEmployee: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Сотрудник
  const [employee] = useState<TypeEmployee | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбран сотрудник по id
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

  // Добавить нового сотрудника
  const addEmployee = (values: { [key: string]: any }): TypeEmployee => {
    const employee: TypeEmployee = {
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

  // Открыть дравер
  const openDrawer = (employeeId: number) => {
    setSelectedEmployeeId(employeeId)
    setIsDrawerOpen(true);
  };

  // Обновить сотрудника
  const updateEmployee = (values: { [key: string]: any }): TypeEmployee => {
    const employee: TypeEmployee = {
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

  useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    }
  }, [employee, form]);

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
      <FloatButton.BackTop />
      <TableEmployee
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