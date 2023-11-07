import React, { useState } from 'react';
import { Flex, FloatButton, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  createProduct,
  deleteProductById,
  updateProduct,
} from '../../services';
import { TypeProduct, TypeProductFormValue } from '../../types';
import { TableProduct } from './components/TableProduct';
import { CreateModalProduct } from './components/CreateModalProduct';
import { UpdateDrawerProduct } from './components/UpdateDrawerProduct';
import AddButton from '../../components/AddButton/AddButton';

export const PageProduct: React.FC = () => {
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
    <div>
      <AddButton setIsModalOpen={setIsModalOpen} />
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Input
          allowClear
          style={{ width: '210px' }}
          placeholder="Поиск по товарам"
          onChange={event => setSearchText(event.target.value)}
          prefix={<SearchOutlined />}
        />
      </Flex>
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
