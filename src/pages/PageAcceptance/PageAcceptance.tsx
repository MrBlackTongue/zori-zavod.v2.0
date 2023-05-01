import React, {useState} from 'react';
import {Typography, Space, Button, Input, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css'
import {postNewAcceptance} from "../../services";
import {TypeAcceptance} from "../../types";
import {TableAcceptance} from "./components/TableAcceptance";
import {AddModalAcceptance} from "./components/AddModalAcceptance";

const {Title} = Typography;

export const PageAcceptance: React.FC = () => {

  // Обновить таблицу, открыть закрыть модальное окно, текст поиска
  const [updateTable, setUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Добавить новую приемку товаров
  const addAcceptance = (values: { [key: string]: any }): TypeAcceptance => {
    const acceptance: TypeAcceptance = {
      amount: values.amount || 0,
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
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableAcceptance
        searchText={searchText}
        isUpdateTable={updateTable}
        openDrawer={() => {}}
      />
      <AddModalAcceptance
        isOpen={isModalOpen}
        addItem={addAcceptance}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}