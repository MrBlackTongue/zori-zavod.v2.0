import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Input,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined,} from '@ant-design/icons';
import '../../App.css'
import {postNewProduct, putChangeProduct} from "../../services";
import {TypeProduct} from "../../types";
import {TableProduct} from "./components/TableProduct";
import {AddModalProduct} from "./components/AddModalProduct";
import {EditDrawerProduct} from "./components/EditDrawerProduct";

const {Title} = Typography;

export const PageProduct: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Товар
  const [product] = useState<TypeProduct | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбран товар по id
  const [selectedProductId, setSelectedProductId] = useState<number>();

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новый товар
  const addProduct = (values: { [key: string]: any }): TypeProduct => {
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
  const updateProduct = (values: { [key: string]: any }): TypeProduct => {
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

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Товары</Title>
        <Space>
          <Input
            placeholder="Поиск по товарам"
            onChange={(event) => setSearchText(event.target.value)}
            style={{width: '210px'}}
            allowClear
            prefix={<SearchOutlined/>}
          />
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <TableProduct
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        searchText={searchText}
      />
      <AddModalProduct
        isOpen={isModalOpen}
        addItem={addProduct}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerProduct
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductId}
        updateItem={updateProduct}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
}