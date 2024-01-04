import React from 'react';
import { Button, DatePicker, Flex, FloatButton, Table } from 'antd';
import {
  HomeOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  TransformedWorkHour,
  TypeEditingDayState,
  TypeEmployee,
  TypeWorkDay,
} from '../../../../types';
import { EditableRow } from '../../../molecules/EditableRow/EditableRow';
import { EditableCell } from '../../../molecules/EditableCell/EditableCell';
import { EditableSelect } from '../../../molecules/EditableSelect/EditableSelect';
import dayjs from 'dayjs';
import '../components/TableWorkHour.css';
import { getAllEmployee } from '../../../../services';
import { formatMinutesToTime } from '../../../../utils';
import { useWorkHoursContext } from '../../../../contexts/WorkHoursContext';

export const WorkHoursTableView: React.FC = () => {
  const {
    isLoading,
    allWorkHour,
    editingEmployee,
    totalHoursPerDay,
    totalAllHours,
    handleEmployeeChange,
    handleUpdateNewRecord,
    handleCreateNewRecord,
    handleEditStart,
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
    handleUpdateTable,
  } = useWorkHoursContext();

  // Колонки для сотрудников и итогов
  const employeeColumn: ColumnsType<TransformedWorkHour> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
      width: 300,
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
            initialValue={formattedHours}
            editingId={editingEmployee}
            formattedHours={formattedHours}
            onEditStart={() => {
              // Здесь мы передаем только необходимые данные
              handleEditStart({
                id: dayData.id,
                workDate: dateFormat,
                duration: dayData.duration,
                employee: editingEmployee,
              });
            }}
            handleUpdateRecord={(date, newValue) =>
              handleUpdateNewRecord(
                date,
                newValue,
                record.employee?.id ?? editingEmployee,
              )
            }
            handleCreateNewRecord={(date, newValue) =>
              handleCreateNewRecord(
                date,
                newValue,
                record.employee?.id ?? editingEmployee,
              )
            }
            isEditableCondition={record => record.employee?.id != null}
            children={dayData.duration?.toString() || ''}
            editable
            dataIndex={dateFormat}
            cellId={dayData.id}
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
      width: 100,
      render: (_, record: TransformedWorkHour) => {
        // Рассчитываем итог для каждого сотрудника
        return `${calculateTotalHours(record)}`;
      },
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
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
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
      </Flex>
      <FloatButton.BackTop />
      <Table
        rowKey="id"
        bordered={true}
        components={components}
        rowClassName={() => 'editable-row'}
        className="table-work-hour"
        columns={columns}
        dataSource={allWorkHour}
        loading={isLoading}
        size={'middle'}
        pagination={false}
        // onChange={handleChangeTable}
        // pagination={{
        //   ...pagination,
        //   position: ['bottomCenter'],
        //   totalBoundaryShowSizeChanger: 10,
        // }}
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
