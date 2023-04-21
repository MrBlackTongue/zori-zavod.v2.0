import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Input} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css';
import {postNewStock, putChangeStock} from '../../services';
import {TypeStock} from '../../types';
import {TableStock} from "./components/TableStock";
import {AddModalStock} from "./components/AddModalStock";
import {EditDrawerStock} from "./components/EditDrawerStock";

const {Title} = Typography;

export const PageStock: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Склад
  const [stock] = useState<TypeStock | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбрана ячейка на складе по id
  const [selectedStockId, setSelectedStockId] = useState<number>();

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новую ячейку на складе
  const addStock =  (values: { [key: string]: any }): TypeStock => {
    const stock: TypeStock = {
      amount: values.amount,
      product: {
        id: values.product,
      },
    };
    setIsModalOpen(false);
    postNewStock(stock);
    setUpdateTable(!updateTable);
    return stock;
  };

  // Открыть дравер
  const openDrawer = (stockId: number) => {
    setSelectedStockId(stockId);
    setIsDrawerOpen(true);
  };

  // Обновить товар на складе
  const updateStock = (values: { [key: string]: any }): TypeStock => {
    const stock: TypeStock = {
      id: selectedStockId,
      amount: values.amount,
      product: {
        id: values.product,
      },
    };
    setIsDrawerOpen(false);
    putChangeStock(stock);
    setUpdateTable(!updateTable);
    return stock;
  };

  useEffect(() => {
    if (stock) {
      form.setFieldsValue(stock);
    }
  }, [stock, form]);

  return (
    <div style={{display: 'grid'}}>
      <div className="centerTitle">
        <Title level={3}>Склад</Title>
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
            className="greenButton"
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
      <TableStock
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        searchText={searchText}
        filter={{
          //idFilter: selectedOperationById,
        }}
      />
      <AddModalStock
        isOpen={isModalOpen}
        addItem={addStock}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerStock
        isOpen={isDrawerOpen}
        selectedItemId={selectedStockId}
        updateItem={updateStock}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};