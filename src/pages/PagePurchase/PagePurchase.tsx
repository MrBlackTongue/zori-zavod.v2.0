import React, {useState} from 'react';
import {Typography, Space, Button, Input, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css';
import {postNewPurchase, putChangePurchase} from '../../services';
import {TypePurchase} from '../../types';
import {TablePurchase} from "./components/TablePurchase";
import {AddModalPurchase} from "./components/AddModalPurchase";
import {EditDrawerPurchase} from "./components/EditDrawerPurchase";

const {Title} = Typography;

export const PagePurchase: React.FC = () => {

  // Обновление таблицы, выбрана закупка по id
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новую закупку
  const addPurchase = (values: { [key: string]: any }): TypePurchase => {
    const purchase: TypePurchase = {
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

  // Открыть дравер
  const openDrawer = (purchaseId: number) => {
    setSelectedPurchaseId(purchaseId);
    setIsDrawerOpen(true);
  };

  // Обновить закупку
  const updatePurchase = (values: { [key: string]: any }): TypePurchase => {
    const purchase: TypePurchase = {
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
            allowClear
            placeholder="Поиск по товарам"
            style={{width: '210px'}}
            onChange={(event) => setSearchText(event.target.value)}
            prefix={<SearchOutlined/>}
          />
          <Button
            type="dashed"
            className="greenButton"
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
      <TablePurchase
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