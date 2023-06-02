import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  createProductionType,
  editProductionType,
  deleteProductionTypeById,
} from "../../services";
import {TypeProductionType, TypeProductionTypeFormValue} from "../../types";
import {TableProductionType} from "./components/TableProductionType";
import {AddModalProductionType} from "./components/AddModalProductionType";
import {EditDrawerProductionType} from "./components/EditDrawerProductionType";

const {Title} = Typography;

export const PageProductionType: React.FC = () => {

  // Обновление таблицы, id выбраного типа производства
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedProductionTypeId, setSelectedProductionTypeId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить запись в таблицу
  const handleAddProductionType = (values: TypeProductionTypeFormValue): void => {
    const productionType: TypeProductionType = {
      title: values.title,
      description: values.description,
    };
    setIsModalOpen(false)
    createProductionType(productionType)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (productionTypeId: number): void => {
    setSelectedProductionTypeId(productionTypeId)
    setIsDrawerOpen(true);
  };

  // Обновить запись в таблице
  const handleUpdateProductionType = (values: TypeProductionTypeFormValue): void => {
    const productionType: TypeProductionType = {
      id: selectedProductionTypeId,
      title: values.title,
      description: values.description,
    };
    setIsDrawerOpen(false)
    editProductionType(productionType)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteProductionType = (id: number): void => {
    deleteProductionTypeById(id)
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Тип производства</Title>
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
      <TableProductionType
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeleteProductionType}
      />
      <AddModalProductionType
        isOpen={isModalOpen}
        addItem={handleAddProductionType}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerProductionType
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductionTypeId}
        updateItem={handleUpdateProductionType}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}