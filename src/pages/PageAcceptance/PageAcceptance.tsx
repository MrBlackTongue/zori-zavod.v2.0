import React, {useState} from 'react';
import {Typography, Space, Button, Input, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css'
import {deleteAcceptanceById, createAcceptance} from "../../services";
import {TypeAcceptance, TypeAcceptanceFormValue} from "../../types";
import {TableAcceptance} from "./components/TableAcceptance";
import {AddModalAcceptance} from "./components/AddModalAcceptance";
import dayjs from "dayjs";
import {useFetchAllData} from "../../hooks";

const {Title} = Typography;

export const PageAcceptance: React.FC = () => {

  // Обновить таблицу, Открыть закрыть модальное окно, текст поиска
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Хук для получения данных
  const {allStock, allPurchase} = useFetchAllData();

  // Создать новую приемку товаров
  const handleAddAcceptance = (values: TypeAcceptanceFormValue): void => {
    const stock = allStock.find((item) => item.id === values.stock);
    const purchase = allPurchase.find((item) => item.id === values.purchase);
    const acceptance: TypeAcceptance = {
      amount: values.amount || 0,
      income: true,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      stock: stock,
      productBatch: {id: values.productBatch},
      purchase: purchase,
    }
    setIsModalOpen(false)
    createAcceptance(acceptance)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteAcceptance = (id: number): void => {
    deleteAcceptanceById(id)
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