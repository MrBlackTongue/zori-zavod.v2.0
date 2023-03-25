import React, {useEffect, useState} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult, ColumnFilterItem} from 'antd/es/table/interface';
import {getAllProducts, deleteProductById, getProductsByTitle, getAllProductGroups,} from "../../../services";
import {TableProps, ProductType, TableParams} from "../../../types/_index";

export const TableProduct: React.FC<TableProps<ProductType>> = ({
                                                                        isUpdateTable,
                                                                        openDrawer,
                                                                        searchText
                                                                      }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех товаров
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductType[]>();

  // Товарная группа
  const [productGroups, setProductGroups] = useState<ProductType[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<ProductType> = [
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
      render: ((unit: any) =>
        unit !== null ? (<div key={unit.id}> {unit.name}</div>) : null),
    },
    {
      title: 'Товарная группа',
      dataIndex: 'productGroup',
      key: 'productGroup',
      filters: productGroups?.map((productGroup): ColumnFilterItem => ({
        text: productGroup.title,
        value: productGroup.title!
      })),
      onFilter: (value, record) => record.productGroup?.title === value,
      render: ((productGroup: any) => productGroup !== null ? (
        <div key={productGroup.id}> {productGroup.title}</div>) : null),
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
              title="Вы действительно хотите удалить этот товар?"
              onConfirm={() => {
                deleteProductById(id).then(() => {
                  getAllProducts().then((allProducts) => setAllProducts(allProducts))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle" style={{color: 'tomato', borderColor: 'tomato'}} ghost
                      onClick={() => {
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
    sorter: SorterResult<ProductType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProducts([]);
    }
  };

  // Функция для обновления таблицы товаров
  const updateTable = () => {
    setLoading(true);
    getAllProducts().then((allProducts) => {
      setAllProducts(allProducts);
      setLoading(false);
    });
  }

  // Функция для поиска по таблице товаров
  const searchTable = () => {
    setLoading(true);
    getProductsByTitle(searchText ?? '').then((allProducts) => {
      setAllProducts(allProducts);
      setLoading(false);
    });
  }

  useEffect(() => {
    getAllProductGroups().then((productGroups) => {
      setProductGroups(productGroups);
    });
  }, []);

  // Обновление таблицы товаров
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);

  // Поиск по таблице товаров
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
      dataSource={allProducts}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};