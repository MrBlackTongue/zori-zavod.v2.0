import React, { useMemo, useState } from 'react';
import { FloatButton, Select, Space, Tooltip, Typography } from 'antd';
import { TableCostPriceReport } from './components/TableCostPriceReport';
import { useFetchAllData } from '../../hooks';
import dayjs from 'dayjs';
import { TypeCostPriceReportFilter } from '../../types';

export const PageCostPriceReport: React.FC = () => {
  const { Title } = Typography;
  const { Option } = Select;

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
    <div style={{ display: 'grid' }}>
      <div className="content-title-bar">
        <Title level={3}>Отчет по себестоимости</Title>
        <Space>
          <Select
            showSearch
            allowClear
            style={{ width: '330px' }}
            placeholder="Выберите выпуск продукции"
            onChange={onChangeOutput}
            filterOption={onSearchSelect}>
            {allOutput && allOutput.length > 0
              ? allOutput.map(output => (
                  <Option
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
                  </Option>
                ))
              : null}
          </Select>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableCostPriceReport filter={filter} />
    </div>
  );
};
