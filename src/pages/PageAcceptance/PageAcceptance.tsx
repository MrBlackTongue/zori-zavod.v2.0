import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form,} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css'
import dayjs, { Dayjs } from "dayjs";
import {postNewAcceptance} from "../../services";
import {TypeAcceptance} from "../../types";
import {TableAcceptance} from "./components/TableAcceptance";
import {AddModalAcceptance} from "./components/AddModalAcceptance";
//import {EditDrawerAcceptance} from "../PageAcceptance/components/EditDrawerAcceptance";

const {Title} = Typography;

export const PageAcceptance: React.FC = () => {

  const [form] = Form.useForm();

  // Товары в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новыую приемку
  const [acceptance] = useState<TypeAcceptance | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const date = dayjs('2023-04-06');
  const formattedDate = date.format('DD.MM.YYYY');

  // Открыть приемку по id
  //const [selectedAcceptanceId, setSelectedAcceptanceId] = useState<number>();

  // Добавить новую приемку
  const addAcceptance = (values: { [key: string]: any }): TypeAcceptance => {
    const acceptance: TypeAcceptance = {
      amount: values.amount,
      income: true,
      stock: {
        id: values.stock.id,
        amount: values.stock.amount,
      },
      date: dayjs(values.date),
      productBatch: {
        id: values.productBatch.id,
        amount: values.amount,
      },
      purchase: {
        id: values.purchase.id,
        amount: values.amount,
      },
    };
    setIsModalOpen(false)
    postNewAcceptance(acceptance)
    setUpdateTable(!updateTable)
    return acceptance;
  };

  // Функция для открытия дравера и передачи id выбранной партии товара
  const openDrawer = (acceptanceId: number) => {
   // setSelectedAcceptanceId(acceptanceId)
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    if (acceptance) {
      form.setFieldsValue(acceptance);
    }
  }, [acceptance, form]);

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
        {/*<Input*/}
        {/*  placeholder="Поиск по товарам"*/}
        {/*  onChange={(event) => searchTable(event.target.value)}*/}
        {/*  style={{width: '210px'}}*/}
        {/*  allowClear*/}
        {/*  prefix={<SearchOutlined/>}*/}
        {/*/>*/}
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
      openDrawer={() => {}}
    // searchText={searchText}
    />
    <AddModalAcceptance
      isOpen={isModalOpen}
      addItem={addAcceptance}
      onCancel={() => {setIsModalOpen(false)
      }}
    />
  </div>
  );
}