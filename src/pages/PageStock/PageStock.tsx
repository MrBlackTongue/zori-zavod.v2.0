import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Input, Select, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css';
import {getAllProductGroup, postNewStock, putChangeStock, deleteStockById} from '../../services';
import {TypeProductGroup, TypeStock} from '../../types';
import {TableStock} from "./components/TableStock";
import {AddModalStock} from "./components/AddModalStock";
import {EditDrawerStock} from "./components/EditDrawerStock";

const {Title} = Typography;
const {Option} = Select;

export const PageStock: React.FC = () => {

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Все группы продуктов, выбранная группа продуктов по id
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>();
  const [selectedGroupId, setSelectedGroupId] = useState<number>();

  // Выбрана ячейка на складе по id
  const [selectedStockId, setSelectedStockId] = useState<number>();

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новую ячейку на складе
  const addStock = (values: { [key: string]: any }): TypeStock => {
    const stock: TypeStock = {
      amount: values.amount,
      product: {
        id: values.product.id,
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

  // Изменить выбранную группу товаров
  const onChangeProductGroup = (values: string, option: any): number | undefined => {
    if (values === undefined) {
      setSelectedGroupId(undefined);
      return undefined;
    }
    setSelectedGroupId(option.id);
    return option.id
  };

  // Обновить товар на складе
  const updateStock = (values: { [key: string]: any }): TypeStock => {
    const stock: TypeStock = {
      id: selectedStockId,
      amount: values.amount,
      product: {
        id: values.product.id,
      },
    };
    setIsDrawerOpen(false);
    putChangeStock(stock);
    setUpdateTable(!updateTable);
    return stock;
  };

  // Удалить запись из таблицы
  const handleDelete = (id: number) => {
    deleteStockById(id).catch((error) => console.error(error));
    setUpdateTable(!updateTable);
  };

  useEffect(() => {
    getAllProductGroup().then((allStockGroup) => {
      setAllProductGroup(allStockGroup);
    });
  }, []);

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
            placeholder='Товарная группа'
            onChange={onChangeProductGroup}
            style={{'width': '300px'}}
          >
            {allProductGroup && allProductGroup.length > 0 ?
              allProductGroup
                .sort((a, b) => (a.title ?? '') < (b.title ?? '') ? -1 : 1)
                .map(productGroup => (
                  <Option id={productGroup.id} key={productGroup.id} value={productGroup.title}>
                    {productGroup.title}
                  </Option>
                )) : null}
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
      <FloatButton.BackTop/>
      <TableStock
        isUpdateTable={updateTable}
        onDelete={handleDelete}
        openDrawer={openDrawer}
        searchText={searchText}
        filter2={{
          idFilter: selectedGroupId,
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