import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import './PageProductBatch.css'
import {postNewProductBatch, putChangeProductBatch} from "../../services";
import {ProductBatchTypes} from '../../types';
import {
  AddModalProductBatch, EditDrawerProductBatch, TableProductBatch
} from "../../components";

const {Title} = Typography;

const PageProductBatch: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

  // Партия товара в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новоую партию товара
  const [productBatch] = useState<ProductBatchTypes | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть партию товара по id
  const [selectedProductBatchId, setSelectedProductBatchId] = useState<number>();

  const addProductBatch = (values: { [key: string]: any }): ProductBatchTypes => {
    const productBatch: ProductBatchTypes = {
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

  useEffect(() => {
    if (productBatch) {
      form.setFieldsValue(productBatch);
    }
  }, [productBatch, form]);

  // Функция для открытия дравера и передачи id выбранной партии товара
  const openDrawer = (productBatchId: number) => {
    setSelectedProductBatchId(productBatchId)
    setIsDrawerOpen(true);
  };

  // Функция для обновления партии товара
  const updateProductBatch = (values: { [key: string]: any }): ProductBatchTypes => {
    const productBatch: ProductBatchTypes = {
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

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Партии товаров</Title>
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
export default PageProductBatch;