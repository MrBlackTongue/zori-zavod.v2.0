import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteUnitById, createUnit, updateUnit} from "../../services";
import {TypeUnit, TypeUnitFormValue} from "../../types";
import {TableUnit} from "./components/TableUnit";
import {CreateModalUnit} from "./components/CreateModalUnit";
import {UpdateDrawerUnit} from "./components/UpdateDrawerUnit";

export const PageUnit: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбраной единицы измерения
  const [selectedUnitId, setSelectedUnitId] = useState<number>();

  // Добавить новую единицу измерения
  const handleCreateUnit = (values: TypeUnitFormValue): void => {
    const unit: TypeUnit = {
      name: values.name,
    };
    setIsModalOpen(false)
    void createUnit(unit)
    setIsUpdateTable(prevState => !prevState)
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
    void updateUnit(unit)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteUnit = (id: number): void => {
    void deleteUnitById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Единицы измерения</Title>
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
      <TableUnit
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteUnit}
      />
      <CreateModalUnit
        isOpen={isModalOpen}
        createItem={handleCreateUnit}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerUnit
        isOpen={isDrawerOpen}
        selectedItemId={selectedUnitId}
        updateItem={handleUpdateUnit}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};