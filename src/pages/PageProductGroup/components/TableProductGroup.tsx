import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {deleteProductGroupById, getProductGroupTree} from "../../../services";
import {TableProps, TableParam, TypeProductGroup} from "../../../types";

export const TableProductGroup: React.FC<TableProps<TypeProductGroup>> = ({
                                                                                isUpdateTable,
                                                                                openDrawer,
                                                                              }) => {
  type TablePaginationPosition = 'bottomCenter';

  // Лоудер и список всех групп товаров
  const [loading, setLoading] = useState(false);
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroup[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
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
              onConfirm={() => {
                deleteProductGroupById(id).then(() => {updateTable()});
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
    sorter: SorterResult<TypeProductGroup>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProductGroup(allProductGroup);
    }
  };

  // Рекурсивная функция для удаления пустых дочерних элементов
  const removeEmptyChildren = useMemo(() => {
    const removeEmpty = (group: TypeProductGroup): TypeProductGroup => {
      if (group.children && group.children.length === 0) {
        const {children, ...rest} = group;
        return rest;
      }
      if (group.children) {
        return {...group, children: group.children.map(child => removeEmpty(child))};
      }
      return group;
    };
    return removeEmpty;
  }, []);

  // Функция для обновления таблицы
  const updateTable = useCallback(async () => {
    setLoading(true);
    const allProductGroup = await getProductGroupTree();
    const updatedProductGroup = allProductGroup.map(removeEmptyChildren);
    setAllProductGroup(updatedProductGroup);
    setLoading(false);
  }, [removeEmptyChildren]);

  useEffect(() => {
     updateTable();
  }, [isUpdateTable, updateTable]);


  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allProductGroup}
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