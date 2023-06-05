import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllOperation} from "../../../services";
import {TableProps, TypeOperation, TableParam, TypeUnit} from "../../../types";

export const TableOperation: React.FC<TableProps> = ({
                                                       isUpdateTable,
                                                       openDrawer,
                                                       onDelete,
                                                     }) => {
  // Лоудер и список всех операций
  const [isLoading, setIsLoading] = useState(false);
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOperation> = [
    {
      title: 'Операция',
      dataIndex: 'title',
      key: 'title',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => (a.title ?? '') < (b.title ?? '') ? -1 : 1,
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
      render: ((unit: TypeUnit) =>
        unit !== null ? (<div> {unit.name}</div>) : null),
    },
    {
      title: 'Норма',
      dataIndex: 'rate',
      key: 'rate',
      sorter: (a, b) => (a.rate ?? 0) < (b.rate ?? 0) ? -1 : 1,
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
              title="Вы действительно хотите удалить эту операцию?"
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
    getAllOperation().then((allOperation) => {
      setAllOperation(allOperation.map((item, index) => ({ ...item, key: index })));
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
      dataSource={allOperation}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
      loading={isLoading}
      onChange={handleChangeTable}
    />
  );
};