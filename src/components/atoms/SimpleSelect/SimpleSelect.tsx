import React, { useCallback } from 'react';
import { FormInstance, Select, Tooltip } from 'antd';
import { useDataListLoader, useTransformedSelect } from '../../../hooks';

interface SimpleSelectProps<T> {
  form?: FormInstance;
  fieldName: string;
  value?: string | { id: string | number };
  fetchDataList: () => Promise<T[]>;
  placeholder: string;
  renderLabel: (item: T) => string;
}

export const SimpleSelect = <
  T extends {
    id: number;
    title: string;
  },
>({
  form,
  fieldName,
  value,
  fetchDataList,
  placeholder,
  renderLabel,
}: SimpleSelectProps<T>) => {
  // Хук для получения всех данных и загрузки
  const { isLoading, dataList, getDataList } = useDataListLoader<T[]>();

  // Хук для управления полем select
  const { onChange, onClear, onSearch } = useTransformedSelect(form, fieldName);

  // Преобразование данных для использования в select
  const selectOptions = dataList?.map(item => ({
    key: item.id,
    value: item.id,
    label: renderLabel(item),
  }));

  // Преобразование текущего значения формы в формат, подходящий для select
  const selectValue =
    typeof value === 'object' && value !== null && 'id' in value
      ? {
          value: value.id.toString(),
          label: dataList?.find(el => el.id === value.id)?.title ?? '',
        }
      : undefined;

  // Изменить значение в select
  const handleChange = (value: { value: string; label: string }) => {
    if (value) {
      onChange({ id: parseInt(value.value, 10) });
    } else {
      onChange(undefined);
    }
  };

  // Загрузить данные для select
  const handleDropdownVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        getDataList(fetchDataList).catch((error: unknown) => {
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
      placeholder={placeholder}
      value={selectValue}
      loading={isLoading}
      onChange={handleChange}
      onClear={onClear}
      filterOption={onSearch}
      onDropdownVisibleChange={handleDropdownVisibleChange}>
      {selectOptions?.map(option => (
        <Select.Option
          key={option.key}
          value={option.value}
          label={option.label}>
          <Tooltip placement="right" title={option.label}>
            {option.label}
          </Tooltip>
        </Select.Option>
      ))}
    </Select>
  );
};
