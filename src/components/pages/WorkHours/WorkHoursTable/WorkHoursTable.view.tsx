import React from 'react';
import {
  Button,
  DatePicker,
  Flex,
  FloatButton,
  Input,
  Popconfirm,
  Table,
} from 'antd';
import {
  DeleteOutlined,
  HomeOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { TransformedWorkHour, TypeWorkDay } from '../../../../types';
import { EditableRow } from '../../../molecules/EditableRow/EditableRow';
import { EditableCell } from '../../../molecules/EditableCell/EditableCell';
import { EditableSelect } from '../../../molecules/EditableSelect/EditableSelect';
import './WorkHoursTable.css';
import { getAllEmployee } from '../../../../api';
import { formatMinutesToTime } from '../../../../utils';
import { useWorkHoursContext } from '../../../../contexts/WorkHoursContext';

export const WorkHoursTableView: React.FC = () => {
  const {
    isLoading,
    allData,
    totalHoursPerDay,
    totalAllHours,
    handleEmployeeChange,
    addNewRow,
    days,
    selectedDate,
    calculateTotalHours,
    prevWeek,
    nextWeek,
    goToCurrentWeek,
    handleDateChange,
    getWeekFormat,
    editingId,
    handleDeleteRow,
    setSearchText,
  } = useWorkHoursContext();

  // Колонки для сотрудников и итогов
  const employeeColumn: ColumnsType<TransformedWorkHour> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
      width: 200,
      render: (_, record: TransformedWorkHour) => {
        return (
          <EditableSelect
            value={record.employee?.id}
            isEditable={!record.employee}
            placeholder="Выберите сотрудника"
            getId={item => item.id ?? 0}
            getLabel={item => `${item.lastName} ${item.firstName}`}
            fetchDataList={getAllEmployee}
            onValueChange={newValue => {
              handleEmployeeChange(newValue ?? null);
            }}
          />
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
        if (
          !dayData ||
          typeof dayData !== 'object' ||
          !('duration' in dayData)
        ) {
          // Если dayData не соответствует ожидаемому формату, возвращаем пустой элемент
          return <td></td>;
        }
        const formattedHours =
          dayData.duration !== null
            ? formatMinutesToTime(dayData.duration)
            : '';

        return (
          <EditableCell<TransformedWorkHour>
            rowData={record}
            recordId={record.employee?.id}
            formattedHours={formattedHours}
            editable
            dataIndex={dateFormat}
            cellId={dayData.id}>
            {dayData.duration?.toString() ?? ''}
          </EditableCell>
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
      width: 80,
      render: (_, record: TransformedWorkHour) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <div>{`${calculateTotalHours(record)}`}</div>
          <div className="delete-button">
            <Popconfirm
              placement="topLeft"
              title="Вы действительно хотите удалить сотрудника из таблицы?"
              onConfirm={() => handleDeleteRow(record)}
              okText="Да"
              cancelText="Отмена">
              <Button
                style={{ color: 'tomato', borderColor: 'tomato' }}
                type="default"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // Объединение всех колонок
  const columns = [...employeeColumn, ...daysColumns, ...totalColumn];
  return (
    <>
      <Flex
        gap="3px"
        justify="space-between"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <Input
          allowClear
          placeholder="Поиск по сотрудникам"
          style={{ width: '210px' }}
          onChange={event => setSearchText(event.target.value.trim())}
          prefix={<SearchOutlined />}
        />
        <div>
          <Button onClick={prevWeek}>
            <LeftOutlined />
          </Button>
          <Button onClick={goToCurrentWeek}>
            <HomeOutlined />
          </Button>
          <DatePicker
            allowClear={false}
            picker="week"
            onChange={handleDateChange}
            value={selectedDate}
            format={getWeekFormat(selectedDate)}
            style={{ width: 300 }}
            className="no-clear-button"
          />
          <Button onClick={nextWeek}>
            <RightOutlined />
          </Button>
        </div>
      </Flex>
      <FloatButton.BackTop />
      <Table
        rowKey="id"
        bordered
        components={components}
        rowClassName={record => {
          if (editingId === record.employee?.id) {
            return 'highlighted-row editable-row';
          }
          return 'editable-row';
        }}
        className="table-work-hour"
        columns={columns}
        dataSource={allData}
        loading={isLoading}
        size={'middle'}
        pagination={false}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginTop: 15 }}
        onClick={addNewRow}>
        Добавить
      </Button>
    </>
  );
};
