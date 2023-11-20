import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import {
  TableProps,
  TransformedWorkHour,
  TypeEditingDayState,
  TypeWorkDay,
  TypeWorkHour,
  TypeWorkHoursFilter,
} from '../../../../types';
import dayjs from 'dayjs';
import { getAllWorkHours, updateWorkHours } from '../../../../services';
import { useFetchAllData } from '../../../../hooks';
import { EmployeeSelect } from './EmployeeSelect';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';

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

  const [originalHours, setOriginalHours] = useState<number | null>(null);

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
        total += day.duration;
      }
    });
    return total;
  };

  const handleEmployeeChange = (employeeId: number) => {
    setEditingEmployee(employeeId);
  };

  const handleSave = (date: string, employeeId: number, newValue: string) => {
    const newHours = parseInt(newValue, 10);
    if (!isNaN(newHours) && newHours !== originalHours) {
      const workHourUpdate = {
        id: editingDay?.id,
        workDate: date,
        duration: newHours,
        employee: { id: employeeId },
      };
      updateWorkHours(workHourUpdate)
        .then(() => {
          setAllWorkHour(prevWorkHours =>
            prevWorkHours.map(item =>
              item.employee.id === employeeId
                ? { ...item, [date]: { ...item[date], duration: newHours } }
                : item,
            ),
          );
        })
        .catch(error =>
          console.error('Ошибка при обновлении часов работы:', error),
        );
    }
  };

  // Колонки для сотрудников и итогов
  const baseColumns: ColumnsType<TransformedWorkHour> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
      width: 300,
      render: (_, record: TransformedWorkHour) => {
        return (
          <EmployeeSelect
            employees={allEmployee}
            editingEmployee={editingEmployee}
            handleEmployeeChange={handleEmployeeChange}
            record={record}></EmployeeSelect>
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
      width: 100,
      editable: true,
      render: (dayData: TypeWorkDay, record: TransformedWorkHour) => {
        const hours =
          dayData && dayData.duration !== null
            ? dayData.duration.toString()
            : '';
        // Преобразуем часы в строку для отображения
        return (
          <EditableCell
            record={record}
            dateFormat={dateFormat}
            originalHours={originalHours}
            setOriginalHours={setOriginalHours}
            setEditingDay={setEditingDay}
            handleSave={handleSave}
            children={hours} // передаем часы как children
            title="Часы" // заголовок для сообщения об ошибке
            editable={true} // установите в true, если ячейка должна быть редактируемой
            dataIndex={dateFormat} // уникальный ключ для каждой ячейки
            dayData={dayData}
          />
        );
      },
    };
  });

  const totalColumn: ColumnsType<any> = [
    {
      title: 'Итого',
      dataIndex: 'total',
      key: 'total',
      width: 150,

      render: (_, record: TransformedWorkHour) => {
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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <>
      <Table
        rowKey="id"
        bordered={true}
        components={components}
        rowClassName={() => 'editable-row'}
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
