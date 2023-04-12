import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form,} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css'
import {postNewAcceptance} from "../../services";
import {TypeAcceptance} from "../../types";
import {TableAcceptance} from "./components/TableAcceptance";
import {AddModalAcceptance} from "./components/AddModalAcceptance";

const {Title} = Typography;

export const PageAcceptance: React.FC = () => {

  const [form] = Form.useForm();

  // Товары в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новыую приемку
  const [acceptance] = useState<TypeAcceptance | null>(null);

  // Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Добавить новую приемку
  const addAcceptance = (values: { [key: string]: any }): TypeAcceptance => {
    console.log('values', values);
    const acceptance: TypeAcceptance = {
      amount: values.amount,
      income: true,
      date: values['date'].format('YYYY-MM-DD'),
      stock: {
        id: values?.stock?.id,
        amount: values?.stock?.amount,
        product: values?.stock?.product,
      },
      purchase: {
        id: values?.purchase?.id,
        amount: values?.amount,
        date: values['date'].format('YYYY-MM-DD'),
        product: values?.purchase?.product,
      },
    };
    console.log('acceptance', acceptance);
    setIsModalOpen(false)
    postNewAcceptance(acceptance)
    setUpdateTable(!updateTable)
    return acceptance;
  };

  useEffect(() => {
    if (acceptance) {
      form.setFieldsValue(acceptance);
    }
  }, [acceptance, form]);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Приемка товаров</Title>
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
      <TableAcceptance
        isUpdateTable={updateTable}
        openDrawer={() => {
        }}
      />
      <AddModalAcceptance
        isOpen={isModalOpen}
        addItem={addAcceptance}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
    </div>
  );
}