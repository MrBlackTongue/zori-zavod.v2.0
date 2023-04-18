import React, {useEffect, useState} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {getAllAcceptance, deleteAcceptanceById, getAcceptanceByTitle} from "../../../services";
import {TableProps, TypeAcceptance, TableParams, TypeUnit, TypePurchase} from "../../../types";
import dayjs from "dayjs";
import {SorterResult} from "antd/es/table/interface";

export const TableAcceptance: React.FC<TableProps<TypeAcceptance>> = ({
                                                                        isUpdateTable,
                                                                        searchText
                                                                      }) => {
  type TablePaginationPosition = "bottomCenter"

  // Лоудер и список всех приемок
  const [loading, setLoading] = useState(false);
  const [allAcceptance, setAllAcceptance] = useState<TypeAcceptance[]>();

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
      dataIndex: 'product',
      key: 'product',
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
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту приемку?"
              onConfirm={() => {
                deleteAcceptanceById(id).then(() => {
                  getAllAcceptance().then((allAcceptance) => setAllAcceptance(allAcceptance))
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
      setAllAcceptance([]);
    }
  };

  // Функция для обновления таблицы приемок
  const updateTable = () => {
    setLoading(true);
    getAllAcceptance().then((allAcceptance) => {
      setAllAcceptance(allAcceptance);
      setLoading(false);
    });
  }

  // Функция для поиска приёмки
  const searchTable = () => {
    setLoading(true);
    getAcceptanceByTitle(searchText ?? '').then((allAcceptances) => {
      setAllAcceptance(allAcceptances);
      setLoading(false);
    });
  }

  // Обновление таблицы приемок
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);

  // Поиск по таблице приемок
  useEffect(() => {
    if (searchText) {
      searchTable();
    } else {
      updateTable();
    }
  }, [searchText]);

  return (
    <Table
      columns={columns}
      dataSource={allAcceptance}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};