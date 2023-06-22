import React, {useMemo, useState} from 'react';
import {Typography, Space, Button, FloatButton, DatePicker} from 'antd';
import {SyncOutlined} from "@ant-design/icons";
import '../../App.css'
import {TableOperationReport} from "./components/TableOperationReport";
import dayjs from "dayjs";

export const PageOperationReport: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState(false);

  //Выбранные даты
  const [selectedDateFrom, setSelectedDateFrom] = useState<string | undefined>();
  const [selectedDateTo, setSelectedDateTo] = useState<string | undefined>();

  // Создание объекта фильтра с использованием useMemo
  const filter = useMemo(() => ({
    dateFrom: selectedDateFrom,
    dateTo: selectedDateTo,
  }), [selectedDateFrom, selectedDateTo]);

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
        <Title level={3}>Отчет по операциям</Title>
        <Space>
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
      <TableOperationReport
        isUpdateTable={isUpdateTable}
        filter={filter}
      />
    </div>
  );
}