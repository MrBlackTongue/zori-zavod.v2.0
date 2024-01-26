import React from 'react';
import { Flex, FloatButton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  TypeEmployee,
  TypeProductionType,
  TypeWithId,
  TypeWriteOff,
} from '../../../../types';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';

export const WriteOffTableView = () => {
  const columns: ColumnsType<TypeWithId<TypeWriteOff>> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
      width: 300,
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.employee?.lastName ?? 0) < (b.employee?.lastName ?? 0) ? -1 : 1,
      render: (employee: TypeEmployee) => (
        <div>
          {employee.lastName} {employee.firstName}
        </div>
      ),
    },
    {
      title: 'Тип производства',
      dataIndex: 'productionType',
      key: 'productionType',
      width: 300,
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.productionType?.title ?? 0) < (b.productionType?.title ?? 0)
          ? -1
          : 1,
      render: (productionType: TypeProductionType) => (
        <div>{productionType.title}</div>
      ),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
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
