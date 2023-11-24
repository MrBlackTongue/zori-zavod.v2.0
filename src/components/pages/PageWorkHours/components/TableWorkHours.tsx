import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  TableProps,
  TransformedWorkHour,
  TypeEditingDayState,
  TypeRow,
  TypeWorkDay,
  TypeWorkHour,
  TypeWorkHoursFilter,
} from '../../../../types';
import dayjs from 'dayjs';
import {
  createWorkHours,
  getAllWorkHours,
  logoutUser,
  updateWorkHours,
} from '../../../../services';
import { useFetchAllData } from '../../../../hooks';
import { EmployeeSelect } from './EmployeeSelect';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';
import { formatMinutesToTime } from '../../../../utils';
import './TableWorkHour.css';
import { PlusOutlined } from '@ant-design/icons';

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

  const [totalHoursPerDay, setTotalHoursPerDay] = useState<
    Record<string, string>
  >({});

  const [totalAllHours, setTotalAllHours] = useState<string>('0 ч');

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

  const calculateTotalHoursPerDay = (workHours: TransformedWorkHour[]) => {
    const totalMinutesPerDay: Record<string, number> = {};

    workHours.forEach(workHour => {
      Object.keys(workHour).forEach(key => {
        if (key !== 'employee' && workHour[key] instanceof Object) {
          const day = workHour[key] as TypeWorkDay;
          totalMinutesPerDay[day.date] =
            (totalMinutesPerDay[day.date] || 0) + (day.duration || 0);
        }
      });
    });

    const totalHoursPerDay: Record<string, string> = {};
    Object.keys(totalMinutesPerDay).forEach(date => {
      totalHoursPerDay[date] = formatMinutesToTime(totalMinutesPerDay[date]);
    });

    return totalHoursPerDay;
  };

  useEffect(() => {
    const totals = calculateTotalHoursPerDay(allWorkHour);
    setTotalHoursPerDay(totals);
  }, [allWorkHour]);

  // Функция для вычисления итоговых часов
  const calculateTotalHours = (workHour: TransformedWorkHour): string => {
    let totalMinutes = 0;
    Object.keys(workHour).forEach(key => {
      if (key !== 'employee' && workHour[key] instanceof Object) {
        const day = workHour[key] as TypeWorkDay;
        totalMinutes += day.duration || 0;
      }
    });
    // const totalHours = Math.floor(totalMinutes / 60);
    return formatMinutesToTime(totalMinutes);
  };

  // Функция для расчета общего количества часов всех сотрудников
  const calculateTotalAllHours = (workHours: TransformedWorkHour[]): string => {
    let totalMinutes = 0;
    workHours.forEach(workHour => {
      Object.keys(workHour).forEach(key => {
        // Добавляем проверку на null перед тем как обращаться к свойству duration
        const dayOrEmployee = workHour[key];
        if (
          dayOrEmployee &&
          'duration' in dayOrEmployee &&
          dayOrEmployee.duration !== null
        ) {
          totalMinutes += dayOrEmployee.duration;
        }
      });
    });
    return formatMinutesToTime(totalMinutes);
  };

  useEffect(() => {
    const total = calculateTotalAllHours(allWorkHour);
    setTotalAllHours(total);
  }, [allWorkHour, calculateTotalAllHours]);

  const handleEmployeeChange = (employeeId: number) => {
    setEditingEmployee(employeeId);
  };

  const handleUpdateNewRecord = (date: string, employeeId: number, newValue: string) => {
    const newHours = parseInt(newValue, 10);
    if (employeeId && !isNaN(newHours) && newHours !== originalHours) {
      const workHourData = {
        workDate: date,
        duration: newHours,
        employee: { id: employeeId },
      };
    updateWorkHours({ ...workHourData, id: editingDay?.id})
        .then(() => {
          setAllWorkHour(prevWorkHours => {
                console.log('prevWorkHours', prevWorkHours);
                return prevWorkHours.map(item => item.employee && item.employee.id === employeeId
                    ? ({
                      ...item,
                      [date]: {...item[date], duration: newHours},
                    } as TransformedWorkHour)
                    : item
                );
              }
          );
        })
        .catch(error => {
          console.error('Ошибка при обновлении часов работы:', error);
        });


  }};
  
  const handleCreateNewRecord = (date: string, employeeId: number, newValue: string) => {
    const newHours = parseInt(newValue, 10);
    if (employeeId && !isNaN(newHours) && newHours !== originalHours) {
      const workHourData = {
        workDate: date,
        duration: newHours,
        employee: { id: employeeId },
      };
      createWorkHours(workHourData)
          .then(() => {
            setAllWorkHour(prevWorkHours => {
                  return prevWorkHours.map(item => item.employee === null || item.employee.id === employeeId
                      ? ({
                        ...item,
                        [date]: {...item[date], duration: newHours, id: editingDay?.id},
                      } as TransformedWorkHour)
                      : item
                  );
                }
            );
            console.log('allWorkHour', allWorkHour);
          })
        .catch(error => {
          console.error('Ошибка при обновлении часов работы:', error);
        });
  }};


  // Функция для добавления новой строки
  const addNewRow = () => {
    const newRow: TypeRow = {
      employee: null, // employee пока не выбран
      days: days.reduce(
        (acc, day) => {
          const formattedDate = day.format('YYYY-MM-DD');
          acc[formattedDate] = {
            date: formattedDate,
            duration: null, // Инициализация с пустым значением
            id: null, // Идентификатор пока неизвестен
          };
          return acc;
        },
        {} as Record<string, TypeWorkDay>,
      ),
    };

    // Преобразовываем TypeRow в TransformedWorkHour для добавления в состояние
    const transformedRow: TransformedWorkHour = {
      employee: newRow.employee,
      ...newRow.days,
    };

    setAllWorkHour(prevWorkHours => [...prevWorkHours, transformedRow]);
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
      title: (
        <>
          {day.format('dd')} {day.format('DD.MM')}
          <br />
          <span style={{ fontWeight: 'normal', fontSize: 'small' }}>
            {totalHoursPerDay[dateFormat] || '0 ч'}
          </span>
        </>
      ),
      dataIndex: dateFormat,
      key: dateFormat,
      width: 90,
      editable: true,
      render: (dayData: TypeWorkDay, record: TransformedWorkHour) => {
        const hours =
          dayData && dayData.duration !== null
            ? dayData.duration.toString()
            : '';
        return (
          <EditableCell
            record={record}
            dateFormat={dateFormat}
            originalHours={originalHours}
            editingEmployee={editingEmployee}
            setOriginalHours={setOriginalHours}
            setEditingDay={setEditingDay}
            handleCreateNewRecord={handleCreateNewRecord}
            handleUpdateRecord={handleUpdateNewRecord}
            children={hours}
            editable={true}
            dataIndex={dateFormat}
            dayData={dayData}
            editingDay={editingDay}
          />
        );
      },
    };
  });

  const totalColumn: ColumnsType<TransformedWorkHour> = [
    {
      title: (
        <>
          Итого
          <br />
          <span style={{ fontWeight: 'normal', fontSize: 'small' }}>
            {totalAllHours}
          </span>
        </>
      ),
      dataIndex: 'total',
      key: 'total',
      width: 150,
      render: (_, record: TransformedWorkHour) => {
        // Рассчитываем итог для каждого сотрудника
        return `${calculateTotalHours(record)}`;
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
        className="table-work-hour"
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
      <Button type="primary" icon={<PlusOutlined />} onClick={addNewRow}>
        Добавить
      </Button>
    </>
  );
};
