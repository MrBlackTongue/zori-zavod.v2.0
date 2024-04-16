import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import type {
  ColumnsType,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import {
  TableProps,
  TypeProduct,
  TypeStock,
  TypeStockFilter,
  TypeStoragePlace,
  TypeUnit,
} from '../../../../types';
import {
  getAllStock,
  getAllStockByFilter,
  getAllStockByTitle,
} from '../../../../api';
import { renderNumber } from '../../../../utils';

export const TableStock: React.FC<TableProps<TypeStockFilter>> = ({
  isUpdateTable,
  searchText,
  filter,
}) => {
  // Spinner и список всех остатков
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allStock, setAllStock] = useState<TypeStock[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeStock> = [
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

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы склада
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllStock()
      .then(data => {
        setAllStock(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  // Функция для поиска по таблице склада
  const handleSearchTable = useCallback((): void => {
    setIsLoading(true);
    getAllStockByTitle(searchText ?? '')
      .then(data => {
        setAllStock(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, [searchText]);

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter?.id) {
      setIsLoading(true);
      getAllStockByFilter(filter?.id)
        .then(data => {
          setAllStock(data);
          setIsLoading(false);
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [filter]);

  useEffect(() => {
    if (filter?.id) {
      handleFilterTable();
    } else if (searchText) {
      handleSearchTable();
    } else {
      handleUpdateTable();
    }
  }, [
    searchText,
    filter,
    isUpdateTable,
    handleFilterTable,
    handleSearchTable,
    handleUpdateTable,
  ]);

  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={allStock}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
      rowClassName={(_, index) =>
        index % 2 === 0 ? 'table-even-row' : 'table-odd-row'
      }
    />
  );
};
