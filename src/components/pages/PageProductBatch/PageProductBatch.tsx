import React, { useState } from 'react';
import { FloatButton } from 'antd';
import {
  createProductBatch,
  deleteProductBatchById,
  updateProductBatch,
} from '../../../services';
import { TypeProductBatch, TypeProductBatchFormValue } from '../../../types';
import { TableProductBatch } from './components/TableProductBatch';
import { CreateModalProductBatch } from './components/CreateModalProductBatch';
import { UpdateDrawerProductBatch } from './components/UpdateDrawerProductBatch';
import AddButtonOld from '../../atoms/AddButtonOld/AddButtonOld';

export const PageProductBatch: React.FC = () => {
  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной партии товаров
  const [selectedProductBatchId, setSelectedProductBatchId] =
    useState<number>();

  // Добавить новую партию товаров
  const handleCreateProductBatch = async (
    values: TypeProductBatchFormValue,
  ): Promise<void> => {
    const productBatch: TypeProductBatch = {
      product: { id: values.product },
      amount: values.amount,
    };
    setIsModalOpen(false);
    await createProductBatch(productBatch);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedProductBatchId(id);
    setIsDrawerOpen(true);
  };

  // Обновление партии товаров
  const handleUpdateProductBatch = async (
    values: TypeProductBatchFormValue,
  ): Promise<void> => {
    const productBatch: TypeProductBatch = {
      id: selectedProductBatchId,
      product: { id: values.product },
      amount: values.amount,
    };
    setIsDrawerOpen(false);
    await updateProductBatch(productBatch);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteProductBatch = async (id: number): Promise<void> => {
    await deleteProductBatchById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButtonOld setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableProductBatch
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteProductBatch}
      />
      <CreateModalProductBatch
        isOpen={isModalOpen}
        createItem={handleCreateProductBatch}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerProductBatch
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductBatchId}
        updateItem={handleUpdateProductBatch}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
