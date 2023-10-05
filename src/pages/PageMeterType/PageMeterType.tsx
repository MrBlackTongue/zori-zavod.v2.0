import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteMeterTypeById, createMeterType, updateMeterType} from "../../services";
import {TypeMeterType, TypeMeterTypeFormValue} from "../../types";
import {TableMeterType} from "./components/TableMeterType";
import {CreateModalMeterType} from "./components/CreateModalMeterType";
import {UpdateDrawerMeterType} from "./components/UpdateDrawerMeterType";

export const PageMeterType: React.FC = () => {
  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного типа счетчика
  const [selectedMeterTypeId, setSelectedMeterTypeId] = useState<number>();

  // Добавить новый тип счетчика
  const handleCreateMeterType = async (values: TypeMeterTypeFormValue): Promise<void> => {
    const meterType: TypeMeterType = {
      title: values.title,
      unit: {id: values.unit},
      cost: values.cost,
    };
    setIsModalOpen(false)
    await createMeterType(meterType)
    setIsUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (id: number): void => {
    setSelectedMeterTypeId(id)
    setIsDrawerOpen(true);
  };

  // Обновить тип счетчика
  const handleUpdateMeterType = async (values: TypeMeterTypeFormValue): Promise<void> => {
    const meterType: TypeMeterType = {
      id: selectedMeterTypeId,
      title: values.title,
      unit: {id: values.unit},
      cost: values.cost,
    };
    setIsDrawerOpen(false)
    await updateMeterType(meterType)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteMeterType = async (id: number): Promise<void> => {
    await deleteMeterTypeById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Типы счетчиков</Title>
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
      <TableMeterType
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteMeterType}
      />
      <CreateModalMeterType
        isOpen={isModalOpen}
        createItem={handleCreateMeterType}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerMeterType
        isOpen={isDrawerOpen}
        selectedItemId={selectedMeterTypeId}
        updateItem={handleUpdateMeterType}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};