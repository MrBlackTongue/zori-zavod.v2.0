import React, { createContext, Key, ReactNode, useContext } from 'react';
import { TablePaginationConfig } from 'antd/es/table/interface';
import { TableRowSelection } from 'antd/lib/table/interface';
import { TypeWithId } from '../types';

export type BasicTableContextType<T> = {
  data: T[] | undefined;
  isLoading: boolean;
  pagination: TablePaginationConfig;
  selectedRowKeys?: Key[];
  hasSelected?: boolean;
  rowSelection?: TableRowSelection<T>;
  handleNavigateToForm?: (id?: number) => void;
  handleChangeTable: (pagination: TablePaginationConfig) => void;
  handleDeleteSelected?: () => void;
  handleClearSelected?: () => void;
  searchText?: string;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange?: (filterName: string, value: any) => void;
  itemPath?: (record: TypeWithId<T>) => string | undefined;
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
