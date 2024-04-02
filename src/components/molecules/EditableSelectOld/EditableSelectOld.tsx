import React, { useCallback, useEffect } from 'react';
import { Select, Tooltip } from 'antd';
import { useDataListLoader } from '../../../hooks';

interface EditableSelectOldProps<T> {
  value?: number;
  isEditable: boolean;
  placeholder: string;
  fetchDataList: () => Promise<T[]>;
  getId: (item: T) => number;
  getLabel: (item: T) => string;
  onValueChange?: (value: number | undefined) => void;
}

export const EditableSelectOld = <T,>({
  value,
  isEditable,
  placeholder,
  fetchDataList,
  getId,
  getLabel,
  onValueChange,
}: EditableSelectOldProps<T>) => {
  // Хук для получения всех данных и загрузки
  const { isLoading, dataList, getDataList } = useDataListLoader<T[]>();

  // Формируем список опций на основе данных
  const options = dataList
    ?.filter(el => getId(el) !== undefined)
    .map(item => ({
      key: getId(item),
      value: getId(item),
      label: getLabel(item),
    }));

  // Поиск в select
  const onSearch = (value: string, option: any) => {
    return option.label.toLowerCase().includes(value.toLowerCase());
  };

  // Изменить значение в select
  const onChange = (value: number | undefined) => {
    if (value) {
      onValueChange?.(value);
    } else {
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

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    getDataList(fetchDataList).catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
  }, [getDataList, fetchDataList]);

  if (isEditable) {
    return (
      <Select
        showSearch
        value={value}
        style={{ width: '100%' }}
        onChange={onChange}
        filterOption={onSearch}
        placeholder={placeholder}
        loading={isLoading}
        onDropdownVisibleChange={handleDropdownVisibleChange}>
        {' '}
        {options?.map(option => (
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
  } else {
    const selectedOption = options?.find(option => option.value === value);
    return <span>{selectedOption ? selectedOption.label : 'Не выбрано'}</span>;
  }
};
