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

  // Обновление таблицы, id выбраного сотрудника
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить нового сотрудника
  const handleAddEmployee = (values: TypeEmployee): void => {
    const employee: TypeEmployee = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
    };
    setIsModalOpen(false)
    postNewEmployee(employee)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (employeeId: number): void => {
    setSelectedEmployeeId(employeeId)
    setIsDrawerOpen(true);
  };

  // Обновить сотрудника
  const handleUpdateEmployee = (values: TypeEmployee): void => {
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
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteEmployee = (id: number): void => {
    deleteEmployeeById(id).catch((error) => console.error(error));
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsTableUpdate(prevState => !prevState)}
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
        isUpdateTable={isTableUpdate}
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