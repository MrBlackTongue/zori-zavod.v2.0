import React, { createContext, Key, ReactNode, useContext } from 'react';
import { TablePaginationConfig } from 'antd/es/table/interface';
import { TableRowSelection } from 'antd/lib/table/interface';

export type BasicTableContextType<T> = {
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

export type BasicTableProviderProps<T> = {
  children: ReactNode;
  value: BasicTableContextType<T>;
};

const BasicTableContext = createContext<BasicTableContextType<any> | null>(
  null,
);

export const useBasicTable = <T,>() => {
  const context = useContext(
    BasicTableContext as React.Context<BasicTableContextType<T> | null>,
  );
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};

export const BasicTableProvider = <T,>({
  children,
  value,
}: BasicTableProviderProps<T>) => (
  <BasicTableContext.Provider value={value}>
    {children}
  </BasicTableContext.Provider>
);
