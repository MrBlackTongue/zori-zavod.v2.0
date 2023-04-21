import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Input, Select} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css';
import {getStockByGroupId, postNewStock, putChangeStock} from '../../services';
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

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Все группы стоков, выбранная группа стоков по id
  const [allStockByGroupId, setStockByGroupId] = useState<TypeStock[]>();
  const [selectedStockByGroupId, setSelectedStockByGroupId] = useState<number>();

  // Выбрана ячейка на складе по id
  const [selectedStockId, setSelectedStockId] = useState<number>();

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новую ячейку на складе
  const addStock = (values: { [key: string]: any }): TypeStock => {
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

  // Изменить выбранную операцию
  const onChangeStockGroup = (values: string, option: any): void => {
    if (!values) {
      setSelectedGroupId(null);
    } else {
      setSelectedGroupId(option.id);
    }
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
    if (selectedGroupId !== null) {
      getStockByGroupId(selectedGroupId).then((allStockByGroupId) => {
        setStockByGroupId(allStockByGroupId);
      });
    }
  }, [selectedGroupId]);

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
         <Select
           showSearch
           allowClear
           placeholder='Операция'
           onChange={onChangeStockGroup}
           style={{'width': '300px'}}
         >
           {/*{allStockByGroupId && allStockByGroupId.length > 0 ?
             allStockByGroupId.map(stock => (
               <Option
                 key={stock?.product?.productGroup?.id}
                 value={{id: stock?.product?.productGroup?.id, title: stock?.product?.productGroup?.title}}
               >
                 {stock?.product?.productGroup?.title}
               </Option>
             )) : null}*/}
         </Select>
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
          idFilter: selectedStockByGroupId,
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