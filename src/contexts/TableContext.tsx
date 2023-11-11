import React, { createContext, Key, ReactNode, useContext } from 'react';
import { TablePaginationConfig } from 'antd/es/table/interface';
import { TableRowSelection } from 'antd/lib/table/interface';

export type TableContextType<T> = {
  data: T[] | undefined;
  isLoading: boolean;
  pagination: TablePaginationConfig;
  selectedRowKeys: Key[];
  hasSelected: boolean;
  rowSelection: TableRowSelection<T>;
  handleNavigateToForm: (id?: number) => void;
  handleChangeTable: (pagination: TablePaginationConfig) => void;
  handleDeleteSelected: () => void;
  handleClearSelected: () => void;
};

export type TableProviderProps<T> = {
  children: ReactNode;
  value: TableContextType<T>;
};

const TableContext = createContext<TableContextType<any> | null>(null);

export const useTable = <T,>() => {
  const context = useContext(
    TableContext as React.Context<TableContextType<T> | null>,
  );
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};

export const TableProvider = <T,>({
  children,
  value,
}: TableProviderProps<T>) => (
  <TableContext.Provider value={value}>{children}</TableContext.Provider>
);
