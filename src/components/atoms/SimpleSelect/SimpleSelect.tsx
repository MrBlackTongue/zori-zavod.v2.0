import React, { useCallback } from 'react';
import { FormInstance, Select, Tooltip } from 'antd';
import { useDataListLoader } from '../../../hooks';

interface SimpleSelectProps<T> {
  form?: FormInstance;
  fieldName: string;
  value?:
    | number
    | {
        id: number;
      };
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

  // Преобразование данных для использования в select
  const selectOptions = dataList?.map(item => ({
    key: item.id,
    value: item.id,
    label: renderLabel(item),
  }));

  // Преобразование текущего значения формы в формат, подходящий для select
  const selectValue = (() => {
    // Извлекаем id
    const id = typeof value === 'object' && value !== null ? value.id : value;

    // Если id определен, ищем соответствующий элемент и возвращаем объект для select
    if (id !== undefined) {
      const foundItem = dataList?.find(el => el.id === id);
      return foundItem
        ? { value: id, label: foundItem.title ?? '' }
        : undefined;
    }

    return undefined;
  })();

  // Изменить значение в select
  const onChange = (value: { id: number } | undefined) => {
    if (form && fieldName) {
      form.setFieldsValue({ [fieldName]: value });
    }
  };

  // Очистить поле select
  const onClear = () => {
    if (form && fieldName) {
      form.setFieldsValue({ [fieldName]: undefined });
    }
  };

  // Поиск в select
  const onSearch = (searchText: string, option: any) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  };

  // Изменить значение в select
  const handleChange = (value: { value: number; label: string }) => {
    if (value) {
      onChange({ id: value.value });
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
