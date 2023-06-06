import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteClientById, createClient, updateClient} from "../../services";
import {TypeClient, TypeClientFormValue} from "../../types";
import {TableClient} from "./components/TableClient";
import {CreateModalClient} from "./components/CreateModalClient";
import {UpdateDrawerClient} from "./components/UpdateDrawerClient";

export const PageClient: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраного клиента
  const [selectedClientId, setSelectedClientId] = useState<number>();

  // Добавить нового клиента
  const handleCreateClient = (values: TypeClientFormValue): void => {
    const client: TypeClient = {
      title: values.title,
    };
    setIsModalOpen(false)
    createClient(client)
    setIsUpdateTable(prevState => !prevState)
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
    updateClient(client)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteClient = (id: number): void => {
    deleteClientById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Клиенты</Title>
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
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableClient
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteClient}
      />
      <CreateModalClient
        isOpen={isModalOpen}
        createItem={handleCreateClient}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerClient
        isOpen={isDrawerOpen}
        selectedItemId={selectedClientId}
        updateItem={handleUpdateClient}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};