import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Select, Tooltip } from 'antd';
import { useDataListLoader } from '../../../hooks';

interface EditableSelectProps<T> {
  value?: number;
  isEditable: boolean;
  placeholder: string;
  fetchDataList: () => Promise<T[]>;
  getId: (item: T) => number;
  getLabel: (item: T) => string;
  onValueChange?: (value: number | undefined) => void;
}

export const EditableSelect = <T,>({
  value,
  isEditable,
  placeholder,
  fetchDataList,
  getId,
  getLabel,
  onValueChange,
}: EditableSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<any>(null);
  const { isLoading, dataList, getDataList } = useDataListLoader<T[]>();

  const options = dataList
    ?.filter(el => getId(el) !== undefined)
    .map(item => ({
      key: getId(item),
      value: getId(item),
      label: getLabel(item),
    }));

  const onSearch = (value: string, option: any) => {
    return option.label.toLowerCase().includes(value.toLowerCase());
  };

  const onChange = (value: number | undefined) => {
    if (value) {
      onValueChange?.(value);
    } else {
      onValueChange?.(undefined);
    }
    setOpen(false);
  };

  const loadData = useCallback(() => {
    getDataList(fetchDataList).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    });
  }, [getDataList, fetchDataList]);

  const handleDropdownVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        loadData();
      }
    },
    [loadData],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      selectRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const renderSelect = () => (
    <Select
      ref={selectRef}
      showSearch
      value={value}
      style={{ width: '100%' }}
      onChange={onChange}
      onBlur={handleBlur}
      filterOption={onSearch}
      placeholder={placeholder}
      loading={isLoading}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      open={open}
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
    return selectedOption ? selectedOption.label : placeholder;
  };

  let childNode;

  if (isEditable) {
    childNode = open ? (
      renderSelect()
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, width: '100%' }}
        onMouseDown={toggleOpen}>
        {renderLabel()}
      </div>
    );
  } else {
    childNode = <span>{renderLabel()}</span>;
  }

  return <>{childNode}</>;
};
