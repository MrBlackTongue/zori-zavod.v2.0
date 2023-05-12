import React, {useState, useEffect} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllProductGroup, deleteProductGroupById} from "../../../services";
import {TableProps, TypeProductGroup, TableParams, TypeProductGroupTree} from "../../../types";
import type { TableRowSelection } from 'antd/es/table/interface';

export const TableProductGroup: React.FC<TableProps<TypeProductGroupTree>> = ({
                                                                            isUpdateTable,
                                                                            openDrawer,
                                                                          }) => {
  type TablePaginationPosition = 'bottomCenter';

  // Лоудер и список всех групп товаров
  const [loading, setLoading] = useState(false);
  const [allProductGroup, setAllProductGroup] = useState<TypeProductGroupTree[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeProductGroupTree> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      defaultSortOrder: 'ascend',
     // sorter: (a, b) => a.title < b.title ? -1 : 1,
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
                deleteProductGroupById(id).then(() => {
                  getAllProductGroup().then((allProductGroup) =>
                    setAllProductGroup(allProductGroup));
                });
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

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<TypeProductGroupTree> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  // Функция для обновления таблицы
  const updateTable = () => {
    setLoading(true);
    getAllProductGroup().then((allProductGroup) => {
      setAllProductGroup(allProductGroup);
      setLoading(false);
    });
  }

  useEffect(() => {
    updateTable()
  }, [isUpdateTable]);

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
      rowSelection={{ ...rowSelection }}
    />
  );
};