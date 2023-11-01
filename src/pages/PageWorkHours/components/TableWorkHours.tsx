import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import {
  TransformedWorkHour,
  TableProps,
  TypeEmployee,
  TypeWorkDay,
  TypeWorkHour,
  TypeWorkHoursFilter,
} from '../../../types';
import dayjs from 'dayjs';
import { getAllWorkHours } from '../../../services';
// import { useFetchAllData } from '../../../hooks';

export const TableWorkHours: React.FC<TableProps<TypeWorkHoursFilter>> = ({
  filter,
}) => {
  // Spinner и список всех сотрудников и рабочих часов
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWorkHour, setAllWorkHour] = useState<TransformedWorkHour[]>([]);

  // Хук для получения данных
  // const { allEmployee } = useFetchAllData({ depsEmployee: true });

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Дата начала и конца недели
  const startDate = (filter?.selectedDate ?? dayjs()).startOf('week');

  const days: dayjs.Dayjs[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(startDate.add(i, 'day'));
  }

  // Функция трансформации данных с сервера
  const transformData = (data: TypeWorkHour) => {
    const { rows } = data;
    return Object.values(rows).map(row => {
      const { employee, days } = row;
      const transformedDays = Object.values(days).reduce(
        (acc, day) => {
          acc[day.date] = day;
          return acc;
        },
        {} as Record<string, TypeWorkDay>,
      );
      return {
        employee,
        ...transformedDays,
      };
    });
  };

  //Функция для вычисления итоговых часов
  const calculateTotalHours = (workHour: TransformedWorkHour): number => {
    let total = 0;
    Object.keys(workHour).forEach(key => {
      if (key !== 'employee' && workHour[key] instanceof Object) {
        const day = workHour[key] as TypeWorkDay;
        total += day.hours;
      }
    });
    return total;
  };

  // Колонки для сотрудников и итогов
  const baseColumns: ColumnsType<any> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
      render: (employee: TypeEmployee) =>
        `${employee.lastName} ${employee.firstName}`,
      // ... остальные свойства
    },
  ];

  // Колонки для дней недели
  const daysColumns: ColumnsType<TypeWorkDay> = days.map(day => {
    const dateFormat = day.format('YYYY-MM-DD');
    return {
      title: `${day.format('dd')}\n${day.format('DD.MM')}`,
      dataIndex: dateFormat,
      key: dateFormat,
      render: (dayData: TypeWorkDay) => (dayData ? `${dayData.hours}ч` : ''),
      // ... остальные свойства
    };
  });

  const totalColumn: ColumnsType<any> = [
    {
      title: 'Итого',
      dataIndex: 'total',
      key: 'total',
      render: (text: any, record: TransformedWorkHour) => {
        return `${calculateTotalHours(record)}ч`;
      },
    },
  ];

  // Объединение всех колонок
  const columns = [...baseColumns, ...daysColumns, ...totalColumn];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    if (filter) {
      setIsLoading(true);
      getAllWorkHours(
        dayjs(filter?.startDate).format('YYYY-MM-DD'),
        dayjs(filter?.endDate).format('YYYY-MM-DD'),
      )
        .then(data => {
          const transformedData = transformData(data);
          console.log('transformedData', transformedData);
          setAllWorkHour(transformedData);
          setIsLoading(false);
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [filter]);

  useEffect(() => {
    handleUpdateTable();
  }, [handleUpdateTable, filter]);

  return (
    <>
      <Table
        rowKey="id"
        bordered
        columns={columns}
        dataSource={allWorkHour}
        loading={isLoading}
        onChange={handleChangeTable}
        pagination={{
          ...pagination,
          position: ['bottomCenter'],
          totalBoundaryShowSizeChanger: 10,
        }}
      />
      <Button type="primary" icon={<PlusOutlined />}>
        Добавить
      </Button>
    </>
  );
};
