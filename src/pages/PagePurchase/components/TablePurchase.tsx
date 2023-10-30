import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type {
  ColumnsType,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import {
  TableProps,
  TypeProduct,
  TypePurchase,
  TypeUnit,
} from '../../../types';
import { getAllPurchase, getAllPurchaseByTitle } from '../../../services';
import dayjs from 'dayjs';
import { renderAsRuble, renderNumber } from '../../../utils';
import { CustomPopover } from '../../../components/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../components/CustomPopover/ContentPopover';

export const TablePurchase: React.FC<TableProps> = ({
  isUpdateTable,
  openDrawer,
  onDelete,
  searchText,
}) => {
  // Spinner и список всех закупок
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allPurchase, setAllPurchase] = useState<TypePurchase[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypePurchase> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'idPurchase',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: any) =>
        date !== null ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (product: TypeProduct) =>
        product !== null ? <div>{product.title}</div> : null,
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      render: renderNumber,
      showSorterTooltip: false,
      sorter: (a, b) => ((a.amount ?? '') < (b.amount ?? '') ? -1 : 1),
    },
    {
      title: 'Ед. изм',
      dataIndex: ['product', 'unit'],
      key: 'unit',
      render: (unit: TypeUnit) =>
        unit !== null ? <div>{unit.name}</div> : null,
    },
    {
      title: 'Цена за единицу',
      dataIndex: 'cost',
      key: 'cost',
      showSorterTooltip: false,
      sorter: (a, b) => ((a.cost ?? 0) < (b.cost ?? 0) ? -1 : 1),
      render: renderAsRuble,
    },
    {
      title: 'Стоимость закупки',
      key: 'totalCost',
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.cost ?? 0) * (a.amount ?? 0) < (b.cost ?? 0) * (b.amount ?? 0)
          ? -1
          : 1,
      render: (record: any) =>
        record.cost !== null && record.amount !== null ? (
          <div>
            {`${(record.cost * record.amount).toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </div>
        ) : null,
    },
    {
      title: 'Статус оплаты',
      key: 'paid',
      showSorterTooltip: false,
      sorter: (a, b) => Number(a.paid) - Number(b.paid),
      render: (record: TypePurchase) => (
        <Tag color={record.paid ? 'green' : 'volcano'}>
          {record.paid ? 'Оплачено' : 'Не оплачено'}
        </Tag>
      ),
    },
    {
      title: (
        <>
          Действия
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                {ACTIONS_OVERVIEW_CONTENT}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_EDIT}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_DELETE}
              </p>
            }
          />
        </>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'center',
      render: (id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer?.(id)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту закупку?"
              onConfirm={() => onDelete?.(id)}
              okText="Да"
              cancelText="Отмена">
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{ color: 'tomato', borderColor: 'tomato' }}
                ghost>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы закупок
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllPurchase()
      .then(data => {
        setAllPurchase(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  // Функция для поиска по таблице закупок
  const handleSearchTable = useCallback((): void => {
    setIsLoading(true);
    getAllPurchaseByTitle(searchText ?? '')
      .then(data => {
        setAllPurchase(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, [searchText]);

  useEffect(() => {
    if (searchText) {
      handleSearchTable();
    } else {
      handleUpdateTable();
    }
  }, [searchText, isUpdateTable, handleSearchTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={allPurchase}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
      rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
    />
  );
};
