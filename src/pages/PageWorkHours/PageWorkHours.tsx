import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton, DatePicker,} from 'antd';
import {SyncOutlined, LeftOutlined, RightOutlined,} from '@ant-design/icons';
import 'dayjs/locale/ru'
import weekOfYear from "dayjs/plugin/weekOfYear";
import '../../App.css'
import {deleteUnitById} from "../../services";
import {TableWorkHours} from "./components/TableWorkHours";
import dayjs from "dayjs";

export const PageWorkHours: React.FC = () => {

  const {Title} = Typography;
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

  const getWeekFormat = (date: dayjs.Dayjs | null) => {
    if (!date || !date.isValid()) return "";

    const startOfWeek = date.startOf('week');
    const endOfWeek = date.endOf('week');
    const weekNumber = startOfWeek.week();
    return `неделя ${weekNumber}: ${startOfWeek.format('D MMM')} - ${endOfWeek.format('D MMM YYYY')}`;
  };


  // Удалить запись из таблицы
  const handleDeleteUnit = (id: number): void => {
    void deleteUnitById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Табель учёта рабочего времени</Title>
        <Space>
          <div>
            <LeftOutlined onClick={prevWeek}/>
            <DatePicker
              allowClear={false}
              picker="week"
              onChange={handleDateChange}
              value={selectedDate}
              format={getWeekFormat(selectedDate)}
              style={{width: '280px'}}
              className="no-clear-button"
            />
            <RightOutlined onClick={nextWeek}/>
          </div>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
          {/*<Button*/}
          {/*    type="primary"*/}
          {/*    icon={<PlusOutlined/>}*/}
          {/*    onClick={() => setIsModalOpen(true)}*/}
          {/*>*/}
          {/*  Добавить*/}
          {/*</Button>*/}
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableWorkHours
        selectedDate={selectedDate}
        isUpdateTable={isUpdateTable}
        // openDrawer={openDrawer}
        onDelete={handleDeleteUnit}
      />
    </div>
  );
};