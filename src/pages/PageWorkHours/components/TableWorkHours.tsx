import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputRef, Select, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import { PlusOutlined } from '@ant-design/icons';
import { RefSelectProps } from 'antd/lib/select';
import {
  AggregatedWorkHourData,
  CombinedType,
  EditableRowProps,
  Item,
  TableProps,
  TypeEmployee,
  TypeEmployeeWorkHours,
  TypeWorkHour,
  TypeWorkHoursFilter,
} from '../../../types';
import dayjs from 'dayjs';
import { getAllWorkHours, updateWorkHours } from '../../../services';
import { useFetchAllData, useFormSelect } from '../../../hooks';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';

export const TableWorkHours: React.FC<TableProps<TypeWorkHoursFilter>> = ({
  filter,
}) => {
  interface CustomColumnType<T> extends ColumnsType<T> {
    editable?: boolean;
  }

  const [form] = Form.useForm();

  // Spinner и список всех сотрудников и рабочих часов
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWorkHour, setAllWorkHour] = useState<TypeWorkHour[]>([]);

  // Хук для получения данных
  const { allEmployee } = useFetchAllData({ depsEmployee: true });

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Дата начала и конца недели
  const startDate = (filter?.selectedDate || dayjs()).startOf('week');

  const days: dayjs.Dayjs[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(startDate.add(i, 'day'));
  }

  const daysColumns: ColumnsType<TypeWorkHour> = days.map(day => ({
    title: `${day.format('dd')}\n${day.format('DD.MM')}`,
    dataIndex: day.format('DD.MM'),
    width: '90px',
    key: day.format('DD.MM'),
    // editable: true,
    onCell: (record: TypeWorkHour) => ({
      record,
      editable: true,
      dataIndex: day.format('DD.MM'),
      title: `${day.format('dd')}\n${day.format('DD.MM')}`,
      handleSave: handleHoursChange,
    }),
    render: (cellData: { hours: number; id: number }) =>
      cellData?.hours ? `${cellData.hours}ч` : '',
  }));

  // Функция трансформации данных с сервера
  const transformDataFromServer = (
    data: TypeEmployeeWorkHours[],
  ): AggregatedWorkHourData[] => {
    return data.reduce<AggregatedWorkHourData[]>(
      (result, { employee, workHours = [] }) => {
        const aggregatedData = workHours.reduce<AggregatedWorkHourData>(
          (acc, { workDate, hours = 0, id = 0 }) => {
            const dateKey = dayjs(workDate || '').format('DD.MM');
            acc[dateKey] = { hours, id };
            return acc;
          },
          {
            employee, // только поле employee
          },
        );
        result.push(aggregatedData);
        console.log('result', result);
        return result;
      },
      [],
    );
  };

  const calculateTotalHours = (record: CombinedType): number => {
    const currentWeekDates = days.map(day => day.format('DD.MM'));
    const daysHours = Object.keys(record)
      .filter(key => currentWeekDates.includes(key))
      .map(key => {
        const cellData = record[key];
        if (
          typeof cellData === 'object' &&
          'hours' in cellData &&
          cellData !== null
        ) {
          return cellData.hours ? cellData.hours : 0;
        }
        return 0;
      });

    return daysHours.reduce((acc, hours) => acc + (hours || 0), 0);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // Функция редактирования ячейки с часами
  const handleHoursChange = async (
    record: Item,
    dataIndex1: 'key' | 'id' | 'employee' | 'workDate' | 'hours',
    updatedRecord: TypeWorkHour,
  ) => {
    if (!updatedRecord?.id) {
      console.error('ID не предоставлен. Объект updatedRecord:', updatedRecord);
      return;
    }
    const dataToSend: TypeWorkHour = {
      employee: updatedRecord.employee,
    };
    try {
      const response = await updateWorkHours(dataToSend);
      if (response) {
        // Обновите allWorkHour
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных рабочего времени: ', error);
    }
  };

  // Функция добавления пустой строки
  const handleAddEmptyRow = () => {
    const emptyRow: CombinedType = {
      employee: { id: undefined },
    };

    days.forEach(day => {
      emptyRow[day.format('DD.MM')] = { hours: undefined }; // здесь мы присваиваем объект, соответствующий ожидаемому типу
    });

    setAllWorkHour(prevHours => [...prevHours, emptyRow]);
  };

  // Колонки в таблице
  const columns: CustomColumnType<TypeWorkHour> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'fullName',
      onCell: (record: TypeWorkHour) => ({
        record,
        editable: true,
        dataIndex: 'employee',
        title: 'Сотрудник',
        //  handleSave: handleEmployeeChange, // Ваша функция для сохранения данных
        allEmployee: allEmployee,
        form: form,
      }),
      render: (employee: TypeEmployee) =>
        `${employee.lastName} ${employee.firstName}`,
    },
    ...daysColumns,
    {
      title: 'Итого',
      key: 'total',
      width: 80,

      render: (_, record) => {
        return `${calculateTotalHours(record)}ч`;
      },
    },
  ];

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
          const transformedData = transformDataFromServer(data);
          setAllWorkHour(transformedData);
          setIsLoading(false);
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [filter]);

  useEffect(() => {
    handleUpdateTable();
  }, [handleUpdateTable, filter]);

  return (
    <div>
      <Table
        rowKey="id"
        bordered
        columns={columns}
        dataSource={allWorkHour}
        loading={isLoading}
        onChange={handleChangeTable}
        components={components}
        rowClassName={() => 'editable-row'}
        pagination={{
          ...pagination,
          position: ['bottomCenter'],
          totalBoundaryShowSizeChanger: 10,
        }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddEmptyRow}>
        Добавить
      </Button>
    </div>
  );
};
