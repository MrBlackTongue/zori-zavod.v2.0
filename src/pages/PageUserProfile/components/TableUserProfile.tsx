import React, {useState, useEffect, useCallback} from 'react';
import {Table, Typography} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import { getPaymentHistory} from "../../../services";
import {TableProps, TypePayment} from "../../../types";
import dayjs from "dayjs";

export const TableUserProfile: React.FC<TableProps> = ({
                                                      isUpdateTable,
                                                    }) => {
  const { Title } = Typography;

  // Лоудер и список всех платежей
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allPayment, setAllPayment] = useState<TypePayment[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypePayment> = [
    {
      title: 'Дата',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      defaultSortOrder: 'ascend',
      width: 400,
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</div>) : null),

    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
      render: ((cost: number | null) =>
        cost !== null ? (
          <div>
            {cost.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        ) : null)
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination((prevPagination) => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getPaymentHistory()
      .then((data) => {
        setAllPayment(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, [])

  useEffect(() => {
    handleUpdateTable()
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <div>
    <Title level={4}>История пополнений</Title>
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allPayment}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
    </div>
  );
}