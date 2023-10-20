import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import { PlusOutlined } from '@ant-design/icons';
import {
  TableProps,
  TypeEmployee,
  TypeWorkHour,
  TypeWorkHoursFilter,
  WorkHourEntry,
} from '../../../types';
import dayjs from 'dayjs';
import { getAllWorkHours, updateWorkHours } from '../../../services';
import { useFetchAllData, useFormSelect } from '../../../hooks';

export interface Item {
  key: string;
  id: number;
  employee: TypeEmployee;
  workDate: string;
  hours: number;
}

export interface EditableRowProps {
  index: number;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  allEmployee: TypeEmployee[];
  form: FormInstance;
}

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

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <tr {...props} />
      </Form>
    );
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    form,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

    // Хук для управления полем employee
    const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
      form,
      'employee',
    );
    useEffect(() => {
      if (editing && inputRef.current) {
        if ('focus' in inputRef.current) {
          inputRef.current.focus();
        }
      }
    }, [editing]);

    const isWorkHourObject = (value: {}): value is { hours: number } => {
      return value && typeof value === 'object' && 'hours' in value;
    };

    const toggleEdit = () => {
      setEditing(!editing);

      if (form) {
        // Добавьте эту проверку
        if (dataIndex === 'employee') {
          form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        } else {
          const value = record[dataIndex];
          if (isWorkHourObject(value)) {
            form.setFieldsValue({ [dataIndex]: value.hours });
          }
        }
      }
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();

        const updatedRecord = {
          ...record,
          [dataIndex]: values[dataIndex],
        };

        console.log('Новые часы:', values[dataIndex]);
        console.log('Дата:', dataIndex); // dataIndex у вас хранит дату
        console.log('ID сотрудника:', updatedRecord.employee.id);
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        dataIndex === 'employee' ? (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[{ required: true, message: 'выберите сотрудника' }]}>
            <Select
              ref={inputRef as any}
              onBlur={save}
              showSearch
              allowClear
              onChange={onChangeSelect}
              onClear={onClearSelect}
              filterOption={onSearchSelect}>
              {allEmployee.map(data => (
                <Select.Option
                  key={data.id}
                  value={data.id}
                  label={`${data.lastName}, ${data.firstName}`}>
                  {`${data.lastName} ${data.firstName}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[{ required: true, message: `Укажите ${title}` }]}>
            <Input ref={inputRef as any} onPressEnter={save} onBlur={save} />
          </Form.Item>
        )
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}>
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

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
  const transformDataFromServer = (data: TypeWorkHour[]): TypeWorkHour[] => {
    let result: TypeWorkHour[] = [];
    data.forEach(data => {
      const employee = data.employee;
      const workHours = data.workHours;
      const aggregatedData: any = {
        employee: employee,
      };
      workHours?.forEach((hourData: WorkHourEntry) => {
        const dateKey = dayjs(hourData.workDate).format('DD.MM');
        aggregatedData[dateKey] = {
          hours: hourData.hours,
          id: hourData.id, // Сохраняем id каждой ячейки
        };
      });
      result.push(aggregatedData);
    });
    return result;
  };

  const calculateTotalHours = (record: any): number => {
    // Получение дат текущей недели
    const currentWeekDates = days.map(day => day.format('DD.MM'));

    // Фильтрация свойств объекта, чтобы получить только дни текущей недели
    const daysHours = Object.keys(record)
      .filter(key => currentWeekDates.includes(key))
      .map(key => {
        const cellData = record[key];
        return cellData ? cellData.hours : 0;
      });

    // Суммирование часов
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
    updatedRecord: TypeWorkHour,
    dataIndex: string,
  ) => {
    //     const workDate = Object.keys(updatedRecord).find(
    //       key =>
    //         key.includes('.') && updatedRecord[key] !== null && key !== dataIndex,
    //     );

    //     if (!updatedRecord.id) {
    //       console.error('ID не предоставлен. Объект updatedRecord:', updatedRecord);
    //       return;
    //     }

    const dataToSend: TypeWorkHour = {
      // id: updatedRecord?.id, // используйте id из updatedRecord
      employee: updatedRecord.employee,
      // workDate: workDate || dataIndex,
      // hours: updatedRecord[workDate || dataIndex] || 0,
    };

    try {
      const response = await updateWorkHours(dataToSend);
      if (response) {
        // const updatedHours = allWorkHour.map(item =>
        // item.id === updatedRecord.id ? { ...item, ...updatedRecord } : item,
        // );
        // setAllWorkHour(updatedHours);
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных рабочего времени: ', error);
    }
  };

  // Функция добавления пустой строки
  const handleAddEmptyRow = () => {
    const emptyRow: TypeWorkHour = {
      employee: { id: undefined },
      // workDate: undefined,
      // hours: 0,
    };

    days.forEach(day => {
      // emptyRow[day.format('DD.MM')] = null;
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
        // handleSave: handleEmployeeChange, // Ваша функция для сохранения данных
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
