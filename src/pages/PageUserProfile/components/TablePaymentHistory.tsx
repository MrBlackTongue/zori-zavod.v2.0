import React, {useState, useEffect, useCallback} from 'react';
import {Button, Table, Typography} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {getPaymentHistory} from "../../../services";
import {StatusMappingType, TableProps, TypePayment} from "../../../types";
import dayjs from "dayjs";
import {SyncOutlined} from "@ant-design/icons";

export const TablePaymentHistory: React.FC<TableProps> = ({
                                                            isUpdateTable,
                                                          }) => {
  const {Title} = Typography;



  // Лоудер и список всех платежей
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allPayment, setAllPayment] = useState<TypePayment[]>();


  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const statusMapping: StatusMappingType = {
    "succeeded": "Подтверждён",
    "pending": "В ожидании",
    "canceled": "Отменён",
    "waiting_for_capture": "Ожидает списания",
  };

  // Колонки в таблице
  const columns: ColumnsType<TypePayment> = [
    {
      title: 'Дата',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      width: 250,
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</div>) : null),

    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
      width: 200,
      render: ((cost: number | null) =>
        cost !== null ? (
          <div>
            {cost.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 0,
            })}
          </div>
        ) : null)
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (status: string) => statusMapping[status] || status
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
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <Title level={4}>История пополнений</Title>
        <Button
          type="dashed"
          icon={<SyncOutlined/>}
          className='greenButton'
          onClick={handleUpdateTable}
        >
          Обновить
        </Button>
      </div>
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