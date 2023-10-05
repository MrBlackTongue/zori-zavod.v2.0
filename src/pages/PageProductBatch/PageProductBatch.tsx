import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  deleteProductBatchById,
  createProductBatch,
  updateProductBatch
} from "../../services";
import {TypeProductBatch, TypeProductBatchFormValue} from '../../types';
import {TableProductBatch} from "./components/TableProductBatch";
import {CreateModalProductBatch} from "./components/CreateModalProductBatch";
import {UpdateDrawerProductBatch} from "./components/UpdateDrawerProductBatch";


export const PageProductBatch: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной партии товаров
  const [selectedProductBatchId, setSelectedProductBatchId] = useState<number>();

  // Добавить новую партию товаров
  const handleCreateProductBatch = (values: TypeProductBatchFormValue): void => {
    const productBatch: TypeProductBatch = {
      product: {id: values.product},
      amount: values.amount,
    };
    setIsModalOpen(false)
    void createProductBatch(productBatch)
    setIsUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (id: number): void => {
    setSelectedProductBatchId(id)
    setIsDrawerOpen(true);
  };

  // Обновление партии товаров
  const handleUpdateProductBatch = (values: TypeProductBatchFormValue): void => {
    const productBatch: TypeProductBatch = {
      id: selectedProductBatchId,
      product: {id: values.product},
      amount: values.amount,
    };
    setIsDrawerOpen(false)
    void updateProductBatch(productBatch)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteProductBatch = (id: number): void => {
    void deleteProductBatchById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Партии товаров</Title>
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
      <TableProductBatch
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteProductBatch}
      />
      <CreateModalProductBatch
        isOpen={isModalOpen}
        createItem={handleCreateProductBatch}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerProductBatch
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductBatchId}
        updateItem={handleUpdateProductBatch}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};