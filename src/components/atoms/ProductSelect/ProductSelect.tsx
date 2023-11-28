import React, { useCallback } from 'react';
import { Select, Tooltip } from 'antd';
import { TypeProduct } from '../../../types';
import { useDataListLoader } from '../../../hooks';
import { getAllProduct } from '../../../api';

interface SelectValue {
  id: number;
}

interface ProductSelectProps {
  // onChange: (value: string) => void;
  onChange: (value: SelectValue | undefined) => void;
  onClear: () => void;
  onSearch: (input: string, option: any) => boolean;
  value?: string | { id: string | number };
}

export const ProductSelect: React.FC<ProductSelectProps> = ({
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

  // let selectValue: string | undefined;
  //
  // if (typeof value === 'object' && value !== null && 'id' in value) {
  //   selectValue = String(value.id); // Преобразование числового id в строку
  // } else if (typeof value === 'string') {
  //   selectValue = value; // Использование строки как есть
  // }

  const handleChange = (value: { value: string; label: string }) => {
    if (value) {
      onChange({ id: parseInt(value.value, 10) });
    } else {
      onChange(undefined);
    }
  };

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
        ? dataList.map(product => (
            <Select.Option
              key={product.id}
              value={product.id}
              label={product.title}>
              <Tooltip placement="right" title={product.title}>
                {product.title}
              </Tooltip>
            </Select.Option>
          ))
        : null}
    </Select>
  );
};
