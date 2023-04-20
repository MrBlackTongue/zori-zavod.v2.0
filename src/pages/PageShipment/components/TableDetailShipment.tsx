import React, {useEffect, useState} from 'react';
import {
  Table,
} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {getAllProductMovementsByShipmentId} from "../../../services";
import {TableProps, TypeShipment, TableParams, TypeStock} from "../../../types";
import dayjs from 'dayjs';
import {TypeShipmentProductMovement} from "../../../types/TypeShipmentProductMovement";

export const TableDetailShipment: React.FC<TableProps<TypeShipment>> = ({
                                                                          filterById
                                                                        }) => {
  type TablePaginationPosition = 'bottomCenter'


  // Лоудер и список всех отгрузок
  const [loading, setLoading] = useState(false);
  const [allShipmentMovements, setAllShipmentMovements] = useState<TypeShipmentProductMovement[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeShipmentProductMovement> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'ID ячейки склада',
      dataIndex: 'stock',
      key: 'stockId',
      render: (stock: TypeStock) => stock?.id,
    },
    {
      title: 'Товар',
      dataIndex: 'stock',
      key: 'productTitle',
      render: (stock: TypeStock) => stock?.product?.title,
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => (a.amount ?? '') < (b.amount ?? '') ? -1 : 1,
    },
  ];

  // Параметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TypeShipmentProductMovement>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllShipmentMovements([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (filterById) {
      getAllProductMovementsByShipmentId(filterById).then((allShipmentMovements) => {
        console.log("movements", allShipmentMovements);
        setAllShipmentMovements(allShipmentMovements);
        setLoading(false);
      });
    }
  }, [filterById]);

  return (
    <Table
      columns={columns}
      dataSource={allShipmentMovements}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};