import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteUnitById, postNewUnit, putChangeUnit} from "../../services";
import {TypeUnit} from "../../types";
import {TableUnit} from "./components/TableUnit";
import {AddModalUnit} from "./components/AddModalUnit";
import {EditDrawerUnit} from "./components/EditDrawerUnit";

const {Title} = Typography;

export const PageUnit: React.FC = () => {

  // Обновление таблицы, id выбраной единицы измерения
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить новую единицу измерения
  const handleAddUnit = (values: { [key: string]: any }): void => {
    const unit: TypeUnit = {
      name: values.name,
    };
    setIsModalOpen(false)
    postNewUnit(unit)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (unitId: number) => {
    setSelectedUnitId(unitId)
    setIsDrawerOpen(true);
  };

  // Обновить единицу измерения
  const handleUpdateUnit = (values: TypeUnit): void => {
    const unit: TypeUnit = {
      name: values.name,
      id: selectedUnitId,
    };
    setIsDrawerOpen(false)
    putChangeUnit(unit)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteUnit = (id: number): void => {
    deleteUnitById(id).catch((error) => console.error(error));
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
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};