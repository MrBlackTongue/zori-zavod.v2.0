import React from 'react';
import { FloatButton } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import {
  TypeProduct,
  TypeStock,
  TypeStoragePlace,
  TypeUnit,
  TypeWithId,
} from '../../../../types';
import { renderNumber } from '../../../../utils';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';

export const StockMaterialsTableView = () => {
  const columns: ColumnsType<TypeWithId<TypeStock>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'idStock',
      showSorterTooltip: false,
      sorter: (a, b) => ((a.id ?? '') < (b.id ?? '') ? -1 : 1),
    },
    {
      title: 'Товар',
      dataIndex: 'item',
      key: 'item',
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.item?.title ?? '') < (b.item?.title ?? '') ? -1 : 1,
      render: (product: TypeProduct) => (product ? product.title : null),
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      render: renderNumber,
      showSorterTooltip: false,
      sorter: (a, b) => ((a.amount ?? '') < (b.amount ?? '') ? -1 : 1),
    },
    {
      title: 'Ед. изм',
      dataIndex: ['item', 'unit'],
      key: 'unit',
      render: (unit: TypeUnit) => (unit ? unit.name : null),
    },
    {
      title: 'Место хранения',
      dataIndex: 'storagePlace',
      key: 'storagePlace',
      render: (storagePlace: TypeStoragePlace) =>
        storagePlace ? storagePlace.title : null,
    },
  ];

  return (
    <div>
      <BasicTable columns={columns} idKey="item.id" />
      <FloatButton.BackTop />
    </div>
  );
};
