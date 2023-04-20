import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Input, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css'
import {postNewAcceptance} from "../../services";
import {TypeAcceptance} from "../../types";
import {TableAcceptance} from "./components/TableAcceptance";
import {AddModalAcceptance} from "./components/AddModalAcceptance";

const {Title} = Typography;

export const PageAcceptance: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Приёмка товаров
  const [acceptance] = useState<TypeAcceptance | null>(null);

  // Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новую приемку
  const addAcceptance = (values: { [key: string]: any }): TypeAcceptance => {
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
          <Input
            placeholder="Поиск по товарам"
            onChange={(event) => setSearchText(event.target.value)}
            style={{width: '210px'}}
            allowClear
            prefix={<SearchOutlined/>}
          />
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
      <FloatButton.BackTop />
      <TableAcceptance
        searchText={searchText}
        isUpdateTable={updateTable}
        openDrawer={() => {}}
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