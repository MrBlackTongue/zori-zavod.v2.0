import React, { useState } from 'react';
import { FloatButton } from 'antd';
import {
  createProductGroup,
  deleteProductGroupById,
  updateProductGroup,
} from '../../services';
import { TypeProductGroup, TypeProductGroupFormValue } from '../../types';
import { TableProductGroup } from './components/TableProductGroup';
import { CreateModalProductGroup } from './components/CreateModalProductGroup';
import { UpdateDrawerProductGroup } from './components/UpdateDrawerProductGroup';
import AddButton from '../../components/AddButton/AddButton';

export const PageProductGroup: React.FC = () => {
  // Обновление таблицы, открыть/закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной группы товаров
  const [selectedProductGroupId, setSelectedProductGroupId] =
    useState<number>();

  // Добавить новую группу товаров
  const handleCreateProductGroup = async (
    values: TypeProductGroupFormValue,
  ): Promise<void> => {
    const productGroup: TypeProductGroup = {
      title: values.title,
      parent: values.parent ? { id: values.parent } : undefined,
    };
    setIsModalOpen(false);
    await createProductGroup(productGroup);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedProductGroupId(id);
    setIsDrawerOpen(true);
  };

  // Обновить группу товаров
  const handleUpdateProductGroup = async (
    values: TypeProductGroupFormValue,
  ): Promise<void> => {
    const productGroup: TypeProductGroup = {
      id: selectedProductGroupId,
      title: values.title,
      parent: values.parent ? { id: values.parent } : undefined,
    };
    setIsDrawerOpen(false);
    await updateProductGroup(productGroup);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteProductGroup = async (id: number): Promise<void> => {
    await deleteProductGroupById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButton setIsModalOpen={setIsModalOpen} />
      <FloatButton.BackTop />
      <TableProductGroup
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteProductGroup}
      />
      <CreateModalProductGroup
        isOpen={isModalOpen}
        createItem={handleCreateProductGroup}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerProductGroup
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductGroupId}
        updateItem={handleUpdateProductGroup}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
