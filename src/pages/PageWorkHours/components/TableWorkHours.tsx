import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import { PlusOutlined } from '@ant-design/icons';
import {
  TableProps,
  TypeEmployee,
  TypeWorkHour,
  TypeWorkHoursFilter,
} from '../../../types';
import dayjs from 'dayjs';
import { getAllWorkHours, updateWorkHours } from '../../../services';
import { useFetchAllData, useFormSelect } from '../../../hooks';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

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

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  allEmployee: TypeEmployee[];
}

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  allEmployee,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>();
  const form = useContext(EditableContext)!;

  // Хук для управления полем employee
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'employee',
  );

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (!childNode || childNode === '') {
    childNode = (
      <span style={{ display: 'block', minHeight: '1rem' }}>&nbsp;</span>
    );
  }

  if (editable) {
    childNode = editing ? (
      dataIndex === 'employee' ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: 'выберите сотрудника' }]}>
          <Select
            ref={inputRef}
            onBlur={save}
            showSearch
            allowClear
            onChange={onChangeSelect}
            onClear={onClearSelect}
            filterOption={onSearchSelect}>
            {allEmployee && allEmployee.length > 0
              ? allEmployee.map((data: TypeEmployee) => (
                  <Select.Option
                    key={data.id}
                    value={data.id}
                    label={`${data.lastName}, ${data.firstName}`}>
                    {`${data.lastName} ${data.firstName}`}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Form.Item>
      ) : (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `Укажите время за ${title}` }]}>
          <Input
            ref={inputRef}
            onPressEnter={save}
            onClick={toggleEdit}
            onBlur={save}
          />
        </Form.Item>
      )
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, minHeight: '32px' }}
        onClick={toggleEdit}>
        {children || <span>&nbsp;</span>}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const TableWorkHours: React.FC<TableProps<TypeWorkHoursFilter>> = ({
  filter,
}) => {
  interface CustomColumnType<T> extends ColumnsType<T> {
    editable?: boolean;
  }

  // Spinner и список всех единиц измерения
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWorkHour, setAllWorkHour] = useState<TypeWorkHour[]>([]);

  // Хук для получения данных
  const { allEmployee } = useFetchAllData({ depsEmployee: true });

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

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
    render: (hours: number) => (hours ? `${hours}ч` : ''),
  }));

  const transformData = (data: TypeWorkHour[]): any[] => {
    // Объект для агрегации данных
    const aggregatedData: { [key: string]: any } = {};

    data.forEach(item => {
      const key = `${item.employee?.firstName} ${item.employee?.lastName}`;
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          id: item?.id,
          employee: item.employee,
          [dayjs(item.workDate).format('DD.MM')]: item.hours,
        };
      } else {
        aggregatedData[key][dayjs(item.workDate).format('DD.MM')] = item.hours;
      }
    });

    return Object.values(aggregatedData);
  };

  const calculateTotalHours = (record: any): number => {
    // Получение дат текущей недели
    const currentWeekDates = days.map(day => day.format('DD.MM'));

    // Фильтрация свойств объекта, чтобы получить только дни текущей недели
    const daysHours = Object.keys(record)
      .filter(key => currentWeekDates.includes(key))
      .map(key => record[key]);

    // Суммирование часов
    return daysHours.reduce((acc, hours) => acc + (hours || 0), 0);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleHoursChange = async (
    updatedRecord: TypeWorkHour,
    dataIndex: string,
  ) => {
    const workDate = Object.keys(updatedRecord).find(
      key =>
        key.includes('.') && updatedRecord[key] !== null && key !== dataIndex,
    );

    if (!updatedRecord.id) {
      console.error('ID не предоставлен. Объект updatedRecord:', updatedRecord);
      return;
    }

    const dataToSend: TypeWorkHour = {
      id: updatedRecord?.id, // используйте id из updatedRecord
      employee: updatedRecord.employee,
      workDate: workDate || dataIndex,
      hours: updatedRecord[workDate || dataIndex] || 0,
    };

    try {
      const response = await updateWorkHours(dataToSend);
      if (response) {
        const updatedHours = allWorkHour.map(item =>
          item.id === updatedRecord.id ? { ...item, ...updatedRecord } : item,
        );
        setAllWorkHour(updatedHours);
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных рабочего времени: ', error);
    }
  };

  const handleAddEmptyRow = () => {
    const emptyRow: TypeWorkHour = {
      employee: { id: undefined },
      workDate: undefined,
      hours: 0,
    };

    days.forEach(day => {
      emptyRow[day.format('DD.MM')] = null;
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
    setIsLoading(true);
    getAllWorkHours()
      .then(data => {
        const transformedData = transformData(data);
        setAllWorkHour(transformedData);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

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
