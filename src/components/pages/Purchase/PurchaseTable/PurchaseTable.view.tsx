import React from 'react';
import { Flex, FloatButton, Input, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table/interface';
import {
  TypeItem,
  TypePurchase,
  TypeUnit,
  TypeWithId,
} from '../../../../types';
import dayjs from 'dayjs';
import { renderAsRuble, renderNumber } from '../../../../utils';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';
import { useBasicTable } from '../../../../contexts/BasicTableContext';

export const PurchaseTableView = () => {
  const columns: ColumnsType<TypeWithId<TypePurchase>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'idPurchase',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: any) =>
        date ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
    },
    {
      title: 'Товар',
      dataIndex: 'item',
      key: 'item',
      render: (item: TypeItem) => (item ? <div>{item.title}</div> : null),
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
      render: (unit: TypeUnit) => (unit ? <div>{unit.name}</div> : null),
    },
    {
      title: 'Цена за единицу',
      dataIndex: 'cost',
      key: 'cost',
      showSorterTooltip: false,
      sorter: (a, b) => ((a.cost ?? 0) < (b.cost ?? 0) ? -1 : 1),
      render: renderAsRuble,
    },
    {
      title: 'Стоимость закупки',
      key: 'totalCost',
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.cost ?? 0) * (a.amount ?? 0) < (b.cost ?? 0) * (b.amount ?? 0)
          ? -1
          : 1,
      render: (record: any) =>
        record.cost !== null && record.amount !== null ? (
          <div>
            {`${(record.cost * record.amount).toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </div>
        ) : null,
    },
    {
      title: 'Статус оплаты',
      key: 'paid',
      showSorterTooltip: false,
      sorter: (a, b) => Number(a.paid) - Number(b.paid),
      render: (record: TypePurchase) => (
        <Tag color={record.paid ? 'green' : 'volcano'}>
          {record.paid ? 'Оплачено' : 'Не оплачено'}
        </Tag>
      ),
    },
  ];

  const { handleSearchChange } = useBasicTable<TypePurchase>();

  return (
    <div>
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Input
          allowClear
          placeholder="Поиск по товарам"
          style={{ width: '210px' }}
          onChange={handleSearchChange}
          prefix={<SearchOutlined />}
        />
      </Flex>
      <Flex justify="space-between">
        <DeleteWithConfirmationButton />
        <AddButton />
      </Flex>
      <BasicTable columns={columns} />
      <FloatButton.BackTop />
    </div>
  );
};
