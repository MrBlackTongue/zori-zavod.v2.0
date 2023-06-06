import React, {useState} from 'react';
import {Typography, Space, Button, Input, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css'
import {deleteAcceptanceById, createAcceptance} from "../../services";
import {TypeAcceptance, TypeAcceptanceFormValue} from "../../types";
import {TableAcceptance} from "./components/TableAcceptance";
import {CreateModalAcceptance} from "./components/CreateModalAcceptance";
import dayjs from "dayjs";
import {useFetchAllData} from "../../hooks";

export const PageAcceptance: React.FC = () => {

  const {Title} = Typography;

  // Обновить таблицу, Открыть закрыть модальное окно, текст поиска
  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Хук для получения данных
  const {allStock, allPurchase} = useFetchAllData();

  // Создать новую приемку товаров
  const handleCreateAcceptance = (values: TypeAcceptanceFormValue): void => {
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
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteAcceptance = (id: number): void => {
    deleteAcceptanceById(id)
    setIsUpdateTable(prevState => !prevState)
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
            onClick={() => setIsUpdateTable(prevState => !prevState)}
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
        isUpdateTable={isUpdateTable}
        onDelete={handleDeleteAcceptance}
      />
      <CreateModalAcceptance
        isOpen={isModalOpen}
        createItem={handleCreateAcceptance}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}