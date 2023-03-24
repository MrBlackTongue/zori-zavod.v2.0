import React, {useState, useEffect} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig, SorterResult} from "antd/es/table/interface";
import {ProductMovementHistoryType, TableParams, ItemTableProps, ProductType} from "../../types";
import dayjs from "dayjs";
import {getAllProductMovementHistories} from "../../services";

export const TableProductMovementHistory: React.FC<ItemTableProps<ProductMovementHistoryType>> = ({
                                                                                    isUpdateTable,
                                                                                  }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех закупок
  const [loading, setLoading] = useState(false);
  const [allProductMovementHistories, setAllProductMovementHistories] = useState<ProductMovementHistoryType[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<ProductMovementHistoryType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
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
    },
    {
      title: 'Расход',
      dataIndex: 'outcome',
      key: 'outcome',
    },
    {
      title: 'Остатки',
      dataIndex: 'leftovers',
      key: 'leftovers',
    },
    {
      title: 'Ед.изм',
      dataIndex: 'unit',
      key: 'unit',
    },
  ];

  // Параметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<ProductType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProductMovementHistories([]);
    }
  };

  // Функция для обновления таблицы товаров
  const updateTable = () => {
    setLoading(true);
    getAllProductMovementHistories().then((allProductMovementHistories) => {
      setAllProductMovementHistories(allProductMovementHistories);
      setLoading(false);
    });
  }

  // Обновление таблицы товаров
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allProductMovementHistories}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}