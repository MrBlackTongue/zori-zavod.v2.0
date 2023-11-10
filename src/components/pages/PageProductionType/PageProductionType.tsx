import React, { useState } from 'react';
import { FloatButton } from 'antd';
import {
  createProductionType,
  deleteProductionTypeById,
  updateProductionType,
} from '../../../services';
import {
  TypeProductionType,
  TypeProductionTypeFormValue,
} from '../../../types';
import { TableProductionType } from './components/TableProductionType';
import { CreateModalProductionType } from './components/CreateModalProductionType';
import { UpdateDrawerProductionType } from './components/UpdateDrawerProductionType';
import AddButton from '../../atoms/AddButton/AddButton';

export const PageProductionType: React.FC = () => {
  // Обновление таблицы, открыть/закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного типа производства
  const [selectedProductionTypeId, setSelectedProductionTypeId] =
    useState<number>();

  // Добавить запись в таблицу
  const handleCreateProductionType = async (
    values: TypeProductionTypeFormValue,
  ): Promise<void> => {
    const productionType: TypeProductionType = {
      title: values.title,
      description: values.description,
    };
    setIsModalOpen(false);
    await createProductionType(productionType);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedProductionTypeId(id);
    setIsDrawerOpen(true);
  };

  // Обновить запись в таблице
  const handleUpdateProductionType = async (
    values: TypeProductionTypeFormValue,
  ): Promise<void> => {
    const productionType: TypeProductionType = {
      id: selectedProductionTypeId,
      title: values.title,
      description: values.description,
    };
    setIsDrawerOpen(false);
    await updateProductionType(productionType);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteProductionType = async (id: number): Promise<void> => {
    await deleteProductionTypeById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButton setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableProductionType
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteProductionType}
      />
      <CreateModalProductionType
        isOpen={isModalOpen}
        createItem={handleCreateProductionType}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerProductionType
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductionTypeId}
        updateItem={handleUpdateProductionType}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
