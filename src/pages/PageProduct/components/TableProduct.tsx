import React, {useEffect, useState} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult, ColumnFilterItem} from 'antd/es/table/interface';
import {getAllProduct, deleteProductById, getProductByTitle, getAllProductGroup,} from "../../../services";
import {TableProps, TypeProduct, TableParams} from "../../../types";

export const TableProduct: React.FC<TableProps<TypeProduct>> = ({
                                                                  isUpdateTable,
                                                                  openDrawer,
                                                                  searchText
                                                                }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех товаров
  const [loading, setLoading] = useState(false);
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();

  // Все товарные группы
  const [allProductGroup, setAllProductGroup] = useState<TypeProduct[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
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
      render: ((unit: any) =>
        unit !== null ? (<div key={unit.id}> {unit.name}</div>) : null),
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
      render: ((productGroup: any) => productGroup !== null ? (
        <div key={productGroup.id}> {productGroup.title}</div>) : null),
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
              onClick={() => openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этот товар?"
              onConfirm={() => {
                deleteProductById(id).then(() => {
                  getAllProduct().then((allProducts) => setAllProduct(allProducts))
                })
              }}
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
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TypeProduct>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProduct(allProduct);
    }
  };

  // Функция для обновления таблицы товаров
  const updateTable = () => {
    setLoading(true);
    getAllProduct().then((allProducts) => {
      setAllProduct(allProducts);
      setLoading(false);
    });
  }

  // Функция для поиска по таблице товаров
  const searchTable = () => {
    setLoading(true);
    getProductByTitle(searchText ?? '').then((allProducts) => {
      setAllProduct(allProducts);
      setLoading(false);
    });
  }

  useEffect(() => {
    getAllProductGroup().then((productGroups) => {
      setAllProductGroup(productGroups);
    });
  }, []);

  useEffect(() => {
    if (searchText) {
      searchTable();
    } else {
      updateTable();
    }
  }, [searchText, isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allProduct}
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