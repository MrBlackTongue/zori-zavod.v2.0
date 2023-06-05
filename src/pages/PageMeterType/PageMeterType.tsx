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
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраного типа счетчика
  const [selectedMeterTypeId, setSelectedMeterTypeId] = useState<number>();

  // Добавить новый тип счетчика
  const handleCreateMeterType = (values: TypeMeterTypeFormValue): void => {
    const meterType: TypeMeterType = {
      title: values.title,
      unit: {id: values.unit},
      cost: values.cost,
    };
    setIsModalOpen(false)
    createMeterType(meterType)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (meterTypeId: number): void => {
    setSelectedMeterTypeId(meterTypeId)
    setIsDrawerOpen(true);
  };

  // Обновить тип счетчика
  const handleUpdateMeterType = (values: TypeMeterTypeFormValue): void => {
    const meterType: TypeMeterType = {
      title: values.title,
      unit: {id: values.unit},
      cost: values.cost,
      id: selectedMeterTypeId,
    };
    setIsDrawerOpen(false)
    updateMeterType(meterType)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteMeterType = (id: number): void => {
    deleteMeterTypeById(id)
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Типы счетчиков</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsTableUpdate(prevState => !prevState)}
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
        isUpdateTable={isTableUpdate}
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