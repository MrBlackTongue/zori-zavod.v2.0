import React, {useCallback, useEffect, useMemo, useState} from 'react';
import dayjs from 'dayjs';
import {createWorkHours, deleteWorkHoursById, getAllWorkHours, updateWorkHours,} from '../../../../api';
import {
  TableProps,
  TypeEditingDayState,
  TypeTransformedWorkHour,
  TypeWorkDay,
  TypeWorkHour,
  TypeWorkHoursFilter,
} from '../../../../types';
import {formatMinutesToTime, timeToMinutes} from '../../../../utils';
import {WorkHoursTableView} from './WorkHoursTable.view';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import {WorkHoursProvider} from '../../../../contexts/WorkHoursContext';

// Функция для расчета общего количества часов всех сотрудников
const calculateTotalAllHours = (
  workHours: TypeTransformedWorkHour[],
): string => {
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

export const WorkHoursTableContainer: React.FC<
  TableProps<TypeWorkHoursFilter>
> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWorkHour, setAllWorkHour] = useState<TypeTransformedWorkHour[]>([]);
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

  // Текст поиска
  const [searchText, setSearchText] = useState<string>('');

  // Установка текущей недели по умолчанию
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('week'));

  dayjs.locale('ru');
  dayjs.extend(weekOfYear);

  const filter2 = useMemo(
    () => ({
      employee: searchText, // Используйте searchText как фильтр по сотруднику
      startDate: selectedDate.startOf('week').format('YYYY-MM-DD'), // начало недели
      endDate: selectedDate.endOf('week').format('YYYY-MM-DD'), // конец недели
    }),
    [searchText, selectedDate],
  );

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
    if (!date?.isValid()) return '';

    const startOfWeek = date.startOf('week');
    const endOfWeek = date.endOf('week');
    const weekNumber = startOfWeek.week();
    return `неделя ${weekNumber}:  ${startOfWeek.format(
      'D MMM',
    )} - ${endOfWeek.format('D MMM YYYY')}`;
  };

  // Создание массива 'days'
  const days = useMemo(() => {
    const start = (filter?.selectedDate ?? dayjs()).startOf('week');
    return Array.from({ length: 7 }, (_, i) => start.add(i, 'day'));
  }, [filter?.selectedDate]);

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

  const calculateTotalHoursPerDay = (workHours: TypeTransformedWorkHour[]) => {
    const totalMinutesPerDay: Record<string, number> = {};

    workHours.forEach(workHour => {
      Object.keys(workHour).forEach(key => {
        if (key !== 'employee' && workHour[key] instanceof Object) {
          const day = workHour[key] as TypeWorkDay;
          totalMinutesPerDay[day.date] =
            (totalMinutesPerDay[day.date] || 0) + (day.duration ?? 0);
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
  const calculateTotalHours = (workHour: TypeTransformedWorkHour): string => {
    let totalMinutes = 0;
    Object.keys(workHour).forEach(key => {
      if (key !== 'employee' && workHour[key] instanceof Object) {
        const day = workHour[key] as TypeWorkDay;
        totalMinutes += day.duration ?? 0;
      }
    });
    return formatMinutesToTime(totalMinutes);
  };

  useEffect(() => {
    const total = calculateTotalAllHours(allWorkHour);
    setTotalAllHours(total);
  }, [allWorkHour, calculateTotalAllHours]);

  const handleUpdateRecord = (
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
      updateWorkHours({ ...workHourData, id: editingDay?.id })
        .then(() => {
          setDataUpdated(prev => !prev); // Переключаем состояние
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
    const newHours = timeToMinutes(newValue);
    if (
      employeeId &&
      !isNaN(newHours as number) &&
      newHours !== originalHours
    ) {
      const workHourData: TypeEditingDayState = {
        workDate: editingDay?.workDate ?? null,
        duration: newHours ?? null,
        employee: { id: employeeId },
      };
      createWorkHours(workHourData)
        .then(() => {
          setDataUpdated(prev => !prev); // Переключаем состояние
          setEditingEmployee(null);
        })
        .catch(error => {
          console.error('Ошибка при создании часов работы:', error);
        });
    }
  };

  // Функция для добавления новой строки
  const addNewRow = useCallback(() => {
    // Создаем объект напрямую в формате TransformedWorkHour
    const newRow: TypeTransformedWorkHour = {
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
  }, [days]);

  const handleEmployeeChange = (employeeId: number | null) => {
    setEditingEmployee(employeeId);
  };

  // Функция для удаления строки
  const handleDeleteRow = useCallback(
    async (record: TypeTransformedWorkHour) => {
      try {
        // Собираем все ID рабочих часов из строки
        const idsToDelete = Object.values(record)
          .filter(item => item?.id)
          .map(item => item?.id);

        // Удаляем каждую запись о рабочих часах в строке
        const deletePromises = idsToDelete.map(id =>
          id ? deleteWorkHoursById(id) : null,
        );
        await Promise.all(deletePromises);

        // Обновляем данные
        loadAndUpdateData();
      } catch (error) {
        console.error('Ошибка при удалении строки: ', error);
      }
    },
    [],
  );

  const handleEditStart = (
    dataIndex: string,
    rowData: TypeTransformedWorkHour,
  ) => {
    // Извлекаем информацию о дне и сотруднике
    const workDayInfo = rowData[dataIndex] as TypeWorkDay;
    const employeeInfo = rowData.employee;

    setOriginalHours(workDayInfo.duration);

    setEditingDay({
      id: workDayInfo.id,
      workDate: workDayInfo.date,
      duration: originalHours ?? 0,
      employee: employeeInfo?.id,
    });
  };

  // Функция для загрузки и обновления данных
  const loadAndUpdateData = useCallback(() => {
    setIsLoading(true);

    // Загрузка данных с использованием фильтра
    getAllWorkHours(filter2)
      .then(data => {
        const transformedData = transformData(data);
        setAllWorkHour(transformedData);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error))
      .finally(() => setIsLoading(false));
  }, [filter2]);

  useEffect(() => {
    loadAndUpdateData();
  }, [loadAndUpdateData, dataUpdated]);

  useEffect(() => {
    if (allWorkHour.length === 0) {
      addNewRow();
    }
  }, [allWorkHour.length, addNewRow]);

  const contextValue = {
    isLoading,
    allData: allWorkHour,
    editingId: editingEmployee,
    handleEditStart,
    totalHoursPerDay,
    totalAllHours,
    handleEmployeeChange,
    handleUpdateRecord,
    handleCreateNewRecord,
    addNewRow,
    days,
    selectedDate,
    editingDay,
    calculateTotalHours,
    prevWeek,
    nextWeek,
    goToCurrentWeek,
    handleDateChange,
    getWeekFormat,
    handleDeleteRow,
    setSearchText,
    loadAndUpdateData,
  };

  return (
    <WorkHoursProvider value={contextValue}>
      <WorkHoursTableView />
    </WorkHoursProvider>
  );
};
