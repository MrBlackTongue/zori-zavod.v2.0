import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import type {
  ColumnsType,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import {
  getAllProductMovementHistory,
  getProductMovementHistoryById,
} from '../../../services';
import {
  TableProps,
  TypeProductMovementHistory,
  TypeProductMovementHistoryFilter,
} from '../../../types';

export const TableProductMovementHistory: React.FC<
  TableProps<TypeProductMovementHistoryFilter>
> = ({ filter }) => {
  // Spinner и список всей истории движения товаров
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allProductMovementHistory, setAllProductMovementHistory] =
    useState<TypeProductMovementHistory[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeProductMovementHistory> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: any) =>
        date !== null ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Приход',
      dataIndex: 'income',
      key: 'income',
      render: (income: number | null) =>
        income !== null ? <div>{income.toLocaleString('ru-RU')}</div> : 0,
    },
    {
      title: 'Расход',
      dataIndex: 'outcome',
      key: 'outcome',
      render: (outcome: number | null) =>
        outcome !== null ? <div>{outcome.toLocaleString('ru-RU')}</div> : 0,
    },
    {
      title: 'Остатки',
      dataIndex: 'leftovers',
      key: 'leftovers',
      showSorterTooltip: false,
      sorter: (a, b) => ((a.leftovers ?? '') < (b.leftovers ?? '') ? -1 : 1),
      render: (leftovers: number | null) =>
        leftovers !== null ? (
          <div>{leftovers.toLocaleString('ru-RU')}</div>
        ) : null,
    },
    {
      title: 'Ед.изм',
      dataIndex: 'unit',
      key: 'unit',
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы товаров
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllProductMovementHistory()
      .then(data => {
        setAllProductMovementHistory(
          data.map((item, index) => ({ ...item, key: index })),
        );
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  // Функция для поиска по таблице истории движения товаров
  const handleFilterTable = useCallback((): void => {
    if (filter?.id) {
      setIsLoading(true);
      getProductMovementHistoryById(filter.id)
        .then(data => {
          if (data) {
            setAllProductMovementHistory(
              data.map((item, index) => ({ ...item, key: index })),
            );
            setIsLoading(false);
          }
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [filter?.id]);

  useEffect(() => {
    if (filter?.id) {
      handleFilterTable();
    } else {
      handleUpdateTable();
    }
  }, [filter?.id, handleFilterTable, handleUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allProductMovementHistory}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
      rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
    />
  );
};
