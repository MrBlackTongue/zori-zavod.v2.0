import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {ColumnFilterItem} from 'antd/es/table/interface';
import {getAllProduct, getAllProductByTitle, getAllProductGroup,} from "../../../services";
import {TableProps, TypeProduct, TableParam} from "../../../types";

export const TableProduct: React.FC<TableProps> = ({
                                                     isUpdateTable,
                                                     openDrawer,
                                                     onDelete,
                                                     searchText
                                                   }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех товаров
  const [isLoading, setIsLoading] = useState(false);
  const [allProduct, setAllProduct] = useState<TypeProduct[]>();

  // Все товарные группы
  const [allProductGroup, setAllProductGroup] = useState<TypeProduct[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParam>({
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
              onClick={() => openDrawer && openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этот товар?"
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

  // Функция для обновления таблицы товаров
  const updateTable = () => {
    setIsLoading(true);
    getAllProduct().then((allProducts) => {
      setAllProduct(allProducts);
      setIsLoading(false);
    });
  }

  // Функция для поиска по таблице товаров
  const searchTable = useCallback(() => {
    setIsLoading(true);
    getAllProductByTitle(searchText ?? '').then((allProducts) => {
      setAllProduct(allProducts);
      setIsLoading(false);
    });
  }, [searchText]);

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
  }, [searchText, isUpdateTable, searchTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allProduct}
      pagination={{...tableParams.pagination, position: [bottom]}}
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
};