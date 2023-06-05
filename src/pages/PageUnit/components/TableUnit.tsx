import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllUnit} from "../../../services";
import {TableProps, TypeUnit, TableParam} from "../../../types";

export const TableUnit: React.FC<TableProps> = ({
                                                  isUpdateTable,
                                                  openDrawer,
                                                  onDelete,
                                                }) => {
  // Лоудер и список всех единиц измерения
  const [isLoading, setIsLoading] = useState(false);
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
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
      sorter: (a, b) => (a.name ?? '') < (b.name ?? '') ? -1 : 1,
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
              title="Вы действительно хотите удалить эту единицу измерения?"
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

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit.map((item, index) => ({...item, key: index})));
      setIsLoading(false);
    });
  }, [])

  useEffect(() => {
    handleUpdateTable()
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allUnit}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
      loading={isLoading}
      onChange={handleChangeTable}
    />
  );
};