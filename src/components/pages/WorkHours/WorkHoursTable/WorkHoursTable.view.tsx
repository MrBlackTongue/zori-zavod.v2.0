import React from 'react';
import { Button, DatePicker, Flex, FloatButton, Table } from 'antd';
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  TransformedWorkHour,
  TypeEditingDayState,
  TypeEmployee,
  TypeWorkDay,
} from '../../../../types';
import { EditableRow } from '../components/EditableRow';
import { EditableCell } from '../components/EditableCell';
import { EmployeeSelect } from '../components/EmployeeSelect';
import dayjs from 'dayjs';
import moment from 'dayjs';

interface WorkHoursTableViewProps {
  isLoading: boolean;
  allWorkHour: TransformedWorkHour[];
  editingEmployee: number | null;
  originalHours: number | null;
  totalHoursPerDay: Record<string, string>;
  totalAllHours: string;
  handleEmployeeChange: (employeeId: number) => void;
  handleUpdateNewRecord: (
    date: string,
    employeeId: number,
    newValue: string,
  ) => void;
  handleCreateNewRecord: (
    date: any,
    employeeId: number,
    newValue: string,
  ) => void;
  addNewRow: () => void;
  days: dayjs.Dayjs[];
  allEmployee: TypeEmployee[];
  setOriginalHours: (duration: number | null) => void;
  setEditingDay: (editingDay: TypeEditingDayState | null) => void;
  editingDay: TypeEditingDayState | null;
  calculateTotalHours: any; // не уверен что здесь правильно
  prevWeek: () => void; // не уверен что здесь правильно
  handleDateChange: (date: dayjs.Dayjs | null) => void;
  selectedDate: dayjs.Dayjs;
  getWeekFormat: (date: dayjs.Dayjs | null) => string;
  nextWeek: () => void;
}

export const WorkHoursTableView: React.FC<WorkHoursTableViewProps> = ({
  isLoading,
  allWorkHour,
  editingEmployee,
  originalHours,
  totalHoursPerDay,
  totalAllHours,
  handleEmployeeChange,
  handleUpdateNewRecord,
  handleCreateNewRecord,
  addNewRow,
  days,
  allEmployee,
  setOriginalHours,
  setEditingDay,
  editingDay,
  calculateTotalHours,
  prevWeek,
  handleDateChange,
  selectedDate,
  getWeekFormat,
  nextWeek,
}) => {
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

  return (
    <>
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
      <Table
        rowKey="id"
        bordered={true}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        className="table-work-hour"
        columns={columns}
        dataSource={allWorkHour}
        loading={isLoading}
        size={'middle'}
        pagination={{
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
