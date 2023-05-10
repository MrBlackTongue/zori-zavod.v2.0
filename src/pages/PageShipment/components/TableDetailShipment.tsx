import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Space, Table, Tooltip,} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {deleteShipmentProductMovementById, getAllProductMovementByShipmentId} from "../../../services";
import {TableProps, TypeShipment, TypeStock, TypeShipmentProductMovement} from "../../../types";
import dayjs from 'dayjs';
import {DeleteOutlined} from "@ant-design/icons";

export const TableDetailShipment: React.FC<TableProps<TypeShipment>> = ({
                                                                          isUpdateTable,
                                                                          idDetail
                                                                        }) => {
  // Состояния для лоадера и списка всех товаров в отгрузке
  const [loading, setLoading] = useState(false);
  const [allShipmentMovement, setAllShipmentMovement] = useState<TypeShipmentProductMovement[]>();

  // Функция получения всех движений товаров отгрузки
  const getAllProductMovement = () => {
    setLoading(true);
    if (idDetail) {
      getAllProductMovementByShipmentId(idDetail).then((allShipmentMovement) => {
        setAllShipmentMovement(allShipmentMovement);
        setLoading(false);
      });
    }
  };

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
      sorter: (a, b) => (a.amount ?? '') < (b.amount ?? '') ? -1 : 1,
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
              title="Вы действительно хотите удалить этот товар?"
              onConfirm={() => {
                deleteShipmentProductMovementById(id).then(() => {
                  if (idDetail)
                    getAllProductMovementByShipmentId(idDetail)
                      .then((allShipmentMovement) => setAllShipmentMovement(allShipmentMovement))
                })
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

  // Получение данных по всем товарам в отгрузке
  useEffect(() => {
    getAllProductMovement()
  }, [idDetail, isUpdateTable]);

  return (
    <Table
      bordered
      size={"small"}
      columns={columns}
      dataSource={allShipmentMovement}
      pagination={false}
      loading={loading}
    />
  );
};