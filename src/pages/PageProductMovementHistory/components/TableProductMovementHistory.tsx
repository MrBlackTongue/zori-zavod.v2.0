import React, {useState, useEffect} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig, SorterResult} from "antd/es/table/interface";
import dayjs from "dayjs";
import {getAllProductMovementHistory, getProductMovementHistoryById} from "../../../services";
import {TypeProduct, TableParams, TableProps, TypeProductMovementHistory} from "../../../types";

export const TableProductMovementHistory: React.FC<TableProps<TypeProductMovementHistory>> = ({
                                                                                                isUpdateTable,
                                                                                                filterById,
                                                                                              }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всей истории движения товаров
  const [loading, setLoading] = useState(false);
  const [allProductMovementHistory, setAllProductMovementHistory] = useState<TypeProductMovementHistory[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeProductMovementHistory> = [
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
      render: ((income: number | null) => income !== null ?
        <div>
          {income.toLocaleString('ru-RU')}
        </div> : 0)
    },
    {
      title: 'Расход',
      dataIndex: 'outcome',
      key: 'outcome',
      render: ((outcome: number | null) => outcome !== null ?
        <div>
          {outcome.toLocaleString('ru-RU')}
        </div> : 0)
    },
    {
      title: 'Остатки',
      dataIndex: 'leftovers',
      key: 'leftovers',
      sorter: (a, b) => (a.leftovers ?? '') < (b.leftovers ?? '') ? -1 : 1,
      render: ((leftovers: number | null) => leftovers !== null ?
        <div>
          {leftovers.toLocaleString('ru-RU')}
        </div> : null)
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
    sorter: SorterResult<TypeProduct>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProductMovementHistory(allProductMovementHistory);
    }
  };

  // Функция для поиска по таблице истории движения товаров
  const filterTable = () => {
    if (filterById) {
      setLoading(true);
      getProductMovementHistoryById(filterById).then((allProductMovementHistory) => {
        setAllProductMovementHistory(allProductMovementHistory);
        setLoading(false);
      });
    }
  }

  // Функция для обновления таблицы товаров
  const updateTable = () => {
    setLoading(true);
    getAllProductMovementHistory().then((allProductMovementHistory) => {
      setAllProductMovementHistory(allProductMovementHistory);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (filterById) {
      filterTable();
    } else {
      updateTable();
    }
  }, [filterById, isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allProductMovementHistory}
      pagination={{
        position: [bottom],
        current: tableParams?.pagination?.current,
        pageSize: tableParams?.pagination?.pageSize,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}