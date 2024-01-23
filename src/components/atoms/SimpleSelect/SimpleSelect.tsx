import React, { useCallback, useEffect } from 'react';
import { FormInstance, Select, Tooltip } from 'antd';
import { useDataListLoader } from '../../../hooks';

interface SimpleSelectProps<T> {
  form?: FormInstance;
  fieldName?: string;
  value?: number | { id: number };
  onValueChange?: (value: number | undefined) => void;
  fetchDataList: () => Promise<T[]>;
  placeholder: string;
  getId: (item: T) => number;
  getLabel: (item: T) => string;
  style?: React.CSSProperties;
}

export const SimpleSelect = <T,>({
  form,
  fieldName,
  value,
  onValueChange,
  fetchDataList,
  placeholder,
  getId,
  getLabel,
  style,
}: SimpleSelectProps<T>) => {
  // Хук для получения всех данных и загрузки
  const { isLoading, dataList, getDataList } = useDataListLoader<T[]>();

  // Преобразование данных для использования в select
  const selectOptions = dataList?.map(item => ({
    key: getId(item),
    value: getId(item),
    label: getLabel(item),
  }));

  // Преобразование текущего значения формы в формат, подходящий для select
  let selectValue: { value: number; label: string } | undefined;

  // Извлекаем id
  const id = typeof value === 'object' && value !== null ? value.id : value;

  // Находим элемент в dataList по id
  const foundItem =
    id !== undefined ? dataList?.find(el => getId(el) === id) : undefined;

  // Если элемент найден, формируем объект selectValue
  if (foundItem) {
    selectValue = { value: getId(foundItem), label: getLabel(foundItem) };
  } else {
    selectValue = undefined;
  }

  // Поиск в select
  const onSearch = (searchText: string, option: any) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  };

  // Очистить поле select
  const onClear = () => {
    if (form && fieldName) {
      form.setFieldsValue({ [fieldName]: undefined });
    }
  };

  // Изменить значение в select в форме
  const updateFormValue = (value: { id: number } | undefined) => {
    if (form && fieldName) {
      form.setFieldsValue({ [fieldName]: value });
    }
  };

  // Изменить значение в select
  const onChange = (value: { value: number } | undefined) => {
    if (value) {
      updateFormValue({ id: value.value });
      onValueChange?.(value.value);
    } else {
      updateFormValue(undefined);
      onValueChange?.(undefined);
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
    [getDataList, fetchDataList],
  );

  // Эффект для предварительной загрузки данных, если value определено
  useEffect(() => {
    if (value) {
      getDataList(fetchDataList).catch((error: unknown) => {
        if (error instanceof Error) {
          console.error('Ошибка при получении данных: ', error.message);
        }
      });
    }
  }, [value, getDataList, fetchDataList]);

  return (
    <Select
      showSearch
      allowClear
      labelInValue
      style={style}
      placeholder={placeholder}
      value={selectValue}
      loading={isLoading}
      onChange={onChange}
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
