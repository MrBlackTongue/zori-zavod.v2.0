import React, { useState } from 'react';
import { Flex, FloatButton, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  createPurchase,
  deletePurchaseById,
  updatePurchase,
} from '../../../../api';
import { TypePurchase } from '../../../../types';
import { PurchaseTableView } from './PurchaseTable.view';
import dayjs from 'dayjs';
import AddButtonOld from '../../../atoms/AddButtonOld/AddButtonOld';

export const PurchaseTableContainer: React.FC = () => {
  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной закупки
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number>();

  // Текст поиска
  const [searchText, setSearchText] = useState<string>('');

  // Добавить новую закупку
  const handleCreatePurchase = async (values: TypePurchase): Promise<void> => {
    const purchase: TypePurchase = {
      amount: values.amount,
      cost: values.cost,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      product: values.product ? { id: values.product.id } : undefined,
      paid: values.paid,
    };
    setIsModalOpen(false);
    await createPurchase(purchase);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedPurchaseId(id);
    setIsDrawerOpen(true);
  };

  // Обновить закупку
  const handleUpdatePurchase = async (values: TypePurchase): Promise<void> => {
    const purchase: TypePurchase = {
      id: selectedPurchaseId,
      amount: values.amount,
      cost: values.cost,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      product: values.product ? { id: values.product.id } : undefined,
      paid: values.paid,
    };
    setIsDrawerOpen(false);
    await updatePurchase(purchase);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeletePurchase = async (id: number): Promise<void> => {
    await deletePurchaseById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButtonOld setIsModalOpen={setIsModalOpen} />
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Input
          allowClear
          placeholder="Поиск по товарам"
          style={{ width: '210px' }}
          onChange={event => setSearchText(event.target.value)}
          prefix={<SearchOutlined />}
        />
      </Flex>
      <FloatButton.BackTop />
      <PurchaseTableView
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeletePurchase}
        searchText={searchText}
      />
    </div>
  );
};
