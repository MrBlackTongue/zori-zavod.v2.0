import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Select, FloatButton} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import '../../App.css'
import {TableProductMovementHistory} from "./components/TableProductMovementHistory";
import {TypeStock} from "../../types";
import {getAllStock} from "../../services";

const {Title} = Typography;
const {Option} = Select;

export const PageProductMovementHistory: React.FC = () => {

  // Обновление таблицы
  const [isTableUpdate, setIsTableUpdate] = useState(false);

  // Все остатки на складе, id выбранного остатка на складе
  const [allStock, setAllStock] = useState<TypeStock[]>();
  const [selectedStockId, setSelectedStockId] = useState<number>();

  // Изменить выбраный остаток на складе
  const onChangeStock = (value: any): void => {
    setSelectedStockId(value ? value : undefined)
  };

  // Поиск по селекту
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  useEffect(() => {
    getAllStock().then((allStock) => {
      setAllStock(allStock);
    });
  }, []);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>История движения товаров</Title>
        <Space>
          <Select
            showSearch
            allowClear
            placeholder="Ячейка на складе"
            style={{'width': '350px'}}
            onChange={onChangeStock}
            filterOption={onSearchSelect}
          >
            {allStock && allStock.length > 0 ?
              allStock.map(stock => (
                <Option key={stock.id} value={stock.id} label={`${stock.id}, ${stock.product?.title}`}>
                  {`ID: ${stock.id}, ${stock.product?.title}`}
                </Option>
              )) : null}
          </Select>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsTableUpdate(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableProductMovementHistory
        isUpdateTable={isTableUpdate}
        filter={{id: selectedStockId}}
      />
    </div>
  );
}