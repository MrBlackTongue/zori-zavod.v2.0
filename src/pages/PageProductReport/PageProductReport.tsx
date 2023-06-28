import React, {useMemo, useState} from 'react';
import {Typography, Space, Button, FloatButton, DatePicker, Select, Tooltip} from 'antd';
import {SyncOutlined} from "@ant-design/icons";
import {TableProductReport} from "./components/TableProductReport";
import '../../App.css'
import dayjs from "dayjs";
import {useFetchAllData} from "../../hooks";

export const PageProductReport: React.FC = () => {

  const {Title} = Typography;
  const {Option} = Select;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState(false);

  // Выбранные даты
  const [selectedDateFrom, setSelectedDateFrom] = useState<string | undefined>();
  const [selectedDateTo, setSelectedDateTo] = useState<string | undefined>();

  // id выбраного товара
  const [selectedProductId, setSelectedProductId] = useState<number | undefined>();

  // Хук для получения данных
  const {allProduct} = useFetchAllData({depsProduct: true});

  // Создание объекта фильтра с использованием useMemo
  const filter = useMemo(() => ({
    dateFrom: selectedDateFrom,
    dateTo: selectedDateTo,
    productId: selectedProductId,
  }), [selectedDateFrom, selectedDateTo, selectedProductId]);

  // Поиск по селекту
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  // Изменить выбранный товар
  const onChangeProduct = (value: any): void => {
    setSelectedProductId(value ? value : undefined);
  };

  // Изменить выбранную дату
  const onChangeDateFrom = (value: any): void => {
    setSelectedDateFrom(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
  }
  const onChangeDateTo = (value: any): void => {
    setSelectedDateTo(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
  }

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Отчет по товарам</Title>
        <Space>
          <Select
            showSearch
            allowClear
            style={{width: '250px'}}
            placeholder="Выберите товар"
            onChange={onChangeProduct}
            filterOption={onSearchSelect}
          >
            {allProduct && allProduct.length > 0 ?
              allProduct.map(product => (
                <Option key={product.id} value={product.id} label={product.title}>
                  <Tooltip placement="right" title={product.title}>
                    {product.title}
                  </Tooltip>
                </Option>
              )) : null}
          </Select>
          <DatePicker
            placeholder='Дата от'
            style={{width: '150px'}}
            format='DD.MM.YYYY'
            onChange={onChangeDateFrom}
          />
          <DatePicker
            placeholder='Дата до'
            style={{width: '150px'}}
            format='DD.MM.YYYY'
            onChange={onChangeDateTo}
          />
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
      <TableProductReport
        isUpdateTable={isUpdateTable}
        filter={filter}
      />
    </div>
  );
};