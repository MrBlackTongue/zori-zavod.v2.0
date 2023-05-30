import React, {useState} from 'react';
import {Typography, Space, Button} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import {postNewProductGroup, putChangeProductGroup} from "../../services";
import {TypeProductGroup} from "../../types";
import {TableProductGroup} from "./components/TableProductGroup";
import {AddModalProductGroup} from "./components/AddModalProductGroup";
import {EditDrawerProductGroup} from "./components/EditDrawerProductGroup";

const {Title} = Typography;

export const PageProductGroup: React.FC = () => {

  // Обновление таблицы, выбранная группа товаров по id
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedProductGroupId, setSelectedProductGroupId] = useState<number>();

  // Открыть/закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить новую группу товаров
  const handleAddProductGroup = (values: TypeProductGroup): void => {
    const productGroup: TypeProductGroup = {
      title: values.title,
      parent: values.parent ? {id: values.parent.id} : undefined,
    };
    setIsModalOpen(false)
    postNewProductGroup(productGroup)
    setUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (productGroupId: number) => {
    setSelectedProductGroupId(productGroupId)
    setIsDrawerOpen(true);
  };

  // Обновить группу товаров
  const handleUpdateProductGroup = (values: TypeProductGroup): void => {
    const productGroup: TypeProductGroup = {
      id: selectedProductGroupId,
      title: values.title,
      parent: values.parent ? {id: values.parent.id} : undefined,
    };
    setIsDrawerOpen(false);
    putChangeProductGroup(productGroup);
    setUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Группы товаров</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
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
      <TableProductGroup
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalProductGroup
        isOpen={isModalOpen}
        addItem={handleAddProductGroup}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerProductGroup
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductGroupId}
        updateItem={handleUpdateProductGroup}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};