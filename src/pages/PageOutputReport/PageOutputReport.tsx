import React, {useMemo, useState} from 'react';
import {Typography, Space, Button, Select, Checkbox, Tooltip} from 'antd';
import {SyncOutlined} from "@ant-design/icons";
import {TableOutputReport} from "./components/TableOutputReport";
import '../../App.css'
import {useFetchAllData} from "../../hooks";
import {TypeOutputReportFilter} from "../../types";

export const PageOutputReport: React.FC = () => {

  const {Title} = Typography;
  const {Option} = Select;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState(false);

  // id выбранного output
  const [selectedOutputId, setSelectedOutputId] = useState<number | undefined>();

  // Флаг группировки
  const [withGrouping, setWithGrouping] = useState(false);

  // Хук для получения данных
  const {allOutput} = useFetchAllData({depsOutput: true});

  // Создание объекта фильтра с использованием useMemo
  const filter: TypeOutputReportFilter = useMemo(() => ({
    outputId: selectedOutputId,
    withGrouping: withGrouping,
  }), [selectedOutputId, withGrouping]);

  // Поиск по селекту
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
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
          <Checkbox checked={withGrouping} onChange={(e) => setWithGrouping(e.target.checked)}>Группировать</Checkbox>
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
                <Option key={output.id} value={output.id} label={output.product?.title}>
                  <Tooltip placement="right" title={output.product?.title}>
                    {output.product?.title}
                  </Tooltip>
                </Option>
              )) : null}
          </Select>

          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(!isUpdateTable)}
            className='greenButton'
          >
            Обновить
          </Button>
        </Space>
      </div>
      <TableOutputReport
        filter={filter}
        isUpdateTable={isUpdateTable}/>
    </div>
  )
};