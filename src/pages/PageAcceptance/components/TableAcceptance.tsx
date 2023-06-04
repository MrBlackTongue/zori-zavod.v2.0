import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {getAllAcceptance, getAllAcceptanceByTitle} from "../../../services";
import {TableProps, TypeAcceptance, TableParam, TypeUnit, TypeStock, TypeProduct, TypePurchase} from "../../../types";
import dayjs from "dayjs";

export const TableAcceptance: React.FC<TableProps> = ({
                                                        isUpdateTable,
                                                        searchText,
                                                        onDelete,
                                                      }) => {
  // Лоудер и список всех приемок
  const [isLoading, setIsLoading] = useState(false);
  const [allAcceptance, setAllAcceptance] = useState<TypeAcceptance[]>();

  // Параметры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
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
      render: ((stock: TypeStock) =>
        stock !== null ? (<div key={stock.id}>{stock.id}</div>) : null)
    },
    {
      title: 'Товар',
      dataIndex: ['stock', 'product'],
      key: 'product',
      render: ((product: TypeProduct) =>
        product !== null ? (<div key={product?.id}>{product?.title}</div>) : null)
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
      render: ((purchase: TypePurchase) =>
        purchase !== null ? (<div key={purchase.id}>{purchase.id}</div>) : null)
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
              onConfirm={() => onDelete && onDelete(id)}
              okText="Да"
              cancelText="Отмена"
            >
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{color: 'tomato', borderColor: 'tomato'}}
                ghost
              >
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ]

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для обновления таблицы приемок
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllAcceptance().then((allAcceptance) => {
      setAllAcceptance(allAcceptance);
      setIsLoading(false);
    });
  }, [])

  // Функция для поиска приёмки
  const handleSearchTable = useCallback((): void => {
    setIsLoading(true);
    getAllAcceptanceByTitle(searchText ?? '').then((allAcceptance) => {
      setAllAcceptance(allAcceptance);
      setIsLoading(false);
    });
  }, [searchText])

  useEffect(() => {
    if (searchText) {
      handleSearchTable();
    } else {
      handleUpdateTable();
    }
  }, [searchText, isUpdateTable, handleSearchTable, handleUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allAcceptance}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
      loading={isLoading}
      onChange={handleChangeTable}
    />
  );
};