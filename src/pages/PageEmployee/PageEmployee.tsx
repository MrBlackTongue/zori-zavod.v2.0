import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteEmployeeById, createEmployee, updateEmployee} from "../../services";
import {TypeEmployee, TypeEmployeeFormValue} from "../../types";
import {TableEmployee} from "./components/TableEmployee";
import {CreateModalEmployee} from "./components/CreateModalEmployee";
import {UpdateDrawerEmployee} from "./components/UpdateDrawerEmployee";

export const PageEmployee: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  //  id выбранного сотрудника
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

  // Добавить нового сотрудника
  const handleCreateEmployee = (values: TypeEmployeeFormValue): void => {
    const employee: TypeEmployee = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
    };
    setIsModalOpen(false)
    void createEmployee(employee)
    setIsUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (id: number): void => {
    setSelectedEmployeeId(id)
    setIsDrawerOpen(true);
  };

  // Обновить сотрудника
  const handleUpdateEmployee = (values: TypeEmployeeFormValue): void => {
    const employee: TypeEmployee = {
      id: selectedEmployeeId,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
    };
    setIsDrawerOpen(false)
    void updateEmployee(employee)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteEmployee = (id: number): void => {
    void deleteEmployeeById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className='greenButton'
          >
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
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteEmployee}
      />
      <CreateModalEmployee
        isOpen={isModalOpen}
        createItem={handleCreateEmployee}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerEmployee
        isOpen={isDrawerOpen}
        selectedItemId={selectedEmployeeId}
        updateItem={handleUpdateEmployee}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};