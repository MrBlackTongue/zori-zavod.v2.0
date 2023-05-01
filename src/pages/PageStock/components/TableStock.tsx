import React, {useState, useEffect} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig, SorterResult} from "antd/es/table/interface";
import {TableProps, TableParams, TypeUnit, TypeStock} from "../../../types";
import {getAllStock, deleteStockById, getStockByTitle, getStockByGroupId} from "../../../services";

export const TableStock: React.FC<TableProps<TypeStock>> = ({
                                                              isUpdateTable,
                                                              openDrawer,
                                                              searchText,
                                                              filter
                                                            }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех остатков
  const [loading, setLoading] = useState(false);
  const [allStock, setAllStock] = useState<TypeStock[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeStock> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.id ?? '') < (b.id ?? '') ? -1 : 1,
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      sorter: (a, b) => (a.product?.title ?? '') < (b.product?.title ?? '') ? -1 : 1,
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
              onClick={() => {
                openDrawer(id)
              }}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту ячейку на складе?"
              onConfirm={() => {
                deleteStockById(id).then(() => {
                  filterTable();
                  if (searchText || filter) {
                    searchTable();
                  } else {
                    updateTable();
                  }
                });
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
    sorter: SorterResult<TypeStock>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllStock([]);
    }
  };

  // Функция для обновления таблицы склада
  const updateTable = () => {
    setLoading(true);
    getAllStock().then((allStock) => {
      setAllStock(allStock);
      setLoading(false);
    });
  }


  // Функция для поиска по таблице склада
  const searchTable = () => {
    setLoading(true);
    getStockByTitle(searchText ?? "").then((allStock) => {
      setAllStock(allStock);
      setLoading(false);
    });
  }

  // Функция для фильтрации таблицы
  const filterTable = () => {
    console.log(filter?.idFilter)
    if (filter && filter.idFilter) {
      setLoading(true);
      getStockByGroupId(filter.idFilter).then((allStock) => {
        setAllStock(allStock);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (filter && filter.idFilter) {
      filterTable();
    } else if (searchText) {
      searchTable();
    } else {
      updateTable();
    }
  }, [searchText, filter, isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allStock}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};