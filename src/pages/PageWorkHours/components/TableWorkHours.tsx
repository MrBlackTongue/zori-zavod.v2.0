import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Select, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import {
  TransformedWorkHour,
  TableProps,
  TypeEmployee,
  TypeWorkDay,
  TypeWorkHour,
  TypeWorkHoursFilter,
  TypeEditingDayState,
} from '../../../types';
import dayjs from 'dayjs';
import { getAllWorkHours, updateWorkHours } from '../../../services';
import { useFetchAllData } from '../../../hooks';

export const TableWorkHours: React.FC<TableProps<TypeWorkHoursFilter>> = ({
  filter,
}) => {
  // Spinner и список всех сотрудников и рабочих часов
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWorkHour, setAllWorkHour] = useState<TransformedWorkHour[]>([]);

  // Локальное состояние для управления редактированием ячейки сотрудника
  const [editingEmployee, setEditingEmployee] = useState<number | null>(null);

  // Локальное состояние для управления редактированием ячейки дня
  const [editingDay, setEditingDay] = useState<TypeEditingDayState | null>(
    null,
  );

  // Хук для получения данных
  const { allEmployee } = useFetchAllData({ depsEmployee: true });

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

  // Функция для вычисления итоговых часов
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

  const handleEmployeeChange = (
    employeeId: number,
    record: TransformedWorkHour,
  ) => {
    setEditingEmployee(employeeId);
  };

  const handleDayChange = (
    date: string,
    employeeId: number,
    newValue: string,
  ) => {
    const newHours = parseInt(newValue, 10); // Преобразование введенного значения в число
    if (!isNaN(newHours)) {
      // Создаем объект с новыми данными
      const workHourUpdate: TypeEditingDayState = {
        id: editingDay?.id,
        date: date,
        hours: newHours,
        employee: { id: employeeId },
      };
      console.log('workHourUpdate', workHourUpdate);
      // Отправляем данные на сервер
      updateWorkHours(workHourUpdate)
        .then(response => {
          console.log('Успешное обновление: ', response);
        })
        .catch(error => {
          // Обработка ошибки
          console.error('Ошибка при обновлении часов работы: ', error);
        });
    } else {
      console.error('Введенные данные не являются числом');
    }
  };

  // Колонки для сотрудников и итогов
  const baseColumns: ColumnsType<TransformedWorkHour> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
      render: (employee: TypeEmployee, record: TransformedWorkHour) => {
        if (editingEmployee === record.employee.id) {
          return (
            <Select
              defaultValue={String(employee.id)}
              style={{ width: '100%' }}
              onChange={value => handleEmployeeChange(Number(value), record)}>
              {allEmployee.map(e => (
                <Select.Option key={e.id} value={String(e.id)}>
                  {`${e.lastName} ${e.firstName}`}
                </Select.Option>
              ))}
            </Select>
          );
        }
        return (
          <span
            onClick={() => {
              if (employee.id !== undefined) {
                setEditingEmployee(employee.id);
              }
            }}>
            {`${employee.lastName} ${employee.firstName}`}
          </span>
        );
      },
    },
  ];

  // Колонки для дней недели
  const daysColumns: ColumnsType<TransformedWorkHour> = days.map(day => {
    const dateFormat = day.format('YYYY-MM-DD');
    return {
      title: `${day.format('dd')}\n${day.format('DD.MM')}`,
      dataIndex: dateFormat,
      key: dateFormat,
      render: (dayData: TypeWorkDay, record: TransformedWorkHour) => {
        if (
          editingDay &&
          editingDay.date === dateFormat && // Убедитесь, что даты совпадают
          editingDay.employee === record.employee.id // Используйте employeeId здесь
        ) {
          return (
            <Input
              style={{ width: '100px' }}
              defaultValue={dayData ? `${dayData.hours}` : ''}
              onBlur={e => {
                const employeeId = record.employee.id;
                if (typeof employeeId === 'number') {
                  handleDayChange(dateFormat, employeeId, e.target.value); // Теперь это гарантированно number
                } else {
                  console.error(
                    'ID сотрудника не определен при попытке обновить часы',
                  );
                }
              }}
            />
          );
        } else {
          return (
            <span
              onClick={() => {
                const employeeId = record.employee.id;
                // Проверяем, что employeeId действительно число
                setEditingDay({
                  id: dayData.id,
                  date: dateFormat,
                  hours: dayData ? dayData.hours : 0,
                  employee: employeeId,
                });
              }}>
              {dayData ? `${dayData.hours}ч` : ''}
            </span>
          );
        }
      },
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
