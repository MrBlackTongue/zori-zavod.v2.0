import React, {useState, useEffect, useCallback} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {TableProps, TypeUnit, TypeStock, TypeStockFilter, TypeProduct, TypeStoragePlace} from "../../../types";
import {getAllStock, getAllStockByTitle, getAllStockByFilter} from "../../../services";
import {renderNumber} from "../../../utils";

export const TableStock: React.FC<TableProps<TypeStockFilter>> = ({
                                                                    isUpdateTable,
                                                                    openDrawer,
                                                                    onDelete,
                                                                    searchText,
                                                                    filter,
                                                                  }) => {
  // Лоудер и список всех остатков
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allStock, setAllStock] = useState<TypeStock[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
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
      render: renderNumber,
      sorter: (a, b) => (a.amount ?? '') < (b.amount ?? '') ? -1 : 1,
    },
    {
      title: 'Ед. изм',
      dataIndex: ['product', 'unit'],
      key: 'unit',
      render: ((unit: TypeUnit) =>
        unit !== null ? (<div>{unit.name}</div>) : null)
    },
    {
      title: 'Место хранения',
      dataIndex: 'storagePlace',
      key: 'storagePlace',
      render: ((storagePlace: TypeStoragePlace) =>
        storagePlace !== null ? (<div>{storagePlace.title}</div>) : null)
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
              onClick={() => openDrawer?.(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту ячейку остатков?"
              onConfirm={() => onDelete?.(id)}
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
    setPagination((prevPagination) => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы склада
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllStock()
      .then((data) => {
        setAllStock(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, []);

  // Функция для поиска по таблице склада
  const handleSearchTable = useCallback((): void => {
    setIsLoading(true);
    getAllStockByTitle(searchText ?? "")
      .then((data) => {
        setAllStock(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, [searchText]);

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter?.id) {
      setIsLoading(true);
      getAllStockByFilter(filter?.id)
        .then((data) => {
          setAllStock(data);
          setIsLoading(false);
        })
        .catch((error) => console.error("Ошибка при получении данных: ", error));
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
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allStock}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10,}}
    />
  );
};