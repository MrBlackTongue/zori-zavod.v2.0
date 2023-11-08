import React, { useMemo, useState } from 'react';
import { Checkbox, Flex, Select, Tooltip } from 'antd';
import { TableOutputReport } from './components/TableOutputReport';
import { useFetchAllData } from '../../hooks';
import { TypeOutputReportFilter } from '../../types';
import dayjs from 'dayjs';

export const PageOutputReport: React.FC = () => {
  // id выбранного output
  const [selectedOutputId, setSelectedOutputId] = useState<
    number | undefined
  >();

  // Флаг группировки
  const [withGrouping, setWithGrouping] = useState<boolean>(false);

  // Хук для получения данных
  const { allOutput } = useFetchAllData({ depsOutput: true });

  // Создание объекта фильтра с использованием useMemo
  const filter: TypeOutputReportFilter = useMemo(
    () => ({
      outputId: selectedOutputId,
      withGrouping: withGrouping,
    }),
    [selectedOutputId, withGrouping],
  );

  // Поиск по select
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  };

  // Изменить выбранный output
  const onChangeOutput = (value: any): void => {
    setSelectedOutputId(value || undefined);
  };

  return (
    <div>
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Checkbox
          checked={withGrouping}
          onChange={e => setWithGrouping(e.target.checked)}>
          Группировать
        </Checkbox>
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
                    title={`
                    ${dayjs(output.date).format('DD.MM')},
                    ${output.product?.title},
                    ID: ${output.id}`}>
                    {`${dayjs(output.date).format('DD.MM')},
                    ${output.product?.title},
                    ID: ${output.id}`}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Flex>
      <TableOutputReport filter={filter} />
    </div>
  );
};
