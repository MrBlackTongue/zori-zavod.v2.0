import React, {useState} from 'react';
import {Typography, Space, Button, Input, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteProductById, postNewProduct, putChangeProduct} from "../../services";
import {TypeProduct} from "../../types";
import {TableProduct} from "./components/TableProduct";
import {AddModalProduct} from "./components/AddModalProduct";
import {EditDrawerProduct} from "./components/EditDrawerProduct";

const {Title} = Typography;

export const PageProduct: React.FC = () => {

  // Обновление таблицы, id выбраного товара
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новый товар
  const handleAddProduct = (values: { [key: string]: any }): TypeProduct => {
    const product: TypeProduct = {
      title: values.title,
      productGroup: {
        id: values.productGroup.id,
        title: values.productGroup.title,
      },
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
    };
    setIsModalOpen(false)
    postNewProduct(product)
    setUpdateTable(!updateTable)
    return product;
  };

  // Открыть дравер
  const openDrawer = (productId: number) => {
    setSelectedProductId(productId)
    setIsDrawerOpen(true);
  };

  // Обновить товар
  const handleUpdateProduct = (values: { [key: string]: any }): TypeProduct => {
    const product: TypeProduct = {
      title: values.title,
      productGroup: {
        id: values.productGroup.id,
        title: values.productGroup.title,
      },
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
      id: selectedProductId,
    };
    setIsDrawerOpen(false)
    putChangeProduct(product)
    setUpdateTable(!updateTable)
    return product
  };

  // Удалить запись из таблицы
  const handleDeleteProduct = (id: number) => {
    deleteProductById(id).catch((error) => console.error(error));
    setUpdateTable(prevState => !prevState)
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
            onClick={() => setUpdateTable(!updateTable)}
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
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteProduct}
        searchText={searchText}
      />
      <AddModalProduct
        isOpen={isModalOpen}
        addItem={handleAddProduct}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerProduct
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductId}
        updateItem={handleUpdateProduct}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}