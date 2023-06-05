import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllOutput} from "../../../services";
import {TableProps, TypeOutput, TableParam, TypeProduct} from "../../../types";
import dayjs from 'dayjs';

export const TableOutput: React.FC<TableProps> = ({
                                                    isUpdateTable,
                                                    openDrawer,
                                                    onDelete,
                                                  }) => {
  // Лоудер и список всех единиц измерения
  const [isLoading, setIsLoading] = useState(false);
  const [allOutput, setAllOutput] = useState<TypeOutput[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOutput> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: ((product: TypeProduct) =>
        product !== null ? (<div key={product.id}>{product.title}</div>) : null)
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
              title="Вы действительно хотите удалить этот выпуск продукции?"
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
    getAllOutput().then((allOutputs) => {
      setAllOutput(allOutputs);
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
      dataSource={allOutput}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
      loading={isLoading}
      onChange={handleChangeTable}
    />
  );
};