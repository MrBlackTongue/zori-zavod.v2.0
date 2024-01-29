import React from 'react';
import { Flex, FloatButton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TypeMaterial, TypeWithId } from '../../../../types';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';

export const MaterialTableView = () => {
  const columns: ColumnsType<TypeWithId<TypeMaterial>> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Категория',
      dataIndex: ['category', 'title'],
      key: 'category',
      render: category => category?.title,
    },
    {
      title: 'Единица измерения',
      dataIndex: ['unit', 'name'],
      key: 'unit',
      render: unit => unit?.name,
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
