import React, { useState } from 'react';
import { Button, FloatButton, Input, Space, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import '../../App.css';
import { createAcceptance, deleteAcceptanceById } from '../../services';
import { TypeAcceptance, TypeAcceptanceFormValue } from '../../types';
import { TableAcceptance } from './components/TableAcceptance';
import { CreateModalAcceptance } from './components/CreateModalAcceptance';
import dayjs from 'dayjs';
import { useFetchAllData } from '../../hooks';

export const PageAcceptance: React.FC = () => {
  const { Title } = Typography;

  // Обновить таблицу, открыть закрыть модальное окно, текст поиска
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  // Хук для получения данных
  const { allStock, allPurchase } = useFetchAllData({
    depsStock: true,
    depsPurchase: true,
  });

  // Создать новую приемку товаров
  const handleCreateAcceptance = async (
    values: TypeAcceptanceFormValue,
  ): Promise<void> => {
    const stock = allStock.find(item => item.id === values.stock);
    const purchase = allPurchase.find(item => item.id === values.purchase);
    const acceptance: TypeAcceptance = {
      amount: values.amount ?? 0,
      income: true,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      stock: stock,
      productBatch: { id: values.productBatch },
      purchase: purchase,
    };
    setIsModalOpen(false);
    await createAcceptance(acceptance);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteAcceptance = async (id: number): Promise<void> => {
    await deleteAcceptanceById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Приемка товаров</Title>
        <Space>
          <Input
            placeholder="Поиск по товарам"
            onChange={event => setSearchText(event.target.value)}
            style={{ width: '210px' }}
            allowClear
            prefix={<SearchOutlined />}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}>
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableAcceptance
        searchText={searchText}
        isUpdateTable={isUpdateTable}
        onDelete={handleDeleteAcceptance}
      />
      <CreateModalAcceptance
        isOpen={isModalOpen}
        createItem={handleCreateAcceptance}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
