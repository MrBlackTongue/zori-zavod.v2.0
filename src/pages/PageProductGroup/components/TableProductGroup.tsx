import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getProductGroupTree} from "../../../services";
import {TableProps, TableParam, TypeProductGroup} from "../../../types";

export const TableProductGroup: React.FC<TableProps<TypeProductGroup>> = ({
                                                                            isUpdateTable,
                                                                            openDrawer,
                                                                            onDelete,
                                                                          }) => {

  // Лоудер и список всех групп товаров
  const [loading, setLoading] = useState(false);
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeProductGroup> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      defaultSortOrder: 'ascend',
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
              title="Вы действительно хотите удалить эту группу товаров?"
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
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Рекурсивная функция для удаления пустых дочерних элементов
  const removeEmptyChildren = useCallback((productGroup: TypeProductGroup): TypeProductGroup => {
    if (productGroup.children && productGroup.children.length === 0) {
      const {children, ...rest} = productGroup;
      return rest;
    }
    if (productGroup.children) {
      return {...productGroup, children: productGroup.children.map(removeEmptyChildren)};
    }
    return productGroup;
  }, [])

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setLoading(true);
    getProductGroupTree().then((allProductGroup) => {
      const updatedProductGroup = allProductGroup.map(removeEmptyChildren);
      setAllProductGroup(updatedProductGroup);
      setLoading(false);
    })
  }, [removeEmptyChildren]);

  useEffect(() => {
    handleUpdateTable()
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allProductGroup}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
      loading={loading}
      onChange={handleChangeTable}
    />
  );
};