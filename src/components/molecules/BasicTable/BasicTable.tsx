import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { TableRowSelection } from 'antd/lib/table/interface';

type BasicTableProps<T> = {
  data: T[] | undefined;
  isLoading: boolean;
  columns: ColumnsType<T>;
  pagination: TablePaginationConfig;
  rowSelection: TableRowSelection<T>;
  onRowClick: (record: T) => void;
  onChangeTable: (pagination: TablePaginationConfig) => void;
  rowClassName?: (record: T, index: number) => string;
};

export const BasicTable = <T extends {}>({
  data,
  isLoading,
  columns,
  pagination,
  rowSelection,
  onRowClick,
  onChangeTable,
  rowClassName = () => '',
}: BasicTableProps<T>) => {
  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onChange={onChangeTable}
      rowSelection={rowSelection}
      onRow={record => ({
        onClick: () => onRowClick(record),
      })}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
      rowClassName={rowClassName}
    />
  );
};
