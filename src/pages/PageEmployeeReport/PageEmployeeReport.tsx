import React, { useMemo, useState } from 'react';
import {
  DatePicker,
  FloatButton,
  Select,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import '../../App.css';
import dayjs from 'dayjs';
import { useFetchAllData } from '../../hooks';
import { TableEmployeeReport } from './components/TableEmployeeReport';

export const PageEmployeeReport: React.FC = () => {
  const { Title } = Typography;
  const { Option } = Select;

  // Выбранные даты
  const [selectedDateFrom, setSelectedDateFrom] = useState<
    string | undefined
  >();
  const [selectedDateTo, setSelectedDateTo] = useState<string | undefined>();

  // id выбранного товара
  const [selectedOperationId, setSelectedOperationId] = useState<number>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

  // Хук для получения данных
  const { allOperation, allEmployee } = useFetchAllData({
    depsOperation: true,
    depsEmployee: true,
  });

  // Создание объекта фильтра с использованием useMemo
  const filter = useMemo(
    () => ({
      dateFrom: selectedDateFrom,
      dateTo: selectedDateTo,
      operationId: selectedOperationId,
      employeeId: selectedEmployeeId,
    }),
    [selectedDateFrom, selectedDateTo, selectedOperationId, selectedEmployeeId],
  );

  // Поиск по select
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  };

  // Изменить выбранную операцию
  const onChangeOperation = (value: any): void => {
    setSelectedOperationId(value || undefined);
  };

  // Изменить выбранного сотрудника
  const onChangeEmployee = (value: any): void => {
    setSelectedEmployeeId(value || undefined);
  };

  // Изменить выбранную дату
  const onChangeDateFrom = (value: any): void => {
    setSelectedDateFrom(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
  };
  const onChangeDateTo = (value: any): void => {
    setSelectedDateTo(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Отчет по сотрудникам</Title>
        <Space>
          <Select
            showSearch
            allowClear
            style={{ width: '250px' }}
            placeholder="Выберите сотрудника"
            onChange={onChangeEmployee}
            filterOption={onSearchSelect}>
            {allEmployee && allEmployee.length > 0
              ? allEmployee.map(employee => (
                  <Option
                    key={employee.id}
                    value={employee.id}
                    label={`${employee.lastName}, ${employee.firstName}`}>
                    <Tooltip
                      placement="right"
                      title={`${employee.lastName}, ${employee.firstName}`}>
                      {`${employee.lastName} ${employee.firstName}`}
                    </Tooltip>
                  </Option>
                ))
              : null}
          </Select>
          <Select
            showSearch
            allowClear
            placeholder="Выберите операцию"
            style={{ width: '300px' }}
            onChange={onChangeOperation}
            filterOption={onSearchSelect}>
            {allOperation && allOperation.length > 0
              ? allOperation.map(operation => (
                  <Option
                    key={operation.id}
                    value={operation.id}
                    label={operation.title}>
                    <Tooltip placement="right" title={operation.title}>
                      {operation.title}
                    </Tooltip>
                  </Option>
                ))
              : null}
          </Select>
          <DatePicker
            placeholder="Дата от"
            style={{ width: '150px' }}
            format="DD.MM.YYYY"
            onChange={onChangeDateFrom}
          />
          <DatePicker
            placeholder="Дата до"
            style={{ width: '150px' }}
            format="DD.MM.YYYY"
            onChange={onChangeDateTo}
          />
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableEmployeeReport filter={filter} />
    </div>
  );
};
