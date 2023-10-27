import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getAllWriteOffMovementByWriteOffId } from '../../../services';
import { TableProps, TypeStock, TypeWriteOffMovement } from '../../../types';
import dayjs from 'dayjs';
import { renderNumber } from '../../../utils';

export const TableDetailWriteOff: React.FC<TableProps> = ({
  isUpdateTable,
  idDetail,
  onDelete,
}) => {
  // Spinner и список всех движений списания товара
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWriteOffMovement, setAllWriteOffMovement] =
    useState<TypeWriteOffMovement[]>();

  // Колонки в таблице
  const columns: ColumnsType<TypeWriteOffMovement> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      width: 250,
      render: (date: any) =>
        date !== null ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
    },
    {
      title: 'Тип движения',
      dataIndex: 'income',
      key: 'income',
      width: 250,
      showSorterTooltip: false,
      render: income => (income ? 'Приход' : 'Расход'),
      sorter: (a, b) => ((a.income ?? false) < (b.income ?? false) ? -1 : 1),
    },
    {
      title: 'Товар',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: TypeStock) => stock?.product?.title,
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      width: 250,
      render: renderNumber,
      showSorterTooltip: false,
      sorter: (a, b) => ((a.amount ?? '') < (b.amount ?? '') ? -1 : 1),
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: (id: number) => (
        <Space>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить это движение списания товара?"
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

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    if (idDetail) {
      getAllWriteOffMovementByWriteOffId(idDetail)
        .then(data => {
          setAllWriteOffMovement(data);
          setIsLoading(false);
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [idDetail]);

  useEffect(() => {
    handleUpdateTable();
  }, [handleUpdateTable, isUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      size={'small'}
      columns={columns}
      dataSource={allWriteOffMovement}
      pagination={false}
      loading={isLoading}
      rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
    />
  );
};
