import React, {useState, useEffect} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig, SorterResult} from "antd/es/table/interface";
import {ItemTableProps, PurchaseType, TableParams, UnitTypes} from "../../types";
import {deletePurchaseById, getAllPurchases, getPurchaseByTitle} from "../../services";
import dayjs from "dayjs";

export const TablePurchases: React.FC<ItemTableProps<PurchaseType>> = ({
                                                                         isUpdateTable,
                                                                         openDrawer,
                                                                         searchText,
                                                                       }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех закупок
  const [loading, setLoading] = useState(false);
  const [allPurchases, setAllPurchases] = useState<PurchaseType[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<PurchaseType> = [
    {
      title: 'Идентификатор',
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
      render: ((unit: UnitTypes) =>
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
      render: ((id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                openDrawer(id)
              }}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              title="Вы действительно хотите удалить эту закупку?"
              onConfirm={() => {
                deletePurchaseById(id).then(() => {
                  getAllPurchases().then((allPurchases) => setAllPurchases(allPurchases))
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
  ];

  // Параметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<PurchaseType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllPurchases([]);
    }
  };

  // Функция для обновления таблицы закупок
  const updateTable = () => {
    setLoading(true);
    getAllPurchases().then((allPurchases) => {
      setAllPurchases(allPurchases);
      setLoading(false);
    });
  }

  // Функция для поиска по таблице закупок
  const searchTable = () => {
    setLoading(true);
    getPurchaseByTitle(searchText ?? '').then((allPurchases) => {
      setAllPurchases(allPurchases);
      setLoading(false);
    });
  }

  // Обновление таблицы покупок
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);

  // Поиск по таблице закупок
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
      dataSource={allPurchases}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};