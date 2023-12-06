import React, { useCallback } from 'react';
import { Select, Tooltip } from 'antd';
import { TypeProduct } from '../../../types';
import { useDataListLoader } from '../../../hooks';
import { getAllProduct } from '../../../api';

interface SimpleSelectProps {
  onChange: (value: { id: number } | undefined) => void;
  onClear: () => void;
  onSearch: (input: string, option: any) => boolean;
  value?: string | { id: string | number };
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({
  onChange,
  onClear,
  onSearch,
  value,
}) => {
  // Хук для получения всех данных и загрузки
  const { isLoading, dataList, getDataList } =
    useDataListLoader<TypeProduct[]>();

  // Преобразование текущего значения формы в формат, подходящий для Select
  const selectValue =
    typeof value === 'object' && value !== null && 'id' in value
      ? {
          value: value.id.toString(),
          label:
            dataList?.find(product => product.id === value.id)?.title ?? '',
        }
      : undefined;

  // Изменить значение в Select
  const handleChange = (value: { value: string; label: string }) => {
    if (value) {
      onChange({ id: parseInt(value.value, 10) });
    } else {
      onChange(undefined);
    }
  };

  // Загрузить данные для Select
  const handleDropdownVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        getDataList(getAllProduct).catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('Ошибка при получении данных: ', error.message);
          }
        });
      }
    },
    [getDataList],
  );
  return (
    <Select
      showSearch
      allowClear
      labelInValue
      placeholder="Выберите товар"
      value={selectValue}
      loading={isLoading}
      onChange={handleChange}
      onClear={onClear}
      filterOption={onSearch}
      onDropdownVisibleChange={handleDropdownVisibleChange}>
      {dataList && dataList.length > 0
        ? dataList.map(elem => (
            <Select.Option key={elem.id} value={elem.id} label={elem.title}>
              <Tooltip placement="right" title={elem.title}>
                {elem.title}
              </Tooltip>
            </Select.Option>
          ))
        : null}
    </Select>
  );
};
