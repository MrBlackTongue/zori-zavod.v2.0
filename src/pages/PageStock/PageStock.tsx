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
  const [isTableUpdate, setIsTableUpdate] = useState(false);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Все группы товаров, id выбранной группы товаров
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>();
  const [selectedGroupId, setSelectedGroupId] = useState<number>();

  // id выбранной ячейка на складе
  const [selectedStockId, setSelectedStockId] = useState<number>();

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Добавить новую ячейку на складе
  const handleAddStock = (values: { [key: string]: any }): void => {
    const stock: TypeStock = {
      amount: values.amount,
      product: {
        id: values.product.id,
      },
    };
    setIsModalOpen(false);
    postNewStock(stock);
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (stockId: number) => {
    setSelectedStockId(stockId);
    setIsDrawerOpen(true);
  };

  // Изменить выбранную группу товаров
  const onChangeProductGroup = (values: string, option: any): void => {
    if (values === undefined) {
      setSelectedGroupId(undefined);
      return undefined;
    }
    setSelectedGroupId(option.id)
  };

  // Обновить товар на складе
  const handleUpdateStock = (values: { [key: string]: any }): void => {
    const stock: TypeStock = {
      id: selectedStockId,
      amount: values.amount,
      product: {
        id: values.product.id,
      },
    };
    setIsDrawerOpen(false);
    putChangeStock(stock);
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDelete = (id: number): void => {
    deleteStockById(id).catch((error) => console.error(error));
    setIsTableUpdate(prevState => !prevState);
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
            onClick={() => setIsTableUpdate(prevState => !prevState)}
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
        isUpdateTable={isTableUpdate}
        onDelete={handleDelete}
        openDrawer={openDrawer}
        searchText={searchText}
        filter2={{
          idFilter: selectedGroupId,
        }}
      />
      <AddModalStock
        isOpen={isModalOpen}
        addItem={handleAddStock}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerStock
        isOpen={isDrawerOpen}
        selectedItemId={selectedStockId}
        updateItem={handleUpdateStock}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};