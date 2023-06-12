import React, {useState, useEffect, useCallback} from 'react';
import {Button, Popconfirm, Space, Table, Tooltip,} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import type {ColumnsType} from 'antd/es/table';
import {getAllProductMovementByShipmentId} from "../../../services";
import {TableProps, TypeStock, TypeShipmentProductMovement} from "../../../types";
import dayjs from 'dayjs';

export const TableDetailShipment: React.FC<TableProps> = ({
                                                            isUpdateTable,
                                                            idDetail,
                                                            onDelete,
                                                          }) => {
  // Лоудер и списка всех товаров в отгрузке
  const [isLoading, setIsLoading] = useState(false);
  const [allShipmentMovement, setAllShipmentMovement] = useState<TypeShipmentProductMovement[]>();

  // Колонки в таблице
  const columns: ColumnsType<TypeShipmentProductMovement> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'ID ячейки склада',
      dataIndex: 'stock',
      key: 'stockId',
      render: (stock: TypeStock) => stock?.id,
    },
    {
      title: 'Товар',
      dataIndex: 'stock',
      key: 'productTitle',
      render: (stock: TypeStock) => stock?.product?.title,
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) =>
        (a.amount ?? '') < (b.amount ?? '') ? -1 : 1,
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
              title="Вы действительно хотите удалить этот отгруженный товар?"
              onConfirm={() => onDelete?.(id)}
              okText="Да"
              cancelText="Отмена"
            >
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

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    if (idDetail) {
      getAllProductMovementByShipmentId(idDetail).then((data) => {
        setAllShipmentMovement(data)
        setIsLoading(false);
      });
    }
  }, [idDetail])

  useEffect(() => {
    handleUpdateTable()
  }, [handleUpdateTable, isUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      size={"small"}
      columns={columns}
      dataSource={allShipmentMovement}
      pagination={false}
      loading={isLoading}
    />
  );
};