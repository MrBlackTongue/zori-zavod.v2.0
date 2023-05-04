import React, {useState, useEffect, useCallback} from "react";
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
                if (openDrawer) {
                  openDrawer(id)
                }
              }}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту ячейку на складе?"
              onConfirm={async () => await handleDelete(id)}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost onClick={() => {}}>
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
      setAllStock(allStock);
    }
  };

  // Функция для обновления таблицы склада
  const updateTable = useCallback(() => {
    setLoading(true);
    getAllStock().then((allStock) => {
      setAllStock(allStock);
      setLoading(false);
    });
  }, []);

  // Функция для поиска по таблице склада
  const searchTable = useCallback(() => {
    setLoading(true);
    getStockByTitle(searchText || "").then((allStock) => {
      setAllStock(allStock);
      setLoading(false);
    });
  }, [searchText]);

  const handleDelete = async (id: number) => {
    try {
      await deleteStockById(id); // Удаляет ячейку
      if (searchText) {
        searchTable(); // Обновляет данные таблицы с учетом поиска
      } else if (filter && filter.idFilter) {
        filterTable(); // Обновляет данные таблицы с учетом фильтра
      } else {
        updateTable(); // Обновляет данные таблицы без учета поиска и фильтра
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Функция для фильтрации таблицы
  const filterTable = useCallback(() => {
    if (filter && filter.idFilter) {
      setLoading(true);
      getStockByGroupId(filter.idFilter).then((allStock) => {
        setAllStock(allStock);
        setLoading(false);
      });
    }
  }, [filter]);

  useEffect(() => {
    if (filter && filter.idFilter) {
      filterTable();
    } else if (searchText) {
      searchTable();
    } else {
      updateTable();
    }
  }, [searchText, filter, isUpdateTable, filterTable, searchTable, updateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allStock}
      pagination={{
        position: [bottom],
        current: tableParams?.pagination?.current,
        pageSize: tableParams?.pagination?.pageSize,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};