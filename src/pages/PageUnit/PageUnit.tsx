import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteUnitById, createUnit, editUnit} from "../../services";
import {TypeUnit, TypeUnitFormValue} from "../../types";
import {TableUnit} from "./components/TableUnit";
import {AddModalUnit} from "./components/AddModalUnit";
import {EditDrawerUnit} from "./components/EditDrawerUnit";

const {Title} = Typography;

export const PageUnit: React.FC = () => {

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраной единицы измерения
  const [selectedUnitId, setSelectedUnitId] = useState<number>();

  // Добавить новую единицу измерения
  const handleAddUnit = (values: TypeUnitFormValue): void => {
    const unit: TypeUnit = {
      name: values.name,
    };
    setIsModalOpen(false)
    createUnit(unit)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (unitId: number): void => {
    setSelectedUnitId(unitId)
    setIsDrawerOpen(true);
  };

  // Обновить единицу измерения
  const handleUpdateUnit = (values: TypeUnitFormValue): void => {
    const unit: TypeUnit = {
      id: selectedUnitId,
      name: values.name,
    };
    setIsDrawerOpen(false)
    editUnit(unit)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteUnit = (id: number): void => {
    deleteUnitById(id)
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Единицы измерения</Title>
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
      <TableUnit
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeleteUnit}
      />
      <AddModalUnit
        isOpen={isModalOpen}
        addItem={handleAddUnit}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerUnit
        isOpen={isDrawerOpen}
        selectedItemId={selectedUnitId}
        updateItem={handleUpdateUnit}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};