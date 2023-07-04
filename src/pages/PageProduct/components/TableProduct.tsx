import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {ColumnFilterItem} from 'antd/es/table/interface';
import {getAllProduct, getAllProductByTitle} from "../../../services";
import {TableProps, TypeProduct, TypeUnit, TypeProductGroup} from "../../../types";
import {useFetchAllData} from "../../../hooks";

export const TableProduct: React.FC<TableProps> = ({
                                                     isUpdateTable,
                                                     openDrawer,
                                                     onDelete,
                                                     searchText,
                                                   }) => {
  // Лоудер и список всех товаров
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();

  // Хук для получения данных
  const {allProductGroup} = useFetchAllData({depsProductGroup: true});

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeProduct> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => (a.title ?? '') < (b.title ?? '') ? -1 : 1,
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
      width: 200,
      render: ((unit: TypeUnit) =>
        unit !== null ? (<div> {unit.name}</div>) : null),
    },
    {
      title: 'Товарная группа',
      dataIndex: 'productGroup',
      key: 'productGroup',
      filters: allProductGroup?.map((productGroup): ColumnFilterItem => ({
        text: productGroup.title,
        value: productGroup.title!
      })),
      onFilter: (value, record) => record.productGroup?.title === value,
      render: ((productGroup: TypeProductGroup) => productGroup !== null ? (
        <div> {productGroup.title}</div>) : null),
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
              title="Вы действительно хотите удалить этот товар?"
              onConfirm={() => onDelete?.(id)}
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
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination((prevPagination) => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы товаров
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllProduct()
      .then((data) => {
        setAllProduct(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error))
  }, [])

  // Функция для поиска по таблице товаров
  const handleSearchTable = useCallback((): void => {
    setIsLoading(true);
    getAllProductByTitle(searchText ?? '')
      .then((data) => {
        setAllProduct(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error))
  }, [searchText]);

  useEffect(() => {
    if (searchText) {
      handleSearchTable();
    } else {
      handleUpdateTable();
    }
  }, [searchText, isUpdateTable, handleUpdateTable, handleSearchTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allProduct}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};