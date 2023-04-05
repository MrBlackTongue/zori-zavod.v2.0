import React, {useEffect, useState} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {getAllAcceptances, deleteAcceptanceById} from "../../../services";
import {TableProps, TypeAcceptance, TableParams, TypeUnit, TypePurchase, TypeStock} from "../../../types";
import dayjs from "dayjs";
import {SorterResult} from "antd/es/table/interface";
import {logDOM} from "@testing-library/react";

export const TableAcceptance: React.FC<TableProps<TypeAcceptance>> = ({
                                                                        isUpdateTable,
                                                                        openDrawer,
                                                                        searchText
                                                                      }) => {
  type TablePaginationPosition = "bottomCenter"

  // Лоудер и список всех приемок
  const [loading, setLoading] = useState(false);
  const [allAcceptances, setAllAcceptances] = useState<TypeAcceptance[]>();

  // Параметры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeAcceptance> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'ID ячейки',
      dataIndex: 'stock',
      key: 'stock',
      render: ((stock: any) =>
        stock !== null ? (<div key={stock.id}>{stock.id}</div>) : null)
    },
    {
      title: 'Товар',
      dataIndex: 'stock',
      key: 'stock',
      render: ((stock: any) =>
        stock !== null ? (<div key={stock?.id}>{stock?.product?.title}</div>) : null)
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Ед. изм',
      dataIndex: ['stock', 'product', 'unit'],
      key: 'unit',
      render: ((unit: TypeUnit) =>
          unit !== null ? (<div key={unit.id}>{unit.name}</div>) : null)
    },
    {
      title: 'ID закупки',
      dataIndex: 'purchase',
      key: 'purchase',
      render: ((stock: any) =>
        stock !== null ? (<div key={stock.id}>{stock.id}</div>) : null)
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: ((id: number) => (
        <Space>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту приемку?"
              onConfirm={() => {
                deleteAcceptanceById(id).then(() => {
                  getAllAcceptances().then((allAcceptances) => setAllAcceptances(allAcceptances))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost onClick={() => {
              }}>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ]

  // Параметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TypePurchase>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllAcceptances([]);
    }
  };

  // Функция для обновления таблицы приемок
  const updateTable = () => {
    setLoading(true);
    getAllAcceptances().then((allAcceptances) => {
      setAllAcceptances(allAcceptances);
      setLoading(false);
    });
  }

  // Обновление таблицы приемок
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allAcceptances}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};