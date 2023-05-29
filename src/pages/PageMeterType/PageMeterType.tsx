import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteMeterTypeById, postNewMeterType, putChangeMeterType} from "../../services";
import {TypeMeterType} from "../../types";
import {TableMeterType} from "./components/TableMeterType";
import {AddModalMeterType} from "./components/AddModalMeterType";
import {EditDrawerMeterType} from "./components/EditDrawerMeterType";

const {Title} = Typography;

export const PageMeterType: React.FC = () => {

  // Обновление таблицы, id выбраного типа счетчика
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedMeterTypeId, setSelectedMeterTypeId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить новый тип счетчика
  const handleAddMeterType = (values: { [key: string]: any }): void => {
    const meterType: TypeMeterType = {
      title: values.title,
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
      cost: values.cost,
    };
    setIsModalOpen(false)
    postNewMeterType(meterType)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (meterTypeId: number): void => {
    setSelectedMeterTypeId(meterTypeId)
    setIsDrawerOpen(true);
  };

  // Обновить тип счетчика
  const handleUpdateMeterType = (values: { [key: string]: any }): void => {
    const meterType: TypeMeterType = {
      title: values.title,
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
      cost: values.cost,
      id: selectedMeterTypeId,
    };
    setIsDrawerOpen(false)
    putChangeMeterType(meterType)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteMeterType = (id: number): void => {
    deleteMeterTypeById(id).catch((error) => console.error(error));
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
      <TableMeterType
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeleteMeterType}
      />
      <AddModalMeterType
        isOpen={isModalOpen}
        addItem={handleAddMeterType}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerMeterType
        isOpen={isDrawerOpen}
        selectedItemId={selectedMeterTypeId}
        updateItem={handleUpdateMeterType}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};