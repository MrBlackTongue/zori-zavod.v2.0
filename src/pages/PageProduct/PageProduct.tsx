import React, { useState } from 'react';
import { Button, FloatButton, Input, Space, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import '../../App.css';
import {
  createProduct,
  deleteProductById,
  updateProduct,
} from '../../services';
import { TypeProduct, TypeProductFormValue } from '../../types';
import { TableProduct } from './components/TableProduct';
import { CreateModalProduct } from './components/CreateModalProduct';
import { UpdateDrawerProduct } from './components/UpdateDrawerProduct';

export const PageProduct: React.FC = () => {
  const { Title } = Typography;

  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного товара, Текст поиска
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [searchText, setSearchText] = useState<string>('');

  // Добавить новый товар
  const handleCreateProduct = async (
    values: TypeProductFormValue,
  ): Promise<void> => {
    const product: TypeProduct = {
      title: values.title,
      productGroup: { id: values.productGroup },
      unit: { id: values.unit },
    };
    setIsModalOpen(false);
    await createProduct(product);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedProductId(id);
    setIsDrawerOpen(true);
  };

  // Обновить товар
  const handleUpdateProduct = async (
    values: TypeProductFormValue,
  ): Promise<void> => {
    const product: TypeProduct = {
      id: selectedProductId,
      title: values.title,
      productGroup: { id: values.productGroup },
      unit: { id: values.unit },
    };
    setIsDrawerOpen(false);
    await updateProduct(product);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteProduct = async (id: number): Promise<void> => {
    await deleteProductById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Товары</Title>
        <Space>
          <Input
            allowClear
            style={{ width: '210px' }}
            placeholder="Поиск по товарам"
            onChange={event => setSearchText(event.target.value)}
            prefix={<SearchOutlined />}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}>
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableProduct
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteProduct}
        searchText={searchText}
      />
      <CreateModalProduct
        isOpen={isModalOpen}
        createItem={handleCreateProduct}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerProduct
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductId}
        updateItem={handleUpdateProduct}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
