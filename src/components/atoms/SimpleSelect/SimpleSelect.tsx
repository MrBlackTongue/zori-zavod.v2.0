import React, { useCallback } from 'react';
import { Select, Tooltip } from 'antd';
import { useDataListLoader } from '../../../hooks';

interface SimpleSelectProps<T> {
  onChange: (value: { id: number } | undefined) => void;
  onClear: () => void;
  onSearch: (input: string, option: any) => boolean;
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
  value,
  onChange,
  onClear,
  onSearch,
  fetchDataList,
  placeholder,
  renderLabel,
}: SimpleSelectProps<T>) => {
  // Хук для получения всех данных и загрузки
  const { isLoading, dataList, getDataList } = useDataListLoader<T[]>();

  const selectOptions = dataList?.map(item => ({
    key: item.id,
    value: item.id,
    label: renderLabel(item),
  }));

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
        <Select.Option key={option.key} value={option.value}>
          <Tooltip placement="right" title={option.label}>
            {option.label}
          </Tooltip>
        </Select.Option>
      ))}

      {/*{selectOptions && dataList.length > 0*/}
      {/*  ? dataList.map(elem => (*/}
      {/*      <Select.Option key={elem.id} value={elem.id} label={elem.title}>*/}
      {/*        <Tooltip placement="right" title={elem.title}>*/}
      {/*          {elem.title}*/}
      {/*        </Tooltip>*/}
      {/*      </Select.Option>*/}
      {/*    ))*/}
      {/*  : null}*/}
    </Select>
  );
};
