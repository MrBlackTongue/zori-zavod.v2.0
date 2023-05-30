import React, {useState, useEffect, useCallback} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {TableProps, TypePurchase, TableParam, TypeUnit} from "../../../types";
import {getAllPurchase, getAllPurchaseByTitle} from "../../../services";
import dayjs from "dayjs";

export const TablePurchase: React.FC<TableProps> = ({
                                                      isUpdateTable,
                                                      openDrawer,
                                                      onDelete,
                                                      searchText,
                                                    }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех закупок
  const [isLoading, setIsLoading] = useState(false);
  const [allPurchase, setAllPurchase] = useState<TypePurchase[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypePurchase> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: ((product: any) =>
        product !== null ? (<div key={product.id}>{product.title}</div>) : null)
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => (a.amount ?? '') < (b.amount ?? '') ? -1 : 1,
      render: ((amount: number | null) =>
        amount !== null ? (
          <div>
            {amount.toLocaleString('ru-RU', {
              currency: 'RUB',
              maximumFractionDigits: 2,
            })}
          </div>
        ) : null)
    },
    {
      title: 'Ед. изм',
      dataIndex: ['product', 'unit'],
      key: 'unit',
      render: ((unit: TypeUnit) =>
        unit !== null ? (<div key={unit.id}>{unit.name}</div>) : null)
    },
    {
      title: 'Цена за единицу',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a, b) => (a.cost ?? 0) < (b.cost ?? 0) ? -1 : 1,
      render: ((cost: number | null) =>
        cost !== null ? (
          <div>
            {cost.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        ) : null)
    },
    {
      title: 'Стоимость закупки',
      key: 'totalCost',
      sorter: (a, b) => (a.cost ?? 0) * (a.amount ?? 0) < (b.cost ?? 0) * (b.amount ?? 0) ? -1 : 1,
      render: ((record: any) =>
          record.cost !== null && record.amount !== null ? (
            <div>
              {`${(record.cost * record.amount).toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            </div>
          ) : null
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer && openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту закупку?"
              onConfirm={() => onDelete && onDelete(id)}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

  // Параметры изменения таблицы
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({pagination});
  };

  // Функция для обновления таблицы закупок
  const updateTable = useCallback(() => {
    setIsLoading(true);
    getAllPurchase().then((allPurchases) => {
      setAllPurchase(allPurchases);
      setIsLoading(false);
    });
  }, [])

  // Функция для поиска по таблице закупок
  const searchTable = useCallback(() => {
    setIsLoading(true);
    getAllPurchaseByTitle(searchText ?? '').then((allPurchases) => {
      setAllPurchase(allPurchases);
      setIsLoading(false);
    });
  }, [searchText])

  useEffect(() => {
    if (searchText) {
      searchTable();
    } else {
      updateTable();
    }
  }, [searchText, isUpdateTable, searchTable, updateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allPurchase}
      pagination={{...tableParams.pagination, position: [bottom]}}
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
};