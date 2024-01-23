import React, { useMemo, useState } from 'react';
import { DatePicker, Flex, FloatButton } from 'antd';
import dayjs from 'dayjs';
import { TableEmployeeReport } from './components/TableEmployeeReport';
import { getAllEmployee, getAllOperation } from '../../../api';
import { SimpleSelect } from '../../atoms/SimpleSelect/SimpleSelect';

export const PageEmployeeReport = () => {
  // Выбранные даты
  const [selectedDateFrom, setSelectedDateFrom] = useState<
    string | undefined
  >();
  const [selectedDateTo, setSelectedDateTo] = useState<string | undefined>();

  // id выбранного товара
  const [selectedOperationId, setSelectedOperationId] = useState<number>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

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
        <SimpleSelect
          placeholder="Выберите сотрудника"
          style={{ width: '250px' }}
          getId={item => item.id ?? 0}
          getLabel={item => `${item.lastName} ${item.firstName}` ?? ''}
          fetchDataList={getAllEmployee}
          onValueChange={newValue => {
            setSelectedEmployeeId(newValue);
          }}
        />
        <SimpleSelect
          placeholder="Выберите операцию"
          style={{ width: '300px' }}
          getId={item => item.id ?? 0}
          getLabel={item => item.title ?? ''}
          fetchDataList={getAllOperation}
          onValueChange={newValue => {
            setSelectedOperationId(newValue);
          }}
        />
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
