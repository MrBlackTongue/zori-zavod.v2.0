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
import {TypeClient} from "../../types";
import {TableClient} from "./components/TableClient";
import {AddModalClient} from "./components/AddModalClient";
import {EditDrawerClient} from "./components/EditDrawerClient";

const {Title} = Typography;

export const PageClient: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы, клиент
  const [updateTable, setUpdateTable] = useState(false);
  const [client] = useState<TypeClient | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбран клиент по id
  const [selectedClientId, setSelectedClientId] = useState<number>();

  // Добавить нового клиента
  const addClient = (values: { [key: string]: any }): TypeClient => {
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
  const updateClient = (values: { [key: string]: any }): TypeClient => {
    const client: TypeClient = {
      id: selectedClientId,
      title: values.title,
    };
    setIsDrawerOpen(false)
    putChangeClient(client)
    setUpdateTable(!updateTable)
    return client
  };

  useEffect(() => {
    if (client) {
      form.setFieldsValue(client);
    }
  }, [client, form]);

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
      <TableClient
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