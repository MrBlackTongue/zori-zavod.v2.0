import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useBasicTable } from '../../../contexts/BasicTableContext';
import { TypeWithId } from '../../../types';
import { useNavigate } from 'react-router-dom';

type BasicTableProps<T> = {
  columns: ColumnsType<TypeWithId<T>>;
  idKey?: string;
  itemPath?: (record: TypeWithId<T>) => string | undefined;
};

export const BasicTable = <T extends {}>({
  columns,
  idKey = 'id',
  itemPath,
}: BasicTableProps<T>) => {
  const {
    data,
    isLoading,
    pagination,
    rowSelection,
    handleNavigateToForm,
    handleChangeTable,
  } = useBasicTable<TypeWithId<T>>();

  const navigate = useNavigate();

  const handleRowClick = (record: TypeWithId<T> & Record<string, any>) => {
    if (itemPath) {
      const path = itemPath(record);
      if (path) {
        navigate(path);
      }
    } else {
      const idValue = idKey
        .split('.')
        .reduce((obj, key) => obj && obj[key], record);
      handleNavigateToForm?.(Number(idValue));
    }
  };

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
        onClick: () => handleRowClick(record),
      })}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
    />
  );
};
