import React, { useMemo, useState } from 'react';
import { Typography, Space, Button, FloatButton, DatePicker } from 'antd';
import { SyncOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'dayjs/locale/ru';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import '../../App.css';
import { TableWorkHours } from './components/TableWorkHours';
import dayjs from 'dayjs';
import {
  updateWorkHours,
  deleteWorkHoursById,
} from '../../services/apiWorkHours';

export const PageWorkHours: React.FC = () => {
  const { Title } = Typography;
  dayjs.locale('ru');
  dayjs.extend(weekOfYear);

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

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

  // Удалить запись из таблицы
  const handleDeleteWorkHours = async (id: number): Promise<void> => {
    console.log('Deleting work hours with ID:', id);
    await deleteWorkHoursById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Табель учёта рабочего времени</Title>
        <Space>
          <div>
            <LeftOutlined onClick={prevWeek} />
            <DatePicker
              allowClear={false}
              picker="week"
              onChange={handleDateChange}
              value={selectedDate}
              format={getWeekFormat(selectedDate)}
              style={{ width: '280px' }}
              className="no-clear-button"
            />
            <RightOutlined onClick={nextWeek} />
          </div>
          <Button
            type="dashed"
            icon={<SyncOutlined />}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className="greenButton">
            Обновить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableWorkHours
        filter={filter}
        isUpdateTable={isUpdateTable}
        onDelete={handleDeleteWorkHours}
      />
    </div>
  );
};
