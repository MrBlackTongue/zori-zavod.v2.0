import React, { useCallback, useRef, useState } from 'react';
import { Select, Tooltip } from 'antd';
import { useDataListLoader } from '../../../hooks';

interface EditableSelectProps<T> {
  value?: number;
  label?: string;
  placeholder: string;
  fetchDataList: () => Promise<T[]>;
  getId: (item: T) => number;
  getLabel: (item: T) => string;
  onValueChange?: (value: number | undefined) => void;
}

export const EditableSelect = <T,>({
  value,
  label,
  placeholder,
  fetchDataList,
  getId,
  getLabel,
  onValueChange,
}: EditableSelectProps<T>) => {
  const selectRef = useRef<any>(null);

  // Хук для получения всех данных и загрузки
  const { isLoading, dataList, getDataList } = useDataListLoader<T[]>();
  const [isOpen, setIsOpen] = useState(false);

  // Формирование значений для выпадающего списка
  const options = dataList
    ?.filter(el => getId(el) !== undefined)
    .map(item => ({
      key: getId(item),
      value: getId(item),
      label: getLabel(item),
    }));

  // Функция для поиска значения
  const onSearch = (value: string, option: any) => {
    return option.label.toLowerCase().includes(value.toLowerCase());
  };

  // Обработчик изменения выбранного значения
  const onChange = (value: number | undefined) => {
    onValueChange?.(value);
    setIsOpen(false);
  };

  // Функция для загрузки данных списка
  const loadData = useCallback(() => {
    getDataList(fetchDataList).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    });
  }, [getDataList, fetchDataList]);

  // Обработчик изменения видимости выпадающего списка
  const handleDropdownVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        loadData();
      }
    },
    [loadData],
  );

  // Функция для открытия выпадающего списка и установки фокуса на него
  const toggleOpen = () => {
    loadData();
    setIsOpen(true);
    setTimeout(() => {
      selectRef.current?.focus();
    }, 0);
  };

  // Обработчик потери фокуса выпадающего списка
  const handleBlur = () => {
    setIsOpen(false);
  };

  const renderSelect = () => (
    <Select
      showSearch
      value={value}
      open={isOpen}
      ref={selectRef}
      loading={isLoading}
      onChange={onChange}
      onBlur={handleBlur}
      filterOption={onSearch}
      placeholder={placeholder}
      style={{ width: '100%' }}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onMouseDown={e => e.preventDefault()}>
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

  const renderLabel = () => {
    const selectedOption = options?.find(option => option.value === value);
    return selectedOption ? selectedOption.label : label ?? placeholder;
  };

  return isOpen ? (
    renderSelect()
  ) : (
    <div
      className="editable-cell-value-wrap"
      style={{ paddingRight: 24, width: '100%' }}
      onMouseDown={toggleOpen}>
      {renderLabel()}
    </div>
  );
};
