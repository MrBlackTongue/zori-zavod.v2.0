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

  // id выбранной категории
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  // Добавить новую категорию
  const handleCreateCategory = async (
    values: TypeCategoryFormValue,
  ): Promise<void> => {
    const category: TypeCategory = {
      title: values.title,
      parent: values.parent ? { id: values.parent } : undefined,
    };
    setIsModalOpen(false);
    await createCategory(category);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedCategoryId(id);
    setIsDrawerOpen(true);
  };

  // Обновить категорию
  const handleUpdateCategory = async (
    values: TypeCategoryFormValue,
  ): Promise<void> => {
    const category: TypeCategory = {
      id: selectedCategoryId,
      title: values.title,
      parent: values.parent ? { id: values.parent } : undefined,
    };
    setIsDrawerOpen(false);
    await updateCategory(category);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteCategory = async (id: number): Promise<void> => {
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
        onDelete={handleDeleteCategory}
      />
      <CreateModalCategory
        isOpen={isModalOpen}
        createItem={handleCreateCategory}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerCategory
        isOpen={isDrawerOpen}
        selectedItemId={selectedCategoryId}
        updateItem={handleUpdateCategory}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
