import React, {useState} from 'react';
import {Typography, Space, Button} from 'antd';
import {SyncOutlined, PlusOutlined } from '@ant-design/icons';
import {postNewProductGroup, putChangeProductGroup} from "../../services";
import {TypeProductGroup} from "../../types";
import {TableProductGroup} from "./components/TableProductGroup";
import { AddModalProductGroup} from "./components/AddModalProductGroup";
import { EditDrawerProductGroup} from "./components/EditDrawerProductGroup";

const { Title } = Typography;

export const PageProductGroup: React.FC = () => {

  // Обновление таблицы, выбранная группа товаров по id
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedProductGroupId, setSelectedProductGroupId] = useState<number>();

  // Открыть/закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить новую группу товаров
  const addProductGroup = (values: { [key: string]: any }): void => {
    console.log("values.parent", values.parent)
    const productGroup: TypeProductGroup = {
      title: values.title,
      parent: values.parent ? {id: values.parent} : undefined,
    };
    setIsModalOpen(false)
    postNewProductGroup(productGroup)
    setUpdateTable(!updateTable)
  };

  // Открыть дравер
  const openDrawer = (productGroupId: number) => {
    setSelectedProductGroupId(productGroupId)
    setIsDrawerOpen(true);
  };

  // Обновить группу товаров
  const updateProductGroup = (values: { [key: string]: any }): TypeProductGroup => {
    console.log('parent_value', values);
    const productGroup: TypeProductGroup = {
      id: values.id,
      title: values.title,
      parent: values.parent ? {id: values.parent} : undefined,
    };
    console.log(productGroup);
    setSelectedProductGroupId(values.id);
    setIsDrawerOpen(false);
    putChangeProductGroup(productGroup);
    setUpdateTable(!updateTable);
    return productGroup;
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Группы товаров</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined />}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
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
        addItem={addProductGroup}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerProductGroup
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductGroupId}
        updateItem={updateProductGroup}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};