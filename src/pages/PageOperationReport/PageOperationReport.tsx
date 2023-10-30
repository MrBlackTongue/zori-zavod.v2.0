import React, { useMemo, useState } from 'react';
import { DatePicker, Flex, FloatButton } from 'antd';
import { TableOperationReport } from './components/TableOperationReport';
import dayjs from 'dayjs';

export const PageOperationReport: React.FC = () => {
  // Выбранные даты
  const [selectedDateFrom, setSelectedDateFrom] = useState<
    string | undefined
  >();
  const [selectedDateTo, setSelectedDateTo] = useState<string | undefined>();

  // Создание объекта фильтра с использованием useMemo
  const filter = useMemo(
    () => ({
      dateFrom: selectedDateFrom,
      dateTo: selectedDateTo,
    }),
    [selectedDateFrom, selectedDateTo],
  );

  // Изменить выбранные даты
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
      <TableOperationReport filter={filter} />
    </div>
  );
};
