import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteUnitById} from "../../services";
// import {TypeWorkHours, TypeUnitFormValue, TypeEmployeeFormValue, } from "../../types";
// import {CreateModalUnit} from "../PageUnit/components/CreateModalUnit";
// import {UpdateDrawerUnit} from "../PageUnit/components/UpdateDrawerUnit";
import {TableWorkHours} from "./components/TableWorkHours";

export const PageWorkHours: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Обновить сотрудника
  // const handleUpdateWorkHour = (values: TypeEmployeeFormValue): void => {
  //   const employee: TypeEmployee = {
  //     id: selectedEmployeeId,
  //     firstName: values.firstName,
  //     lastName: values.lastName,
  //     phone: values.phone,
  //     salaryRate: values.salaryRate,
  //     hired: values.hired,
  //   };
  //   setIsDrawerOpen(false)
  //   void updateEmployee(employee)
  //   setIsUpdateTable(prevState => !prevState)
  // };

  // Удалить запись из таблицы
  const handleDeleteUnit = (id: number): void => {
    void deleteUnitById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Табель учёта рабочего времени</Title>
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
      <TableWorkHours
        isUpdateTable={isUpdateTable}
        // openDrawer={openDrawer}
        onDelete={handleDeleteUnit}
      />
      {/*<CreateModalUnit*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  createItem={handleCreateUnit}*/}
      {/*  onCancel={() => setIsModalOpen(false)}*/}
      {/*/>*/}
      {/*<UpdateDrawerUnit*/}
      {/*  isOpen={isDrawerOpen}*/}
      {/*  selectedItemId={selectedUnitId}*/}
      {/*  updateItem={handleUpdateUnit}*/}
      {/*  onCancel={() => setIsDrawerOpen(false)}*/}
      {/*/>*/}
    </div>
  );
};