import React, { useMemo, useState } from 'react';
import { Button, DatePicker, Flex, FloatButton } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'dayjs/locale/ru';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import '../../../App.css';
import { TableWorkHours } from './TableWorkHours';
import dayjs from 'dayjs';

export const PageWorkHours: React.FC = () => {
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
  // console.log('selectedDate', getWeekFormat(selectedDate))

  return (
    <div>
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Button onClick={prevWeek}>
          <LeftOutlined />
        </Button>
        <DatePicker
          allowClear={false}
          picker="week"
          onChange={handleDateChange}
          value={selectedDate}
          format={getWeekFormat(selectedDate)}
          style={{ width: '280px' }}
          className="no-clear-button"
        />
        <Button onClick={nextWeek}>
          <RightOutlined />
        </Button>
      </Flex>
      <FloatButton.BackTop />
      <TableWorkHours filter={filter} />
    </div>
  );
};
