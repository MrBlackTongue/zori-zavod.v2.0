import React, {useState} from 'react';
import {Typography, Space, Button, Input, Select, FloatButton, Tooltip} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import '../../App.css';
import {createStock, updateStock, deleteStockById} from '../../services';
import {TypeStock, TypeStockFormValue} from '../../types';
import {TableStock} from "./components/TableStock";
import {CreateModalStock} from "./components/CreateModalStock";
import {UpdateDrawerStock} from "./components/UpdateDrawerStock";
import {useFetchAllData} from "../../hooks";

export const PageStock: React.FC = () => {

  const {Title} = Typography;
  const {Option} = Select;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Хук для получения данных
  const {allProductGroup} = useFetchAllData({depsProductGroup: true});

  // id выбранной группы товаров, id выбранной ячейка на складе
  const [selectedProductGroupId, setSelectedProductGroupId] = useState<number>();
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
  const handleCreateStock = (values: TypeStockFormValue): void => {
    const stock: TypeStock = {
      amount: values.amount,
      product: {id: values.product},
    };
    setIsModalOpen(false);
    void createStock(stock);
    setIsUpdateTable(prevState => !prevState)
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
    void updateStock(stock);
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteStock = (id: number): void => {
    void deleteStockById(id)
    setIsUpdateTable(prevState => !prevState);
  };

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
                .sort((a, b) => (a.title ?? '') < (b.title ?? '') ? -1 : 1)
                .map(productGroup => (
                  <Option key={productGroup.id} value={productGroup.id} label={productGroup.title}>
                    <Tooltip placement="right" title={productGroup.title}>
                      {productGroup.title}
                    </Tooltip>
                  </Option>
                )) : null}
          </Select>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
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
        isUpdateTable={isUpdateTable}
        onDelete={handleDeleteStock}
        openDrawer={openDrawer}
        searchText={searchText}
        filter={{id: selectedProductGroupId}}
      />
      <CreateModalStock
        isOpen={isModalOpen}
        createItem={handleCreateStock}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerStock
        isOpen={isDrawerOpen}
        selectedItemId={selectedStockId}
        updateItem={handleUpdateStock}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};