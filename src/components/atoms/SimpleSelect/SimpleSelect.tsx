import React, { useCallback, useEffect, useState } from 'react';
import { FormInstance, Select, Tooltip } from 'antd';
import { useDataListLoader } from '../../../hooks';
import '../SimpleSelect/SimpleSelect.css';

interface SimpleSelectProps<T> {
  form?: FormInstance;
  fieldName?: string;
  value?: number | { id: number };
  onValueChange?: (value: number | undefined) => void;
  fetchDataList: () => Promise<T[]>;
  placeholder: string;
  getId: (item: T) => number;
  getLabel: (item: T) => string;
  onBlur?: () => void;
  style?: React.CSSProperties;
  onCreateNew?: (value: string) => Promise<T>;
  disabled?: boolean;
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
  onBlur,
  style,
  onCreateNew,
  disabled,
}: SimpleSelectProps<T>) => {
  // Хук для получения всех данных и загрузки
  const { isLoading, dataList, getDataList } = useDataListLoader<T[]>();

  const [searchValue, setSearchValue] = useState('');

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

  const onChange = async (value: { value: number | string } | undefined) => {
    if (value?.value === 'create-new' && onCreateNew) {
      const newItem = await onCreateNew(searchValue);
      updateFormValue({ id: getId(newItem) });
      onValueChange?.(getId(newItem));
      setSearchValue('');
    } else if (value) {
      updateFormValue({ id: value.value as number });
      onValueChange?.(value.value as number);
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
      // allowClear
      labelInValue
      style={style}
      onBlur={onBlur}
      disabled={disabled}
      value={selectValue}
      loading={isLoading}
      placeholder={placeholder}
      onChange={onChange}
      onClear={onClear}
      onSearch={(value: string) => setSearchValue(value)}
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
      {searchValue !== '' &&
        !selectOptions?.some(option => option.label === searchValue) && (
          <Select.Option
            key="create-new"
            value="create-new"
            label={`Создать новый "${searchValue}"`}>
            <div className={'option-create-button'}>
              {`Создать новый "${searchValue}"`}
            </div>
          </Select.Option>
        )}
    </Select>
  );
};
