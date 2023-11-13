import React from 'react';
import { Flex, FloatButton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TypeClient, TypeWithId } from '../../../../types';
import dayjs from 'dayjs';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';

export const ClientTableView = () => {
  const columns: ColumnsType<TypeWithId<TypeClient>> = [
    {
      title: 'Имя',
      dataIndex: 'title',
      key: 'title',
      width: 500,
      showSorterTooltip: false,
      sorter: (a, b) => ((a.title ?? '') < (b.title ?? '') ? -1 : 1),
    },
    {
      title: 'Последняя отгрузка',
      dataIndex: 'lastShipment',
      key: 'lastShipment',
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.lastShipment ?? '') < (b.lastShipment ?? '') ? -1 : 1,
      render: (date: any) =>
        date !== null ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
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
