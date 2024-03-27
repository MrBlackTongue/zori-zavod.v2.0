import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TypeProduct, TypeProductMovement, TypeStock } from '../../../../types';
import dayjs from 'dayjs';
import { EditableCellNew } from '../../../molecules/EditableCellNew/EditableCellNew';

interface ProductMovementTableViewProps {
  data: TypeProductMovement[] | undefined;
}

export const ProductMovementTableView: React.FC<
  ProductMovementTableViewProps
> = ({ data }) => {
  const columns: ColumnsType<TypeProductMovement> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: any) =>
        date !== null ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
    },
    {
      title: 'ID на складе',
      dataIndex: 'stock',
      key: 'stock',
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
      title: 'Тип движения',
      dataIndex: 'income',
      key: 'income',
      render: income => (income ? 'Приход' : 'Расход'),
      showSorterTooltip: false,
      sorter: (a, b) => ((a.income ?? false) < (b.income ?? false) ? -1 : 1),
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <EditableCellNew
          value={text}
          row={record}
          column={{ id: 'amount' }}
          updateData={updateData}
        />
      ),
      // render: renderNumber,
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
