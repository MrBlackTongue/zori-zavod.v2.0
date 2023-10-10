import React, { useState } from 'react';
import { Button, FloatButton, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../App.css';
import {
  createProductGroup,
  deleteProductGroupById,
  updateProductGroup,
} from '../../services';
import { TypeProductGroup, TypeProductGroupFormValue } from '../../types';
import { TableProductGroup } from './components/TableProductGroup';
import { CreateModalProductGroup } from './components/CreateModalProductGroup';
import { UpdateDrawerProductGroup } from './components/UpdateDrawerProductGroup';

export const PageProductGroup: React.FC = () => {
  const { Title } = Typography;

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
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Группы товаров</Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(prevState => !prevState)}>
            Добавить
          </Button>
        </Space>
      </div>
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
