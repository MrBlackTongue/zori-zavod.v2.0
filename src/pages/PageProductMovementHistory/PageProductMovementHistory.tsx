import React, {useState} from 'react';
import {Typography, Space, Button, Select, FloatButton, Tooltip} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import '../../App.css'
import {TableProductMovementHistory} from "./components/TableProductMovementHistory";
import {useFetchAllData} from "../../hooks";

export const PageProductMovementHistory: React.FC = () => {

  const {Title} = Typography;
  const {Option} = Select;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

  // Хук для получения данных
  const {allStock} = useFetchAllData({depsStock: true});

  // id выбранного остатка на складе
  const [selectedStockId, setSelectedStockId] = useState<number>();

  // Изменить выбраный остаток на складе
  const onChangeStock = (value: any): void => {
    setSelectedStockId(value || undefined)
  };

  // Поиск по селекту
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

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
                  <Tooltip placement="right" title={`ID: ${stock.id}, ${stock.product?.title}`}>
                    {`ID: ${stock.id}, ${stock.product?.title}`}
                  </Tooltip>
                </Option>
              )) : null}
          </Select>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableProductMovementHistory
        isUpdateTable={isUpdateTable}
        filter={{id: selectedStockId}}
      />
    </div>
  );
}