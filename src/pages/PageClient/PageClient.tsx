import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteClientById, createClient, editClient} from "../../services";
import {TypeClient, TypeClientFormValue} from "../../types";
import {TableClient} from "./components/TableClient";
import {AddModalClient} from "./components/AddModalClient";
import {EditDrawerClient} from "./components/EditDrawerClient";

const {Title} = Typography;

export const PageClient: React.FC = () => {

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраного клиента
  const [selectedClientId, setSelectedClientId] = useState<number>();

  // Добавить нового клиента
  const handleAddClient = (values: TypeClientFormValue): void => {
    const client: TypeClient = {
      title: values.title,
    };
    setIsModalOpen(false)
    createClient(client)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (clientId: number): void => {
    setSelectedClientId(clientId)
    setIsDrawerOpen(true);
  };

  // Обновить клиента
  const handleUpdateClient = (values: TypeClientFormValue): void => {
    const client: TypeClient = {
      id: selectedClientId,
      title: values.title,
    };
    setIsDrawerOpen(false)
    editClient(client)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteClient = (id: number): void => {
    deleteClientById(id)
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Клиенты</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsTableUpdate(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableClient
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeleteClient}
      />
      <AddModalClient
        isOpen={isModalOpen}
        addItem={handleAddClient}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerClient
        isOpen={isDrawerOpen}
        selectedItemId={selectedClientId}
        updateItem={handleUpdateClient}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};