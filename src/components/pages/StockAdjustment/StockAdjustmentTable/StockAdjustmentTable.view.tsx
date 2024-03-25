import React from 'react';
import { Flex, FloatButton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TypeStockAdjustment, TypeWithId } from '../../../../types';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';
import dayjs from 'dayjs';

export const StockAdjustmentTableView = () => {
  const columns: ColumnsType<TypeWithId<TypeStockAdjustment>> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: any) =>
        date !== null ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
    },
    {
      title: 'Причина',
      dataIndex: 'reason',
      key: 'reason',
      width: 300,
    },
  ];

  return (
    <div>
      <Flex justify="space-between">
        <DeleteWithConfirmationButton />
        <AddButton />
      </Flex>
      <BasicTable columns={columns} />
      <FloatButton.BackTop />
    </div>
  );
};
