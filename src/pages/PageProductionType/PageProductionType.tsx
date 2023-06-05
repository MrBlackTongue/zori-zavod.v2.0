import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  createProductionType,
  updateProductionType,
  deleteProductionTypeById,
} from "../../services";
import {TypeProductionType, TypeProductionTypeFormValue} from "../../types";
import {TableProductionType} from "./components/TableProductionType";
import {CreateModalProductionType} from "./components/CreateModalProductionType";
import {UpdateDrawerProductionType} from "./components/UpdateDrawerProductionType";

const {Title} = Typography;

export const PageProductionType: React.FC = () => {

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраного типа производства
  const [selectedProductionTypeId, setSelectedProductionTypeId] = useState<number>();

  // Добавить запись в таблицу
  const handleCreateProductionType = (values: TypeProductionTypeFormValue): void => {
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
    updateProductionType(productionType)
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
      <CreateModalProductionType
        isOpen={isModalOpen}
        createItem={handleCreateProductionType}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerProductionType
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductionTypeId}
        updateItem={handleUpdateProductionType}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}