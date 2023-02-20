import React, {useState, useEffect} from 'react';
import {
  Typography,
  Space,
  Button,
  Form,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../../App.css'
import './pageProducts.css';
import {
  postNewProduct,
  putChangeProduct,
} from "../../../requests/productsRequests";
import {ProductType} from "../../../types/productType";
import {AddProduct} from "./addProduct";
import {ProductsTable} from "./productsTable";
import {EditProduct} from "./editProduct";

const {Title} = Typography;

const PageProducts: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

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
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading}/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            {updateButton}
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
      <ProductsTable
        updateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddProduct
        isOpen={isModalOpen}
        addProduct={addProduct}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditProduct
        isOpen={isDrawerOpen}
        selectedProductId={selectedProductId}
        updateProduct={updateProduct}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
}

export default PageProducts;