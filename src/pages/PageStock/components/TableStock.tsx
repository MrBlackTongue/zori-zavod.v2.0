import React, {useState, useEffect, useCallback} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {TableProps, TableParam, TypeUnit, TypeStock, TypeStockFilter, TypeProduct} from "../../../types";
import {getAllStock, getAllStockByTitle, getAllStockByFilter} from "../../../services";

export const TableStock: React.FC<TableProps<TypeStockFilter>> = ({
                                                                    isUpdateTable,
                                                                    openDrawer,
                                                                    onDelete,
                                                                    searchText,
                                                                    filter,
                                                                  }) => {
  // Лоудер и список всех остатков
  const [isLoading, setIsLoading] = useState(false);
  const [allStock, setAllStock] = useState<TypeStock[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
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
      key: 'idStock',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.id ?? '') < (b.id ?? '') ? -1 : 1,
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      sorter: (a, b) => (a.product?.title ?? '') < (b.product?.title ?? '') ? -1 : 1,
      render: ((product: TypeProduct) =>
        product !== null ? (<div>{product.title}</div>) : null)
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
        unit !== null ? (<div>{unit.name}</div>) : null)
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
                style={{color: "tomato", borderColor: "tomato"}}
                ghost
              >
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для обновления таблицы склада
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllStock().then((allStock) => {
      setAllStock(allStock.map((item, index) => ({...item, key: index})));
      setIsLoading(false);
    });
  }, []);

  // Функция для поиска по таблице склада
  const handleSearchTable = useCallback((): void => {
    setIsLoading(true);
    getAllStockByTitle(searchText || "").then((allStock) => {
      setAllStock(allStock.map((item, index) => ({...item, key: index})));
      setIsLoading(false);
    });
  }, [searchText]);

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter?.id) {
      setIsLoading(true);
      getAllStockByFilter(filter.id).then((allStock) => {
        if (allStock) {
          setAllStock(allStock.map((item, index) => ({...item, key: index})));
          setIsLoading(false);
        }
      });
    }
  }, [filter]);

  useEffect(() => {
    if (filter?.id) {
      handleFilterTable();
    } else if (searchText) {
      handleSearchTable();
    } else {
      handleUpdateTable();
    }
  }, [searchText, filter, isUpdateTable, handleFilterTable, handleSearchTable, handleUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allStock}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
      loading={isLoading}
      onChange={handleChangeTable}
    />
  );
};