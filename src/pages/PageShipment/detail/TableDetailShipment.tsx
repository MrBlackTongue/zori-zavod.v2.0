import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Space, Table, Tooltip,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {
  deleteShipmentProductMovementById,
  getAllProductMovementsByShipmentId
} from "../../../services";
import {TableProps, TypeShipment, TableParams, TypeStock} from "../../../types";
import dayjs from 'dayjs';
import {TypeShipmentProductMovement} from "../../../types/TypeShipmentProductMovement";
import {DeleteOutlined} from "@ant-design/icons";

export const TableDetailShipment: React.FC<TableProps<TypeShipment>> = ({
                                                                          isUpdateTable,
                                                                          filterById
                                                                        }) => {
  type TablePaginationPosition = 'bottomCenter'


  // Состояния для лоадера и списка всех товаров в отгрузке
  const [loading, setLoading] = useState(false);
  const [allShipmentMovements, setAllShipmentMovements] = useState<TypeShipmentProductMovement[]>();

  // Параметры для пагинации
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
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этот товар?"
              onConfirm={() => {
                deleteShipmentProductMovementById(id).then(() => {
                  if (filterById)
                    getAllProductMovementsByShipmentId(filterById)
                      .then((allShipmentMovements) => setAllShipmentMovements(allShipmentMovements))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle" style={{color: 'tomato', borderColor: 'tomato'}} ghost
                      onClick={() => {
                      }}>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

  // Функция обработки изменений таблицы
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

  // Получение данных по всем товарам в отгрузке с использованием filterById
  useEffect(() => {
    setLoading(true);
    if (filterById) {
      getAllProductMovementsByShipmentId(filterById).then((allShipmentMovements) => {
        console.log("movements", allShipmentMovements);
        setAllShipmentMovements(allShipmentMovements);
        setLoading(false);
      });
    }
  }, [filterById, !isUpdateTable]);

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