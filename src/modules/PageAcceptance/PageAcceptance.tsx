import React, { useState } from 'react';
import { Flex, FloatButton, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createAcceptance, deleteAcceptanceById } from '../../services';
import { TypeAcceptance, TypeAcceptanceFormValue } from '../../types';
import { TableAcceptance } from './components/TableAcceptance';
import { CreateModalAcceptance } from './components/CreateModalAcceptance';
import dayjs from 'dayjs';
import { useFetchAllData } from '../../hooks';
import AddButton from '../../components/AddButton/AddButton';

export const PageAcceptance: React.FC = () => {
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
    <div>
      <AddButton setIsModalOpen={setIsModalOpen} />
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Input
          placeholder="Поиск по товарам"
          onChange={event => setSearchText(event.target.value)}
          style={{ width: '210px' }}
          allowClear
          prefix={<SearchOutlined />}
        />
      </Flex>
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
