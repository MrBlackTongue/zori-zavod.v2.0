import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import {
  getAllWorkHours,
  updateWorkHours,
  createWorkHours,
} from '../../../../services';
import { useFetchAllData } from '../../../../hooks';
import {
  TableProps,
  TransformedWorkHour,
  TypeEditingDayState,
  TypeWorkDay,
  TypeWorkHour,
  TypeWorkHoursFilter,
} from '../../../../types';
import { formatMinutesToTime, timeToMinutes } from '../../../../utils';
import { WorkHoursTableView } from './WorkHoursTable.view';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { logDOM } from '@testing-library/react';

export const WorkHoursTableContainer: React.FC<
  TableProps<TypeWorkHoursFilter>
> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWorkHour, setAllWorkHour] = useState<TransformedWorkHour[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<number | null>(null);
  const [editingDay, setEditingDay] = useState<TypeEditingDayState | null>(
    null,
  );
  const [originalHours, setOriginalHours] = useState<number | null>(null);
  const [totalHoursPerDay, setTotalHoursPerDay] = useState<
    Record<string, string>
  >({});
  const [totalAllHours, setTotalAllHours] = useState<string>('0ч');

  const [dataUpdated, setDataUpdated] = useState(false);

  // Параметры для пагинации
  //   const [pagination, setPagination] = useState({
  //     current: 1,
  //     pageSize: 10,
  //   });

  dayjs.locale('ru');
  dayjs.extend(weekOfYear);

  // Установка текущей недели по умолчанию
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('week'));

  // Переключение на предыдущую неделю
  const prevWeek = () => {
    setSelectedDate(prevDate => prevDate.subtract(1, 'week'));
  };

  // Переключение на следующую неделю
  const nextWeek = () => {
    setSelectedDate(prevDate => prevDate.add(1, 'week'));
  };

  // Обработчик изменения даты
  const handleDateChange = (date: any) => {
    setSelectedDate(dayjs(date));
  };

  // Создание объекта фильтра с использованием useMemo
  const filter = useMemo(
    () => ({
      selectedDate: selectedDate,
      startDate: selectedDate.startOf('week').format('YYYY-MM-DD'), // начало недели
      endDate: selectedDate.endOf('week').format('YYYY-MM-DD'), // конец недели
    }),
    [selectedDate],
  );

  const getWeekFormat = (date: dayjs.Dayjs | null) => {
    if (!date || !date.isValid()) return '';

    const startOfWeek = date.startOf('week');
    const endOfWeek = date.endOf('week');
    const weekNumber = startOfWeek.week();
    return `неделя ${weekNumber}:  ${startOfWeek.format(
      'D MMM',
    )} - ${endOfWeek.format('D MMM YYYY')}`;
  };

  // Дата начала и конца недели
  const startDate = (filter?.selectedDate ?? dayjs()).startOf('week');

  const days: dayjs.Dayjs[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(startDate.add(i, 'day'));
  }

  // Функция возвращения к текущей неделе
  const goToCurrentWeek = () => {
    setSelectedDate(dayjs().startOf('week'));
  };

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

  const handleUpdateNewRecord = (
    date: any,
    newValue: string,
    employeeId: number | null,
  ) => {
    const newHours = timeToMinutes(newValue);
    if (
      employeeId &&
      !isNaN(newHours as number) &&
      newHours !== originalHours
    ) {
      const workHourData = {
        workDate: editingDay?.workDate,
        duration: newHours,
        employee: { id: employeeId },
      };
      console.log('workHourData:', workHourData);
      updateWorkHours({ ...workHourData, id: editingDay?.id })
        .then(() => {
          setAllWorkHour(prevWorkHours => {
            console.log('prevWorkHours', prevWorkHours);
            return prevWorkHours.map(item =>
              item.employee && item.employee.id === employeeId
                ? {
                    ...item,
                    [date]: { ...item[date], duration: newHours },
                  }
                : item,
            );
          });
        })
        .catch(error => {
          console.error('Ошибка при обновлении часов работы:', error);
        });
    }
  };

  const handleCreateNewRecord = (
    date: any,
    newValue: string,
    employeeId: number | null,
  ) => {
    console.log('handleCreateNewRecord:', { date, employeeId, newValue });
    const newHours = timeToMinutes(newValue);
    if (
      employeeId &&
      !isNaN(newHours as number) &&
      newHours !== originalHours
    ) {
      const workHourData = {
        workDate: editingDay?.workDate,
        duration: newHours,
        employee: { id: employeeId },
      };
      console.log('workHourData:', workHourData);
      createWorkHours(workHourData)
        .then(response => {
          setDataUpdated(prev => !prev); // Переключаем состояние
        })
        .catch(error => {
          console.error('Ошибка при создании часов работы:', error);
        });
    }
  };

  // Функция для добавления новой строки
  const addNewRow = () => {
    // Создаем объект напрямую в формате TransformedWorkHour
    const newRow: TransformedWorkHour = {
      employee: null, // employee пока не выбран
      ...days.reduce(
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

    setAllWorkHour(prevWorkHours => [...prevWorkHours, newRow]);
  };

  // Параметры изменения таблицы
  // const handleChangeTable = (pagination: TablePaginationConfig): void => {
  //   setPagination(prevPagination => ({
  //     current: pagination.current ?? prevPagination.current,
  //     pageSize: pagination.pageSize ?? prevPagination.pageSize,
  //   }));
  // };

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
          setAllWorkHour(transformedData);
          setIsLoading(false);
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [filter]);

  const handleEmployeeChange = (employeeId: number | null) => {
    setEditingEmployee(employeeId);
  };

  const handleEditStart = ({
    id,
    workDate,
    duration,
    employee,
  }: TypeEditingDayState) => {
    setOriginalHours(duration);
    setEditingDay({
      id: id,
      workDate: workDate,
      duration: originalHours ?? 0,
      employee: employee ?? 0,
    });
    console.log('editingDay', editingDay);
  };

  useEffect(() => {
    handleUpdateTable();
  }, [handleUpdateTable, filter, dataUpdated]);

  useEffect(() => {
    if (allWorkHour.length === 0) {
      addNewRow();
    }
  }, [allWorkHour.length]);

  return (
    <WorkHoursTableView
      isLoading={isLoading}
      allWorkHour={allWorkHour}
      editingEmployee={editingEmployee}
      handleEditStart={handleEditStart}
      totalHoursPerDay={totalHoursPerDay}
      totalAllHours={totalAllHours}
      handleEmployeeChange={handleEmployeeChange}
      handleUpdateNewRecord={handleUpdateNewRecord}
      handleCreateNewRecord={handleCreateNewRecord}
      addNewRow={addNewRow}
      days={days}
      selectedDate={selectedDate}
      // allEmployee={allEmployee}
      editingDay={editingDay}
      calculateTotalHours={calculateTotalHours}
      prevWeek={prevWeek}
      handleDateChange={handleDateChange}
      getWeekFormat={getWeekFormat}
      nextWeek={nextWeek}
      // handleChangeTable={handleChangeTable}
      // pagination={pagination}
      handleUpdateTable={handleUpdateTable}
      goToCurrentWeek={goToCurrentWeek}
      originalHours={originalHours}
    />
  );
};
