import React, { useState } from 'react';
import { FloatButton } from 'antd';
import {
  createCategory,
  deleteCategoryById,
  updateCategory,
} from '../../../api';
import { TypeCategory, TypeCategoryFormValue } from '../../../types';
import { TableCategory } from './components/TableCategory';
import { CreateModalCategory } from './components/CreateModalCategory';
import { UpdateDrawerCategory } from './components/UpdateDrawerCategory';
import AddButtonOld from '../../atoms/AddButtonOld/AddButtonOld';

export const PageCategory: React.FC = () => {
  // Обновление таблицы, открыть/закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной группы товаров
  const [selectedProductGroupId, setSelectedProductGroupId] =
    useState<number>();

  // Добавить новую группу товаров
  const handleCreateProductGroup = async (
    values: TypeCategoryFormValue,
  ): Promise<void> => {
    const productGroup: TypeCategory = {
      title: values.title,
      parent: values.parent ? { id: values.parent } : undefined,
    };
    setIsModalOpen(false);
    await createCategory(productGroup);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedProductGroupId(id);
    setIsDrawerOpen(true);
  };

  // Обновить группу товаров
  const handleUpdateProductGroup = async (
    values: TypeCategoryFormValue,
  ): Promise<void> => {
    const productGroup: TypeCategory = {
      id: selectedProductGroupId,
      title: values.title,
      parent: values.parent ? { id: values.parent } : undefined,
    };
    setIsDrawerOpen(false);
    await updateCategory(productGroup);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteProductGroup = async (id: number): Promise<void> => {
    await deleteCategoryById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButtonOld setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableCategory
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteProductGroup}
      />
      <CreateModalCategory
        isOpen={isModalOpen}
        createItem={handleCreateProductGroup}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerCategory
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductGroupId}
        updateItem={handleUpdateProductGroup}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
