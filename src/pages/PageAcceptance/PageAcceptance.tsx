import React, {useState} from 'react';
import {Typography, Space, Button, Input, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css'
import {deleteAcceptanceById, postNewAcceptance} from "../../services";
import {TypeAcceptance} from "../../types";
import {TableAcceptance} from "./components/TableAcceptance";
import {AddModalAcceptance} from "./components/AddModalAcceptance";
import dayjs from "dayjs";

const {Title} = Typography;

export const PageAcceptance: React.FC = () => {

  // Обновить таблицу, открыть закрыть модальное окно, текст поиска
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Добавить новую приемку товаров
  const handleAddAcceptance = (values: TypeAcceptance): void => {
    const acceptance: TypeAcceptance = {
      amount: values.amount || 0,
      income: true,
      date: values.date ? dayjs(values.date.format('YYYY-MM-DD')): undefined,
      stock: values.stock && {
        id: values.stock?.id,
        amount: values.stock?.amount,
        product: values.stock?.product,
      },
      purchase: values.purchase && {
        id: values.purchase?.id,
        amount: values.amount,
        date: values.date ? dayjs(values.date.format('YYYY-MM-DD')): undefined,
        product: values.purchase?.product,
      },
    };
    setIsModalOpen(false)
    postNewAcceptance(acceptance)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteAcceptance = (id: number): void => {
    deleteAcceptanceById(id).catch((error) => console.error(error));
    setIsTableUpdate(prevState => !prevState)
  };

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
            onClick={() => setIsTableUpdate(prevState => !prevState)}
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
      <TableAcceptance
        searchText={searchText}
        isUpdateTable={isTableUpdate}
        onDelete={handleDeleteAcceptance}
      />
      <AddModalAcceptance
        isOpen={isModalOpen}
        addItem={handleAddAcceptance}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}