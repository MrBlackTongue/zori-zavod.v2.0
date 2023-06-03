import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Input, Select, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css';
import {getAllProductGroup, createNewStock, editStock, deleteStockById} from '../../services';
import {TypeProductGroup, TypeStock, TypeStockFormValue} from '../../types';
import {TableStock} from "./components/TableStock";
import {AddModalStock} from "./components/AddModalStock";
import {EditDrawerStock} from "./components/EditDrawerStock";

const {Title} = Typography;
const {Option} = Select;

export const PageStock: React.FC = () => {

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Все группы товаров, id выбранной группы товаров
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>();
  const [selectedProductGroupId, setSelectedProductGroupId] = useState<number>();

  // id выбранной ячейка на складе
  const [selectedStockId, setSelectedStockId] = useState<number>();

  // Текст поиска
  const [searchText, setSearchText] = useState("");

  // Изменить выбранную группу товаров
  const onChangeProductGroup = (value: any): void => {
    setSelectedProductGroupId(value ? value : undefined);
  };

  // Поиск по селекту
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  // Добавить новую ячейку на складе
  const handleAddStock = (values: TypeStockFormValue): void => {
    const stock: TypeStock = {
      amount: values.amount,
      product: {id: values.product},
    };
    setIsModalOpen(false);
    createNewStock(stock);
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (stockId: number): void => {
    setSelectedStockId(stockId);
    setIsDrawerOpen(true);
  };

  // Обновить товар на складе
  const handleUpdateStock = (values: TypeStockFormValue): void => {
    const stock: TypeStock = {
      id: selectedStockId,
      amount: values.amount,
      product: {id: values.product},
    };
    setIsDrawerOpen(false);
    editStock(stock);
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDelete = (id: number): void => {
    deleteStockById(id)
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
            placeholder='Выберите товарную группу'
            style={{'width': '250px'}}
            onChange={onChangeProductGroup}
            filterOption={onSearchSelect}
          >
            {allProductGroup && allProductGroup.length > 0 ?
              allProductGroup
                .sort((a, b) => (a.title ?? '') < (b.title ?? '') ? -1 : 1) //todo: сделать сортировку на бэкенде
                .map(productGroup => (
                  <Option key={productGroup.id} value={productGroup.id} label={productGroup.title}>
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
        filter={{id: selectedProductGroupId}}
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
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};