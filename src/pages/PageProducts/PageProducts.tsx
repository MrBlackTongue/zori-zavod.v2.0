import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Input,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined,} from '@ant-design/icons';
import '../../App.css'
import {postNewProduct, putChangeProduct} from "../../services";
import {ProductType} from "../../types";
import {AddModalProduct, TableProducts, EditDrawerProduct} from "../../components";

const {Title} = Typography;

export const PageProducts: React.FC = () => {

  const [form] = Form.useForm();

  // Товары в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новый товар
  const [product] = useState<ProductType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть товар по id
  const [selectedProductId, setSelectedProductId] = useState<number>();

  const addProduct = (values: { [key: string]: any }): ProductType => {
    const product: ProductType = {
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

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  // Drawer
  const openDrawer = (productId: number) => {
    setSelectedProductId(productId)
    setIsDrawerOpen(true);
  };

  const [searchText, setSearchText] = useState("");

  const searchTable = (value: string) => {
    setSearchText(value);
  }

  const updateProduct = (values: { [key: string]: any }): ProductType => {
    const product: ProductType = {
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

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Товары</Title>
        <Space>
          <Input
            placeholder="Поиск по товарам"
            onChange={(event) => searchTable(event.target.value)}
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
      <TableProducts
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