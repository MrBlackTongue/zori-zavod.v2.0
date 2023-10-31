import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputRef, Select, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
// import type { FormInstance } from 'antd/es/form';
import { PlusOutlined } from '@ant-design/icons';
// import { RefSelectProps } from 'antd/lib/select';
import {
  //   EditableRowProps,
  //   Item,
  TransformedWorkHour,
  TableProps,
  TypeEmployee,
  TypeWorkDay,
  TypeWorkHour,
  TypeWorkHoursFilter,
  //   TypeWorkHoursRow,
} from '../../../types';
import dayjs from 'dayjs';
import { getAllWorkHours } from '../../../services';
// import { useFetchAllData, useFormSelect } from '../../../hooks';
// import { EditableCell } from './EditableCell';
// import { EditableRow } from './EditableRow';

export const TableWorkHours: React.FC<TableProps<TypeWorkHoursFilter>> = ({
  filter,
}) => {
  //   interface CustomColumnType<T> extends ColumnsType<T> {
  //     editable?: boolean;
  //   }

  //   const [form] = Form.useForm();

  // Spinner и список всех сотрудников и рабочих часов
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWorkHour, setAllWorkHour] = useState<TransformedWorkHour[]>([]);

  // Хук для получения данных
  //   const { allEmployee } = useFetchAllData({ depsEmployee: true });

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Дата начала и конца недели
  const startDate = (filter?.selectedDate || dayjs()).startOf('week');

  const days: dayjs.Dayjs[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(startDate.add(i, 'day'));
  }

  //   const daysColumns: ColumnsType<Item> = days.map(day => ({
  //     title: `${day.format('dd')}\n${day.format('DD.MM')}`,
  //     dataIndex: day.format('DD.MM'),
  //     width: '90px',
  //     key: day.format('DD.MM'),
  //     // editable: true,
  //     onCell: (record: TypeWorkHour) => ({
  //       record,
  //       editable: true,
  //       dataIndex: day.format('DD.MM'),
  //       title: `${day.format('dd')}\n${day.format('DD.MM')}`,
  //       handleSave: handleHoursChange,
  //     }),
  //     render: (cellData: { hours: number; id: number }) =>
  //       cellData?.hours ? `${cellData.hours}ч` : '',
  //   }));

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

  // Функция редактирования ячейки с часами
  //   const handleHoursChange = async (
  //     record: Item,
  //     dataIndex1: 'key' | 'id' | 'employee' | 'workDate' | 'hours',
  //     updatedWorkDay: TypeWorkDay,
  //   ) => {
  //     if (!record.id) {
  //       console.error('ID не предоставлен. Объект record:', record);
  //       return;
  //     }
  //
  //     try {
  //       const response = await updateWorkHours(updatedWorkDay);
  //       if (response) {
  //         // Обновите allWorkHour
  //       }
  //     } catch (error) {
  //       console.error('Ошибка при обновлении данных рабочего времени: ', error);
  //     }
  //   };

  // Функция добавления пустой строки
  //   const handleAddEmptyRow = () => {
  //     // Создаем пустую строку
  //     const emptyDays: Record<string, TypeWorkDay> = {};
  //     days.forEach(day => {
  //       emptyDays[day.format('DD.MM')] = {
  //         date: day.format('YYYY-MM-DD'),
  //         hours: 0,
  //       };
  //     });

  //     const emptyRow: TypeWorkHoursRow = {
  //       employee: {
  //         id: 0,
  //         firstName: '',
  //         lastName: '',
  //         phone: '',
  //         hired: true,
  //         salaryRate: 0,
  //       },
  //       days: emptyDays,
  //     };

  // Добавляем пустую строку в rows
  //   const updatedRows = { ...allWorkHour?.rows };
  //   updatedRows[`newRow${Date.now()}`] = emptyRow;
  //
  //   // Обновляем состояние
  //   setAllWorkHour(prevHours => {
  //     if (prevHours) {
  //       return {
  //         ...prevHours,
  //         rows: updatedRows,
  //       };
  //     }
  //     return prevHours;
  //   });
  // };

  // Колонки в таблице
  //     const columns: CustomColumnType<Item> = [
  //       {
  //         title: 'Сотрудник',
  //         dataIndex: 'employee',
  //         key: 'fullName',
  //         onCell: (record: Item) => ({
  //           record,
  //           editable: true,
  //           dataIndex: 'employee',
  //           title: 'Сотрудник',
  //           allEmployee: allEmployee,
  //           form: form,
  //         }),
  //         render: (employee: TypeEmployee) =>
  //           `${employee.lastName} ${employee.firstName}`,
  //       },
  //       ...daysColumns,
  //       {
  //         title: 'Итого',
  //         key: 'total',
  //         width: 80,
  //         render: (_, record: Item) => {
  //           return `${calculateTotalHours(record)}ч`;
  //         },
  //       },
  //     ];

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
  const daysColumns: ColumnsType<any> = days.map(day => {
    const dateFormat = day.format('YYYY-MM-DD');
    return {
      title: `${day.format('dd')}\n${day.format('DD.MM')}`,
      dataIndex: dateFormat,
      key: dateFormat,
      render: (dayData: TypeWorkDay) => (dayData ? `${dayData.hours}ч` : ''),
      // ... остальные свойства
    };
  });

  // Объединение всех колонок
  const columns = [...baseColumns, ...daysColumns];

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
        // components={components}
        //           rowClassName={() => 'editable-row'}
        pagination={{
          ...pagination,
          position: ['bottomCenter'],
          totalBoundaryShowSizeChanger: 10,
        }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        //           onClick={handleAddEmptyRow}
      >
        Добавить
      </Button>
    </>
  );
};
