import React from 'react';
import { Flex, FloatButton, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import {
  TypeProduct,
  TypeStock,
  TypeStoragePlace,
  TypeUnit,
  TypeWithId,
} from '../../../../types';
import { renderNumber } from '../../../../utils';
import { SearchOutlined } from '@ant-design/icons';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';
import { useBasicTable } from '../../../../contexts/BasicTableContext';
import { getAllCategory } from '../../../../api';
import { SimpleSelect } from '../../../atoms/SimpleSelect/SimpleSelect';

export const StockAllTableView = () => {
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

  const { handleSearchChange, handleFilterChange, itemPath } =
    useBasicTable<TypeStock>();

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
          onChange={handleSearchChange}
          style={{ width: '210px' }}
          prefix={<SearchOutlined />}
        />
        <SimpleSelect
          placeholder="Выберите категорию"
          style={{ width: '250px' }}
          allowCreation={false}
          getId={item => item.id ?? 0}
          getLabel={item => item.title ?? ''}
          fetchDataList={getAllCategory}
          onValueChange={newValue => {
            handleFilterChange?.('categoryId', newValue);
          }}
        />
      </Flex>
      <BasicTable columns={columns} itemPath={itemPath} />
      <FloatButton.BackTop />
    </div>
  );
};
