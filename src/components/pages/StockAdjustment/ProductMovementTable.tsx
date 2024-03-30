import React, { useCallback, useEffect, useState } from 'react';
import { TypeProduct, TypeProductMovement, TypeStock } from '../../../types';
import { useParams } from 'react-router-dom';
import { getProductMovementByIdAndEntityType } from '../../../api';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { renderNumber } from '../../../utils';

export const ProductMovementTable = () => {
  const [data, setData] = useState<TypeProductMovement[]>();

  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;

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
      render: renderNumber,
    },
    {
      title: 'На складе',
      dataIndex: 'stock',
      key: 'amountInStock',
      render: (amountInStock: TypeStock) =>
        amountInStock !== null ? <div>{amountInStock.amount}</div> : null,
    },
  ];

  // Обновить таблицу
  const handleUpdateTable = useCallback(() => {
    if (itemId) {
      getProductMovementByIdAndEntityType('STOCK_ADJUSTMENT', itemId)
        .then(data => {
          setData(data);
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [itemId]);

  useEffect(() => {
    handleUpdateTable();
  }, [handleUpdateTable]);

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
