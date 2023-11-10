import React, { Key, useState } from 'react';
import { TableRowSelection } from 'antd/lib/table/interface';

function useRowSelection<T>(): {
  rowSelection: TableRowSelection<T>;
  selectedRowKeys: Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
  handleClearSelected: () => void;
  hasSelected: boolean;
} {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleClearSelected = () => {
    setSelectedRowKeys([]);
  };

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: onSelectChange,
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
