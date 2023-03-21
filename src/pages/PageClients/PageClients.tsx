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
import './PageClients.css'
import {postNewClient, putChangeClient} from "../../services";
import {
  AddModalClient,
  EditDrawerClient,
  TableClients
} from "../../components";
import {ClientTypes} from "../../types";

const {Title} = Typography;

export const PageClients: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

  // Клиент в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать нового клиента
  const [client] = useState<ClientTypes | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть клиента по id
  const [selectedClientId, setSelectedClientId] = useState<number>();

  const addClient = (values: { [key: string]: any }): ClientTypes => {
    const client: ClientTypes = {
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

  const updateClient = (values: { [key: string]: any }): ClientTypes => {
    const client: ClientTypes = {
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
            icon={<SyncOutlined spin={loading}/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            {updateButton}
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