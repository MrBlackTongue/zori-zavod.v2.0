import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Input} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css';
import {postNewPurchase, putChangePurchase} from '../../services';
import {PurchaseType} from '../../types';
import {AddModalPurchase, TablePurchases, EditDrawerPurchase} from '../../components';

const {Title} = Typography;

export const PagePurchases: React.FC = () => {

  const [form] = Form.useForm();

  const [loading] = useState(false);
  const [updateButton] = useState('Обновить');

  // Закупки в таблице, обновить закупки
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новую закупку.
  const [purchase] = useState<PurchaseType | null>(null);

  // Открыть закрыть модальное окно, drawer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //  Открыть закупку по id
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number>();

  const [searchText, setSearchText] = useState("");

  const addPurchase = (values: { [key: string]: any }): PurchaseType => {
    const purchase: PurchaseType = {
      amount: values.amount,
      cost: values.cost,
      date: values['date'].format('YYYY-MM-DD'),
      product: {
        id: values.product,
      },
      paid: values.paid,
    };
    setIsModalOpen(false);
    postNewPurchase(purchase);
    setUpdateTable(!updateTable);
    return purchase;
  };

  useEffect(() => {
    if (purchase) {
      form.setFieldsValue(purchase);
    }
  }, [purchase, form]);

  const openDrawer = (purchaseId: number) => {
    setSelectedPurchaseId(purchaseId);
    setIsDrawerOpen(true);
  };

  const updatePurchase = (values: { [key: string]: any }): PurchaseType => {
    const purchase: PurchaseType = {
      id: selectedPurchaseId,
      amount: values.amount,
      cost: values.cost,
      date: values['date'].format('YYYY-MM-DD'),
      product: {
        id: values.product,
      },
      paid: values.paid,
    };
    setIsDrawerOpen(false);
    putChangePurchase(purchase);
    setUpdateTable(!updateTable);
    return purchase;
  };

  return (
    <div style={{display: 'grid'}}>
      <div className="centerTitle">
        <Title level={3}>Закупки</Title>
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
            icon={<SyncOutlined spin={loading}/>}
            onClick={() => setUpdateTable(!updateTable)}
            className="greenButton"
          >
            {updateButton}
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
      <TablePurchases
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        searchText={searchText}
      />
      <AddModalPurchase
        isOpen={isModalOpen}
        addItem={addPurchase}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerPurchase
        isOpen={isDrawerOpen}
        selectedItemId={selectedPurchaseId}
        updateItem={updatePurchase}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};