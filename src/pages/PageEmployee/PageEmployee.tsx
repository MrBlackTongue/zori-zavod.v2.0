import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteEmployeeById, postNewEmployee, putChangeEmployee} from "../../services";
import {TypeEmployee} from "../../types";
import {TableEmployee} from "./components/TableEmployee";
import {AddModalEmployee} from "./components/AddModalEmployee";
import {EditDrawerEmployee} from "./components/EditDrawerEmployee";

const {Title} = Typography;

export const PageEmployee: React.FC = () => {

  // Обновление таблицы, выбран сотрудник по id
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить нового сотрудника
  const handleAddEmployee = (values: { [key: string]: any }): TypeEmployee => {
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
  const handleUpdateEmployee = (values: { [key: string]: any }): TypeEmployee => {
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

  // Удалить запись из таблицы
  const handleDeleteEmployee = (id: number) => {
    deleteEmployeeById(id).catch((error) => console.error(error));
    setUpdateTable(prevState => !prevState)
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
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableEmployee
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteEmployee}
      />
      <AddModalEmployee
        isOpen={isModalOpen}
        addItem={handleAddEmployee}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerEmployee
        isOpen={isDrawerOpen}
        selectedItemId={selectedEmployeeId}
        updateItem={handleUpdateEmployee}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};