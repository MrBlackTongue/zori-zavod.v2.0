import React, {useEffect, useState} from 'react';
import {Typography, Space, Button, Select} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import '../../App.css'
import {TableProductMovementHistory} from "./components/TableProductMovementHistory";
import {TypeStock} from "../../types";
import {getAllStock} from "../../services";

const {Title} = Typography;
const {Option} = Select;

export const PageProductMovementHistory: React.FC = () => {

  // Все остатки, выбрать остаток по id
  const [stock, setStock] = useState<TypeStock[]>();
  const [selectedStockById, setSelectedStockById] = useState<number>();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Изменить выбраный остаток
  const onChangeStock = (values: string, option: any): TypeStock => {
    setSelectedStockById(option.id)
    return option.id;
  };

  // Обновить таблицу при очистке выбора
  const onClearStock = (): void => {
    setSelectedStockById(undefined);
    setUpdateTable(!updateTable);
  }

  useEffect(() => {
    getAllStock().then((stock) => {
      setStock(stock);
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
              onClear={onClearStock}
            >
              {stock && stock.length > 0 ?
                stock.map(stock => (
                  <Option id={stock.id} key={stock.id} value={stock?.product?.title}>
                    {`ID: ${stock.id}, ${stock?.product?.title}`}
                  </Option>
                )) : null}
            </Select>
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
        filterById={selectedStockById}
      />
    </div>
  );
}