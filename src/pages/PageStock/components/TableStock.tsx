import React, {useState, useEffect, useCallback} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig, SorterResult} from "antd/es/table/interface";
import {TableProps, TableParams, TypeUnit, TypeStock} from "../../../types";
import {getAllStock, getAllStockByTitle, getStockByGroupId} from "../../../services";

export const TableStock: React.FC<TableProps<TypeStock>> = ({
                                                              isUpdateTable,
                                                              openDrawer,
                                                              onDelete,
                                                              searchText,
                                                              filter2
                                                            }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех остатков
  const [isLoading, setIsLoading] = useState(false);
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
              onClick={() => (openDrawer && openDrawer(id))}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту ячейку на складе?"
              onConfirm={() => (onDelete && onDelete(id))}
              okText="Да"
              cancelText="Отмена"
            >
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{ color: "tomato", borderColor: "tomato" }}
                ghost
              >
                <DeleteOutlined />
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
    setIsLoading(true);
    getAllStock().then((allStock) => {
      setAllStock(allStock);
      setIsLoading(false);
    });
  }, [isUpdateTable]);

  // Функция для поиска по таблице склада
  const searchTable = useCallback(() => {
    setIsLoading(true);
    getAllStockByTitle(searchText || "").then((allStock) => {
      setAllStock(allStock);
      setIsLoading(false);
    });
  }, [searchText]);

  // Функция для фильтрации таблицы
  const filterTable = useCallback(() => {
    if (filter2 && filter2.idFilter) {
      setIsLoading(true);
      getStockByGroupId(filter2.idFilter).then((allStock) => {
        setAllStock(allStock);
        setIsLoading(false);
      });
    }
  }, [filter2]);

  useEffect(() => {
    if (filter2 && filter2.idFilter) {
      filterTable();
    } else if (searchText) {
      searchTable();
    } else {
      updateTable();
    }
  }, [searchText, filter2, isUpdateTable, filterTable, searchTable, updateTable]);

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
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
};