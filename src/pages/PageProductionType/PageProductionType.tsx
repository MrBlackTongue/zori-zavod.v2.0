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

export const PageProductionType: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState(false);
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
    void createProductionType(productionType)
    setIsUpdateTable(prevState => !prevState)
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
    void updateProductionType(productionType)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteProductionType = (id: number): void => {
    void deleteProductionTypeById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Типы производства</Title>
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
      <TableProductionType
        isUpdateTable={isUpdateTable}
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