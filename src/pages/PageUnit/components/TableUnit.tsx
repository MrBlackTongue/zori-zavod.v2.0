import React, {useEffect, useState} from 'react';
import {
  Space,
  Button,
  Table,
  Tooltip,
  Popconfirm,
} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {getAllUnits, deleteUnitById} from "../../../services";
import {TableProps, TypeUnit, TableParams} from "../../../types";

export const TableUnit: React.FC<TableProps<TypeUnit>> = ({
                                                            isUpdateTable,
                                                            openDrawer,
                                                          }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех единиц измерения
  const [loading, setLoading] = useState(false);
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeUnit> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name < b.name ? -1 : 1,
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
              placement="topRight"
              title="Вы действительно хотите удалить эту единицу измерения?"
              onConfirm={() => {
                deleteUnitById(id).then(() => {
                  getAllUnits().then((allUnits) => setAllUnit(allUnits))
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
    sorter: SorterResult<TypeUnit>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllUnit([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllUnits().then((allUnits) => {
      setAllUnit(allUnits);
      setLoading(false);
    });
  }, [!isUpdateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allUnit}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};