import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css'
import {createProductGroup, updateProductGroup, deleteProductGroupById} from "../../services";
import {TypeProductGroup, TypeProductGroupFormValue} from "../../types";
import {TableProductGroup} from "./components/TableProductGroup";
import {CreateModalProductGroup} from "./components/CreateModalProductGroup";
import {UpdateDrawerProductGroup} from "./components/UpdateDrawerProductGroup";

export const PageProductGroup: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть/закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбранной группы товаров
  const [selectedProductGroupId, setSelectedProductGroupId] = useState<number>();

  // Добавить новую группу товаров
  const handleCreateProductGroup = (values: TypeProductGroupFormValue): void => {
    const productGroup: TypeProductGroup = {
      title: values.title,
      parent: values.parent ? {id: values.parent} : undefined,
    };
    setIsModalOpen(false)
    void createProductGroup(productGroup)
    setIsUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (productGroupId: number): void => {
    setSelectedProductGroupId(productGroupId)
    setIsDrawerOpen(true);
  };

  // Обновить группу товаров
  const handleUpdateProductGroup = (values: TypeProductGroupFormValue): void => {
    const productGroup: TypeProductGroup = {
      id: selectedProductGroupId,
      title: values.title,
      parent: values.parent ? {id: values.parent} : undefined,
    };
    setIsDrawerOpen(false);
    void updateProductGroup(productGroup);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteProductGroup = (id: number): void => {
    void deleteProductGroupById(id)
    setIsUpdateTable(prevState => !prevState)
  }

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Группы товаров</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalOpen(prevState => !prevState)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
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