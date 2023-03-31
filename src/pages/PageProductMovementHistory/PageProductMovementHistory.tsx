import React, {useEffect, useState} from 'react';
import {Typography, Space, Button, Input, Select} from 'antd';
import {SearchOutlined, SyncOutlined} from '@ant-design/icons';
import '../../App.css'
import {TableProductMovementHistory} from "./components/TableProductMovementHistory";
import {TypeStock} from "../../types/TypeStock";
import {getAllProducts, PRODUCT} from "../../services";
import {TypeProduct} from "../../types/TypeProduct";
import {getAllStocks, getStockById} from "../../services/apiStock";

const {Title} = Typography;
const {Option} = Select;

export const PageProductMovementHistory: React.FC = () => {

  // Все остатки, выбрать остаток
  const [stocks, setStocks] = useState<TypeStock[]>();
  const [selectedStock, setSelectedStock] = useState<TypeStock>();

  // Товары в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);
  const searchTable = (value: string) => {
    //setSearchText(value);
  }

  // Изменить выбраный остаток
    const onChangeStock = (values: string, option: any): TypeStock => {
      setSelectedStock(option.id)
      return option.id;
    };

  useEffect(() => {
    getAllStocks().then((stocks) => {
      setStocks(stocks);
    });
  }, []);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>История движения товаров</Title>
        <Space>
          <div>
            <Select
              style={{'width': '360px'}}
              value={selectedStock ? selectedStock?.product?.title : undefined}
              onChange={onChangeStock}
            >
              {stocks && stocks.length > 0 ?
                stocks.map(stock => (
                  <Option id={stock.id} key={stock.id} value={stock?.product?.title}>
                    {`ID: ${stock.id}, товар: ${stock?.product?.title}`}
                  </Option>
                )) : null}
            </Select>
          </div>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
          </Button>
        </Space>
      </div>
      <TableProductMovementHistory
        openDrawer={() => {}}
        isUpdateTable={updateTable}
        filterById={selectedStock?.id}
      />
    </div>
  );
}