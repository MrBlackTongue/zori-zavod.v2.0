import React, {useState, useEffect} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig, SorterResult} from "antd/es/table/interface";
import dayjs from "dayjs";
import {getAllProductMovementHistory, getProductMovementHistoryById} from "../../../services";
import {TypeProductMovementHistory} from "../../../types/TypeProductMovementHistory";
import {TypeProduct, TableParams, TableProps} from "../../../types";

export const TableProductMovementHistory: React.FC<TableProps<TypeProductMovementHistory>> = ({
                                                                                                isUpdateTable,
                                                                                                filterById,
                                                                                              }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех закупок
  const [loading, setLoading] = useState(false);
  const [allProductMovementHistory, setAllProductMovementHistory] = useState<TypeProductMovementHistory[]>();

  //const [productMovementHistoryById, setProductMovementHistoryById] = useState<TypeProductMovementHistory[]>();


  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

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
      render: ((income: number | null) => income !== null ? income : 0)
    },
    {
      title: 'Расход',
      dataIndex: 'outcome',
      key: 'outcome',
      render: ((income: number | null) => income !== null ? income : 0)
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
    sorter: SorterResult<TypeProduct>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProductMovementHistory([]);
    }
  };

  // Функция для поиска по таблице истории движения товаров
  const filterTable = () => {
    if (filterById) {
      setLoading(true);
      getProductMovementHistoryById(filterById).then((allProductMovementHistory) => {
        setAllProductMovementHistory(allProductMovementHistory);
        console.log('filterById', filterById);
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

  // Обновление таблицы товаров
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);

  useEffect(() => {
    if (filterById) {
      filterTable();
    } else {
      updateTable();
    }
  }, [filterById]);

  return (
    <Table
      columns={columns}
      dataSource={allProductMovementHistory}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}