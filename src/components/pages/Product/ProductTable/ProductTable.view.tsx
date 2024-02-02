import React from 'react';
import { Flex, FloatButton, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  TypeCategory,
  TypeProduct,
  TypeUnit,
  TypeWithId,
} from '../../../../types';
import { useBasicTable } from '../../../../contexts/BasicTableContext';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';

export const ProductTableView = () => {
  const columns: ColumnsType<TypeWithId<TypeProduct>> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      showSorterTooltip: false,
      sorter: (a, b) => ((a.title ?? '') < (b.title ?? '') ? -1 : 1),
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
      width: 200,
      render: (unit: TypeUnit) => (unit ? <div> {unit.name}</div> : null),
    },
    {
      title: 'Категория',
      dataIndex: 'productGroup',
      key: 'productGroup',
      render: (productGroup: TypeCategory) =>
        productGroup ? <div> {productGroup.title}</div> : null,
    },
  ];

  const { handleSearchChange } = useBasicTable<TypeProduct>();

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
