import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Input,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined,} from '@ant-design/icons';
import '../../App.css'
import {postNewAcceptance} from "../../services";
import {AcceptanceType} from "../../types/_index";
import {TableAcceptance} from "./components/TableAcceptance";
import {AddModalAcceptance} from "./components/AddModalAcceptance";
//import {EditDrawerAcceptance} from "../PageAcceptance/components/EditDrawerAcceptance";
import {EditDrawerProductBatch} from "../PageProductBatch/components/EditDrawerProductBatch";


const {Title} = Typography;

export const PageAcceptance: React.FC = () => {

  const [form] = Form.useForm();

  // Товары в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новыую приемку
  const [acceptance] = useState<AcceptanceType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть приемку по id
  const [selectedAcceptanceId, setSelectedAcceptanceId] = useState<number>();

  const addAcceptance = (values: { [key: string]: any }): AcceptanceType => {
    const acceptance: AcceptanceType = {
      amount: values.amount,
      stock: {
        id: values.stock.id,
        amount: values.stock.amount,
      },
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
    setSelectedAcceptanceId(acceptanceId)
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
      <Title level={3}>Товары</Title>
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
      openDrawer={openDrawer}
    //  searchText={searchText}
    />
    <AddModalAcceptance
      isOpen={isModalOpen}
      addItem={addAcceptance}
      onCancel={() => {
        setIsModalOpen(false)
      }}
    />
    {/*<EditDrawerAcceptance*/}
    {/*  isOpen={isDrawerOpen}*/}
    {/*  selectedItemId={selectedAcceptanceId}*/}
    {/*  updateItem={updateAcceptance}*/}
    {/*  closeDrawer={() => {*/}
    {/*    setIsDrawerOpen(false);*/}
    {/*  }}*/}
    {/*/>*/}
  </div>
  );
}