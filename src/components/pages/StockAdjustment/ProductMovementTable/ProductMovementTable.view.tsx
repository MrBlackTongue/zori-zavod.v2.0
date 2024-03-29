import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TypeProduct, TypeProductMovement, TypeStock } from '../../../../types';
import { EditableInputCell } from '../../../molecules/EditableInputCell/EditableInputCell';

interface ProductMovementTableViewProps {
  data: TypeProductMovement[] | undefined;
}

export const ProductMovementTableView: React.FC<
  ProductMovementTableViewProps
> = ({ data }) => {
  const columns: ColumnsType<TypeProductMovement> = [
    {
      title: 'ID на складе',
      dataIndex: 'stock',
      key: 'stock',
      width: 150,
      showSorterTooltip: false,
      sorter: (a, b) => ((a.stock?.id ?? 0) < (b.stock?.id ?? 0) ? -1 : 1),
      render: (stock: TypeStock) =>
        stock !== null ? <div>{stock.id}</div> : null,
    },
    {
      title: 'Товар',
      dataIndex: ['stock', 'product'],
      key: 'product',
      render: (product: TypeProduct) =>
        product !== null ? <div>{product.title}</div> : null,
    },
    {
      title: 'Корректировка',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <EditableInputCell
          value={text}
          row={record}
          column={{ id: 'amount' }}
          updateData={updateData}
        />
      ),
      // render: renderNumber,
    },
    {
      title: 'На складе',
      dataIndex: 'stock',
      key: 'amountInStock',
      render: (amountInStock: TypeStock) =>
        amountInStock !== null ? <div>{amountInStock.amount}</div> : null,
    },
  ];

  const updateData = (
    rowId: string | number,
    dataIndex: string | number,
    value: string,
  ) => {
    console.log('rowId', rowId);
    console.log('dataIndex', dataIndex);
    console.log('value', value);
  };

  return (
    <Table
      rowKey="id"
      bordered
      size="small"
      className={'editable-table'}
      rowClassName={() => 'editable-row'}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};
