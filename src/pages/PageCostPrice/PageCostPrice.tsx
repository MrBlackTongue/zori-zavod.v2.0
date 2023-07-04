import React, {useState, useMemo} from 'react';
import {Typography, Space, Button, FloatButton, Tooltip, Select} from 'antd';
import {SyncOutlined} from "@ant-design/icons";
import '../../App.css'
import {TableCostPrice} from "./components/TableCostPrice";
import {useFetchAllData} from "../../hooks";
import dayjs from "dayjs";
import {TypeCostPriceFilter} from "../../types";

export const PageCostPrice: React.FC = () => {

  const {Title} = Typography;
  const {Option} = Select;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

  // id выбранного выпуска продукции
  const [selectedOutputId, setSelectedOutputId] = useState<number | undefined>();

  // Хук для получения данных
  const {allOutput} = useFetchAllData({depsOutput: true});

  // Создание объекта фильтра с использованием useMemo
  const filter: TypeCostPriceFilter = useMemo(() => ({
    outputId: selectedOutputId,
  }), [selectedOutputId]);

  // Изменить выбранный выпуск продукции
  const onChangeOutput = (value: any): void => {
    setSelectedOutputId(value ? value : undefined);
  };

  // Поиск по селекту
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Отчет по себестоимости</Title>
        <Space>
          <Select
            showSearch
            allowClear
            style={{width: '330px'}}
            placeholder="Выберите выпуск продукции"
            onChange={onChangeOutput}
            filterOption={onSearchSelect}
          >
            {allOutput && allOutput.length > 0 ?
              allOutput.map(output => (
                <Option
                  key={output.id}
                  value={output.id}
                  label={`${output.product?.title}, ${output.date}, ${output.id}`}
                >
                  <Tooltip
                    placement="right"
                    title={
                      `${dayjs(output.date).format('DD.MM')}, ${output.product?.title}, ID: ${output.id}`
                    }
                  >
                    {`${dayjs(output.date).format('DD.MM')}, ${output.product?.title}, ID: ${output.id}`}
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
      <TableCostPrice
        isUpdateTable={isUpdateTable}
        filter={filter}
      />
    </div>
  );
}