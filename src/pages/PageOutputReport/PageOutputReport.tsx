import React, {useMemo, useState} from 'react';
import {Typography, Space, Button, DatePicker, Select, Tooltip} from 'antd';
import {SyncOutlined} from "@ant-design/icons";
import {TableOutputReport} from "./components/TableOutputReport";
import '../../App.css'
import dayjs from "dayjs";
import {useFetchAllData} from "../../hooks";
import {TypeOutputReportFilter} from "../../types";

export const PageOutputReport: React.FC = () => {

  const {Title} = Typography;
  const {Option} = Select;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState(false);

  //Выбранные даты
  const [selectedDateFrom, setSelectedDateFrom] = useState<string | undefined>();
  const [selectedDateTo, setSelectedDateTo] = useState<string | undefined>();

  // id выбранного output
  const [selectedOutputId, setSelectedOutputId] = useState<number | undefined>();

  // Хук для получения данных
  const {allOutput} = useFetchAllData({depsOutput: true});

  // Создание объекта фильтра с использованием useMemo
  const filter: TypeOutputReportFilter = useMemo(() => ({
    dateFrom: selectedDateFrom,
    dateTo: selectedDateTo,
    outputId: selectedOutputId,
  }), [selectedDateFrom, selectedDateTo, selectedOutputId]);

  // Поиск по селекту
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  // Изменить выбранную дату
  const onChangeDateFrom = (value: any): void => {
    setSelectedDateFrom(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
  }
  const onChangeDateTo = (value: any): void => {
    setSelectedDateTo(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
  }

  // Изменить выбранный output
  const onChangeOutput = (value: any): void => {
    setSelectedOutputId(value ? value : undefined);
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Отчет по выпускам</Title>
        <Space>
          <Select
            showSearch
            allowClear
            style={{width: '210px'}}
            placeholder="Поиск по выпускам"
            onChange={onChangeOutput}
            filterOption={onSearchSelect}
          >
            {allOutput && allOutput.length > 0 ?
              allOutput.map(output => (
                <Option key={output.id} value={output.id} label={output?.product?.title}>
                  <Tooltip placement="right" title={output?.product?.title}>
                    {output?.product?.title}
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
            onClick={() => setIsUpdateTable(!isUpdateTable)}
          >
            Обновить
          </Button>
        </Space>
      </div>
      <TableOutputReport filter={filter} isUpdateTable={isUpdateTable}/>
    </div>
  )
};