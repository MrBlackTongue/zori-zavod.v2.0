import React, { useState } from 'react';
import { Button, FloatButton, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../App.css';
import {
  createEmployee,
  deleteEmployeeById,
  updateEmployee,
} from '../../services';
import { TypeEmployee, TypeEmployeeFormValue } from '../../types';
import { TableEmployee } from './components/TableEmployee';
import { CreateModalEmployee } from './components/CreateModalEmployee';
import { UpdateDrawerEmployee } from './components/UpdateDrawerEmployee';

export const PageEmployee: React.FC = () => {
  const { Title } = Typography;

  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  //  id выбранного сотрудника
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

  // Добавить нового сотрудника
  const handleCreateEmployee = async (
    values: TypeEmployeeFormValue,
  ): Promise<void> => {
    const employee: TypeEmployee = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
    };
    setIsModalOpen(false);
    await createEmployee(employee);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedEmployeeId(id);
    setIsDrawerOpen(true);
  };

  // Обновить сотрудника
  const handleUpdateEmployee = async (
    values: TypeEmployeeFormValue,
  ): Promise<void> => {
    const employee: TypeEmployee = {
      id: selectedEmployeeId,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      salaryRate: values.salaryRate,
      hired: values.hired,
    };
    setIsDrawerOpen(false);
    await updateEmployee(employee);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteEmployee = async (id: number): Promise<void> => {
    await deleteEmployeeById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Сотрудники</Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}>
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
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
