import React, { useMemo, useState } from 'react';
import { Flex, FloatButton, Select, Tooltip } from 'antd';
import { TableCostPriceReport } from './components/TableCostPriceReport';
import { useFetchAllData } from '../../hooks';
import dayjs from 'dayjs';
import { TypeCostPriceReportFilter } from '../../types';

export const PageCostPriceReport: React.FC = () => {
  // id выбранного выпуска продукции
  const [selectedOutputId, setSelectedOutputId] = useState<
    number | undefined
  >();

  // Хук для получения данных
  const { allOutput } = useFetchAllData({ depsOutput: true });

  // Создание объекта фильтра с использованием useMemo
  const filter: TypeCostPriceReportFilter = useMemo(
    () => ({
      outputId: selectedOutputId,
    }),
    [selectedOutputId],
  );

  // Изменить выбранный выпуск продукции
  const onChangeOutput = (value: any): void => {
    setSelectedOutputId(value || undefined);
  };

  // Поиск по select
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
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
          style={{ width: '330px' }}
          placeholder="Выберите выпуск продукции"
          onChange={onChangeOutput}
          filterOption={onSearchSelect}>
          {allOutput && allOutput.length > 0
            ? allOutput.map(output => (
                <Select.Option
                  key={output.id}
                  value={output.id}
                  label={`${output.product?.title}, ${output.date}, ${output.id}`}>
                  <Tooltip
                    placement="right"
                    title={`${dayjs(output.date).format('DD.MM')}, ${output
                      .product?.title}, ID: ${output.id}`}>
                    {`${dayjs(output.date).format('DD.MM')}, ${output.product
                      ?.title}, ID: ${output.id}`}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Flex>
      <FloatButton.BackTop />
      <TableCostPriceReport filter={filter} />
    </div>
  );
};
