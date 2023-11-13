import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useBasicTable } from '../../../contexts/BasicTableContext';
import { TypeWithId } from '../../../types';

type BasicTableProps<T> = {
  columns: ColumnsType<TypeWithId<T>>;
};

export const BasicTable = <T extends {}>({ columns }: BasicTableProps<T>) => {
  const {
    data,
    isLoading,
    pagination,
    rowSelection,
    handleNavigateToForm,
    handleChangeTable,
  } = useBasicTable<TypeWithId<T>>();
  return (
    <Table<TypeWithId<T>>
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onChange={handleChangeTable}
      rowSelection={rowSelection}
      onRow={(record: TypeWithId<T>) => ({
        onClick: () => handleNavigateToForm(Number(record.id)),
      })}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
      // rowClassName={(_, index) =>
      //   index % 2 === 0 ? 'table-even-row' : 'table-odd-row'
      // }
    />
  );
};
