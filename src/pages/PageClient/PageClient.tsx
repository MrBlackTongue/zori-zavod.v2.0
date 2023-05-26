import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteClientById, postNewClient, putChangeClient} from "../../services";
import {TypeClient} from "../../types";
import {TableClient} from "./components/TableClient";
import {AddModalClient} from "./components/AddModalClient";
import {EditDrawerClient} from "./components/EditDrawerClient";

const {Title} = Typography;

export const PageClient: React.FC = () => {

  // Обновление таблицы, id выбраного клиента
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить нового клиента
  const handleAddClient = (values: { [key: string]: any }): TypeClient => {
    const client: TypeClient = {
      title: values.title,
    };
    setIsModalOpen(false)
    postNewClient(client)
    setUpdateTable(!updateTable)
    return client;
  };

  // Открыть дравер
  const openDrawer = (clientId: number) => {
    setSelectedClientId(clientId)
    setIsDrawerOpen(true);
  };

  // Обновить клиента
  const handleUpdateClient = (values: { [key: string]: any }): TypeClient => {
    const client: TypeClient = {
      id: selectedClientId,
      title: values.title,
    };
    setIsDrawerOpen(false)
    putChangeClient(client)
    setUpdateTable(!updateTable)
    return client
  };

  // Удалить запись из таблицы
  const handleDeleteClient = (id: number) => {
    deleteClientById(id).catch((error) => console.error(error));
    setUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Клиенты</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
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
        isUpdateTable={updateTable}
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
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};