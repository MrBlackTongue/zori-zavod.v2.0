import React, {useState} from 'react';
import {Typography, Space, Button, Input, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css';
import {deletePurchaseById, postNewPurchase, putChangePurchase} from '../../services';
import {TypePurchase} from '../../types';
import {TablePurchase} from "./components/TablePurchase";
import {AddModalPurchase} from "./components/AddModalPurchase";
import {EditDrawerPurchase} from "./components/EditDrawerPurchase";
import dayjs from "dayjs";

const {Title} = Typography;

export const PagePurchase: React.FC = () => {

  // Обновление таблицы, id выбраной закупки
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новую закупку
  const handleAddPurchase = (values: TypePurchase): void => {
    const purchase: TypePurchase = {
      amount: values.amount,
      cost: values.cost,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD'): undefined,
      product: {
        id: values.product?.id,
      },
      paid: values.paid,
    };
    setIsModalOpen(false);
    postNewPurchase(purchase);
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (purchaseId: number): void => {
    setSelectedPurchaseId(purchaseId);
    setIsDrawerOpen(true);
  };

  // Обновить закупку
  const handleUpdatePurchase = (values: TypePurchase): void => {
    const purchase: TypePurchase = {
      id: selectedPurchaseId,
      amount: values.amount,
      cost: values.cost,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD'): undefined,
      product: {
        id: values.product?.id,
      },
      paid: values.paid,
    };
    setIsDrawerOpen(false);
    putChangePurchase(purchase);
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeletePurchase = (id: number): void => {
    deletePurchaseById(id).catch((error) => console.error(error));
    setIsTableUpdate(prevState => !prevState)
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
            onClick={() => setIsTableUpdate(prevState => !prevState)}
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
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeletePurchase}
        searchText={searchText}
      />
      <AddModalPurchase
        isOpen={isModalOpen}
        addItem={handleAddPurchase}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerPurchase
        isOpen={isDrawerOpen}
        selectedItemId={selectedPurchaseId}
        updateItem={handleUpdatePurchase}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};