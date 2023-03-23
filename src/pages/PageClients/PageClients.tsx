import React, {useState, useEffect} from 'react';
import {
  Typography,
  Space,
  Button,
  Form,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../App.css'
import {postNewClient, putChangeClient} from "../../services";
import {
  AddModalClient,
  EditDrawerClient,
  TableClients
} from "../../components";
import {ClientType} from "../../types";

const {Title} = Typography;

export const PageClients: React.FC = () => {

  const [form] = Form.useForm();

  // Клиент в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать нового клиента
  const [client] = useState<ClientType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть клиента по id
  const [selectedClientId, setSelectedClientId] = useState<number>();

  const addClient = (values: { [key: string]: any }): ClientType => {
    const client: ClientType = {
      title: values.title,
    };
    setIsModalOpen(false)
    postNewClient(client)
    setUpdateTable(!updateTable)
    return client;
  };

  useEffect(() => {
    if (client) {
      form.setFieldsValue(client);
    }
  }, [client, form]);

  // Drawer
  const openDrawer = (clientId: number) => {
    setSelectedClientId(clientId)
    setIsDrawerOpen(true);
  };

  const updateClient = (values: { [key: string]: any }): ClientType => {
    const client: ClientType = {
      id: selectedClientId,
      title: values.title,
    };
    setIsDrawerOpen(false)
    putChangeClient(client)
    setUpdateTable(!updateTable)
    return client
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
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <TableClients
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalClient
        isOpen={isModalOpen}
        addItem={addClient}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerClient
        isOpen={isDrawerOpen}
        selectedItemId={selectedClientId}
        updateItem={updateClient}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};