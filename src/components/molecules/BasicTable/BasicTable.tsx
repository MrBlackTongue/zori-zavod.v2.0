import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useBasicTable } from '../../../contexts/BasicTableContext';
import { TypeWithId } from '../../../types';

type BasicTableProps<T> = {
  columns: ColumnsType<TypeWithId<T>>;
  idKey?: string;
};

export const BasicTable = <T extends {}>({
  columns,
  idKey = 'id',
}: BasicTableProps<T>) => {
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
      onRow={(record: TypeWithId<T> & Record<string, any>) => ({
        onClick: () => {
          const idValue = idKey
            .split('.')
            .reduce((obj, key) => obj && obj[key], record);
          handleNavigateToForm?.(Number(idValue));
        },
      })}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
    />
  );
};
