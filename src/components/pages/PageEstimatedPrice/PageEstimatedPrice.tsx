import React, { useState } from 'react';
import { FloatButton } from 'antd';
import {
  createEstimatedPrice,
  deleteEstimatedPriceById,
  updateEstimatedPrice,
} from '../../../services';
import {
  TypeEstimatedPrice,
  TypeEstimatedPriceFormValue,
} from '../../../types';
import { TableEstimatedPrice } from './components/TableEstimatedPrice';
import { CreateModalEstimatedPrice } from './components/CreateModalEstimatedPrice';
import { UpdateDrawerEstimatedPrice } from './components/UpdateDrawerEstimatedPrice';
import dayjs from 'dayjs';
import AddButtonOld from '../../atoms/AddButtonOld/AddButtonOld';

export const PageEstimatedPrice: React.FC = () => {
  // Обновление таблицы, открыть/закрыть модальное окно, драйвер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной расчетной цены
  const [selectedEstimatedPriceId, setSelectedEstimatedPriceId] =
    useState<number>();

  // Добавить новую расчетную цену
  const handleCreateEstimatedPrice = async (
    values: TypeEstimatedPriceFormValue,
  ): Promise<void> => {
    const estimatedPrice: TypeEstimatedPrice = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      price: values.price,
      product: { id: values.product },
    };
    setIsModalOpen(false);
    await createEstimatedPrice(estimatedPrice);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedEstimatedPriceId(id);
    setIsDrawerOpen(true);
  };

  // Обновить расчетную цену
  const handleUpdateEstimatedPrice = async (
    values: TypeEstimatedPriceFormValue,
  ): Promise<void> => {
    const estimatedPrice: TypeEstimatedPrice = {
      id: selectedEstimatedPriceId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      price: values.price,
      product: { id: values.product },
    };
    setIsDrawerOpen(false);
    await updateEstimatedPrice(estimatedPrice);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteEstimatedPrice = async (id: number): Promise<void> => {
    await deleteEstimatedPriceById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButtonOld setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableEstimatedPrice
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteEstimatedPrice}
      />
      <CreateModalEstimatedPrice
        isOpen={isModalOpen}
        createItem={handleCreateEstimatedPrice}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerEstimatedPrice
        isOpen={isDrawerOpen}
        selectedItemId={selectedEstimatedPriceId}
        updateItem={handleUpdateEstimatedPrice}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
