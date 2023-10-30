import React, { useMemo, useState } from 'react';
import { DatePicker, Flex, FloatButton, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useFetchAllData } from '../../hooks';
import { TableEmployeeReport } from './components/TableEmployeeReport';

export const PageEmployeeReport: React.FC = () => {
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
    <div>
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Select
          showSearch
          allowClear
          style={{ width: '250px' }}
          placeholder="Выберите сотрудника"
          onChange={onChangeEmployee}
          filterOption={onSearchSelect}>
          {allEmployee && allEmployee.length > 0
            ? allEmployee.map(employee => (
                <Select.Option
                  key={employee.id}
                  value={employee.id}
                  label={`${employee.lastName}, ${employee.firstName}`}>
                  <Tooltip
                    placement="right"
                    title={`${employee.lastName}, ${employee.firstName}`}>
                    {`${employee.lastName} ${employee.firstName}`}
                  </Tooltip>
                </Select.Option>
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
                <Select.Option
                  key={operation.id}
                  value={operation.id}
                  label={operation.title}>
                  <Tooltip placement="right" title={operation.title}>
                    {operation.title}
                  </Tooltip>
                </Select.Option>
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
      </Flex>
      <FloatButton.BackTop />
      <TableEmployeeReport filter={filter} />
    </div>
  );
};
