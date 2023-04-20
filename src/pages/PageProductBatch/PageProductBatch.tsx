import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {postNewProductBatch, putChangeProductBatch} from "../../services";
import {TypeProductBatch} from '../../types';
import {TableProductBatch} from "./components/TableProductBatch";
import {AddModalProductBatch} from "./components/AddModalProductBatch";
import {EditDrawerProductBatch} from "./components/EditDrawerProductBatch";

const {Title} = Typography;

export const PageProductBatch: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Партия товара
  const [productBatch] = useState<TypeProductBatch | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбрана партия товара по id
  const [selectedProductBatchId, setSelectedProductBatchId] = useState<number>();

  // Добавить новую партии товара
  const addProductBatch = (values: { [key: string]: any }): TypeProductBatch => {
    const productBatch: TypeProductBatch = {
      product: {
        id: values.product,
      },
      amount: values.amount,
    };
    setIsModalOpen(false)
    postNewProductBatch(productBatch)
    setUpdateTable(!updateTable)
    return productBatch;
  };

  // Открыть дравер
  const openDrawer = (productBatchId: number) => {
    setSelectedProductBatchId(productBatchId)
    setIsDrawerOpen(true);
  };

  // Обновление партии товара
  const updateProductBatch = (values: { [key: string]: any }): TypeProductBatch => {
    const productBatch: TypeProductBatch = {
      id: selectedProductBatchId,
      product: {
        id: values.product,
      },
      amount: values.amount,
    };
    setIsDrawerOpen(false)
    putChangeProductBatch(productBatch)
    setUpdateTable(!updateTable)
    return productBatch
  };

  useEffect(() => {
    if (productBatch) {
      form.setFieldsValue(productBatch);
    }
  }, [productBatch, form]);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Партии товаров</Title>
        <Space>
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
      <FloatButton.BackTop />
      <TableProductBatch
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalProductBatch
        isOpen={isModalOpen}
        addItem={addProductBatch}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerProductBatch
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductBatchId}
        updateItem={updateProductBatch}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};