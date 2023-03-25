import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {postNewProductBatch, putChangeProductBatch} from "../../services";
import {ProductBatchType} from '../../types/_index';
import {TableProductBatch} from "./components/TableProductBatch";
import {AddModalProductBatch} from "./components/AddModalProductBatch";
import {EditDrawerProductBatch} from "./components/EditDrawerProductBatch";

const {Title} = Typography;

export const PageProductBatch: React.FC = () => {

  const [form] = Form.useForm();

  // Партия товара в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новую партию товара
  const [productBatch] = useState<ProductBatchType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть партию товара по id
  const [selectedProductBatchId, setSelectedProductBatchId] = useState<number>();

  // Функция для добавления новой партии товара
  const addProductBatch = (values: { [key: string]: any }): ProductBatchType => {
    const productBatch: ProductBatchType = {
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

  // Функция для открытия дравера и передачи id выбранной партии товара
  const openDrawer = (productBatchId: number) => {
    setSelectedProductBatchId(productBatchId)
    setIsDrawerOpen(true);
  };

  // Функция для обновления партии товара
  const updateProductBatch = (values: { [key: string]: any }): ProductBatchType => {
    const productBatch: ProductBatchType = {
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