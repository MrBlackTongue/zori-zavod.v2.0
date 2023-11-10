import React, { useMemo, useState } from 'react';
import { DatePicker, Flex, FloatButton, Select, Tooltip } from 'antd';
import { TableProductReport } from './components/TableProductReport';
import dayjs from 'dayjs';
import { useFetchAllData } from '../../../hooks';

export const PageProductReport: React.FC = () => {
  // Выбранные даты
  const [selectedDateFrom, setSelectedDateFrom] = useState<
    string | undefined
  >();
  const [selectedDateTo, setSelectedDateTo] = useState<string | undefined>();

  // id выбранного товара
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >();

  // Хук для получения данных
  const { allProductOutput } = useFetchAllData({ depsProductOutput: true });

  // Создание объекта фильтра с использованием useMemo
  const filter = useMemo(
    () => ({
      dateFrom: selectedDateFrom,
      dateTo: selectedDateTo,
      productId: selectedProductId,
    }),
    [selectedDateFrom, selectedDateTo, selectedProductId],
  );

  // Поиск по select
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  };

  // Изменить выбранный товар
  const onChangeProduct = (value: any): void => {
    setSelectedProductId(value || undefined);
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
          placeholder="Выберите товар"
          onChange={onChangeProduct}
          filterOption={onSearchSelect}>
          {allProductOutput && allProductOutput.length > 0
            ? allProductOutput.map(productOutput => (
                <Select.Option
                  key={productOutput.id}
                  value={productOutput.id}
                  label={productOutput.title}>
                  <Tooltip placement="right" title={productOutput.title}>
                    {productOutput.title}
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
      <TableProductReport filter={filter} />
    </div>
  );
};
