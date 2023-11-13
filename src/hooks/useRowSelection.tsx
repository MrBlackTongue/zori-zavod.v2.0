import React, { Key, useState } from 'react';
import { TableRowSelection } from 'antd/lib/table/interface';

function useRowSelection<T>(): {
  rowSelection: TableRowSelection<T>;
  selectedRowKeys: Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
  handleClearSelected: () => void;
  hasSelected: boolean;
} {
  // Состояние для хранения ключей выбранных строк
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  // Вычисляемое значение, указывающее, выбраны ли какие-либо строки
  const hasSelected = selectedRowKeys.length > 0;

  // Обработчик изменения выбранных строк
  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Функция для сброса всех выбранных строк
  const handleClearSelected = () => {
    setSelectedRowKeys([]);
  };

  // Объект содержит настройки для свойств выбора строк в таблице
  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: true,
  };

  return {
    rowSelection,
    hasSelected,
    selectedRowKeys,
    setSelectedRowKeys,
    handleClearSelected,
  };
}

export default useRowSelection;
