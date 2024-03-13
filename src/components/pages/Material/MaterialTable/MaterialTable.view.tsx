import React from 'react';
import { Flex, FloatButton, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TypeMaterial, TypeWithId } from '../../../../types';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';
import { SearchOutlined } from '@ant-design/icons';
import { useBasicTable } from '../../../../contexts/BasicTableContext';

export const MaterialTableView = () => {
  const columns: ColumnsType<TypeWithId<TypeMaterial>> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: category => category?.title,
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
      render: unit => unit?.name,
    },
  ];

  const { handleSearchChange } = useBasicTable<TypeMaterial>();

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
          placeholder="Поиск по материалам"
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
