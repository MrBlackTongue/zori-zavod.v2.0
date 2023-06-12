import React, {useState} from 'react';
import {Typography, Space, Button, Input, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteProductById, createProduct, updateProduct} from "../../services";
import {TypeProduct, TypeProductFormValue} from "../../types";
import {TableProduct} from "./components/TableProduct";
import {CreateModalProduct} from "./components/CreateModalProduct";
import {UpdateDrawerProduct} from "./components/UpdateDrawerProduct";

export const PageProduct: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраного товара, Текст поиска
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [searchText, setSearchText] = useState("");

  // Добавить новый товар
  const handleCreateProduct = (values: TypeProductFormValue): void => {
    const product: TypeProduct = {
      title: values.title,
      productGroup: {id: values.productGroup},
      unit: {id: values.unit},
    };
    setIsModalOpen(false)
    void createProduct(product)
    setIsUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (productId: number): void => {
    setSelectedProductId(productId)
    setIsDrawerOpen(true);
  };

  // Обновить товар
  const handleUpdateProduct = (values: TypeProductFormValue): void => {
    const product: TypeProduct = {
      id: selectedProductId,
      title: values.title,
      productGroup: {id: values.productGroup},
      unit: {id: values.unit},
    };
    setIsDrawerOpen(false)
    void updateProduct(product)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteProduct = (id: number): void => {
    void deleteProductById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Товары</Title>
        <Space>
          <Input
            allowClear
            style={{width: '210px'}}
            placeholder="Поиск по товарам"
            onChange={(event) => setSearchText(event.target.value)}
            prefix={<SearchOutlined/>}
          />
          <Button
            type="dashed"
            className='greenButton'
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
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
}