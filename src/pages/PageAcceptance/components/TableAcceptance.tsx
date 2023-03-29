import React, {useEffect, useState} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {getAllAcceptances, deleteAcceptanceById, getAcceptanceByTitle} from "../../../services";
import {TableProps, AcceptanceType, TableParams, UnitType, PurchaseType} from "../../../types/_index";
import dayjs from "dayjs";
import {SorterResult} from "antd/es/table/interface";

export const TableAcceptance: React.FC<TableProps<AcceptanceType>> = ({
                                                                        isUpdateTable,
                                                                        openDrawer,
                                                                        searchText
                                                                      }) => {
  type TablePaginationPosition = "bottomCenter"

  // Лоудер и список всех приемок
  const [loading, setLoading] = useState(false);
  const [allAcceptances, setAllAcceptances] = useState<AcceptanceType[]>();

  // Параметры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<AcceptanceType> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'ID на складе',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: ((product: any) =>
        product !== null ? (<div key={product.id}>{product.title}</div>) : null)
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Ед. изм',
      dataIndex: ['product', 'unit'],
      key: 'unit',
      render: ((unit: UnitType) =>
        unit !== null ? (<div key={unit.id}>{unit.name}</div>) : null)
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: ((id: number) => (
        <Space>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту приемку?"
              onConfirm={() => {
                deleteAcceptanceById(id).then(() => {
                  getAllAcceptances().then((allAcceptances) => setAllAcceptances(allAcceptances))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost onClick={() => {
              }}>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ]

  // Параметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<PurchaseType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllAcceptances([]);
    }
  };

  // Функция для обновления таблицы приемок
  const updateTable = () => {
    setLoading(true);
    getAllAcceptances().then((allAcceptances) => {
      setAllAcceptances(allAcceptances);
      setLoading(false);
    });
  }

  // Обновление таблицы приемок
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allAcceptances}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};