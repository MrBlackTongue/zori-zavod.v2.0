import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType} from 'antd/es/table';
import {
  TableProps,
  TypeProductionProductMovement,
  TypeUnit,
  TypeStock,
  TypeProduct
} from "../../../types";
import {getProductionProductMovementByIdOperationAccounting} from "../../../services";
import dayjs from "dayjs";

export const TableProductionProductMovement:
  React.FC<TableProps> = React.memo(({
                                       isUpdateTable,
                                       onDelete,
                                       idDetail,
                                     }) => {

  // Лоудер и все движение товара на производстве
  const [isLoading, setIsLoading] = useState(false);
  const [allProductionProductMovement, setAllProductionProductMovement] = useState<TypeProductionProductMovement[]>();

  // Колонки в таблице
  const columns: ColumnsType<TypeProductionProductMovement> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'ID на складе',
      dataIndex: 'stock',
      key: 'stock',
      defaultSortOrder: 'descend',
      sorter: (a, b) =>
        (a.stock?.id ?? 0) < (b.stock?.id ?? 0) ? -1 : 1,
      render: ((stock: TypeStock) =>
        stock !== null ? (<div>{stock.id}</div>) : null)
    },
    {
      title: 'Товар',
      dataIndex: ['stock', 'product'],
      key: 'product',
      render: ((product: TypeProduct) =>
        product !== null ? (<div>{product.title}</div>) : null)
    },
    {
      title: 'Тип движения',
      dataIndex: 'income',
      key: 'income',
      render: ((income) => income ? 'Приход' : 'Расход'),
      sorter: (a, b) =>
        (a.income ?? false) < (b.income ?? false) ? -1 : 1,
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Ед. изм',
      dataIndex: ['stock', 'product', 'unit'],
      key: 'unit',
      render: ((unit: TypeUnit) =>
        unit !== null ? (<div>{unit.name}</div>) : null)
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить это движение товара на производстве?"
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

  // Обновить таблицу
  const handleUpdateTable = useCallback(() => {
    if (idDetail) {
      setIsLoading(true);
      getProductionProductMovementByIdOperationAccounting(idDetail).then((data) => {
        setAllProductionProductMovement(data);
        setIsLoading(false);
      });
    }
  }, [idDetail]);

  useEffect(() => {
    handleUpdateTable();
  }, [idDetail, isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allProductionProductMovement}
      pagination={false}
      loading={isLoading}
      size="small"
    />
  );
})