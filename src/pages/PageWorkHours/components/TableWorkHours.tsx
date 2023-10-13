import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import {
  Space,
  Button,
  Table,
  Tooltip,
  Popconfirm,
  Select,
  Form,
  Input,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  TableProps,
  TypeEmployee,
  TypeWorkHours,
  TypeWorkHoursFilter,
} from '../../../types';
import dayjs from 'dayjs';
import {
  getAllWorkHours,
  updateWorkHours,
} from '../../../services/apiWorkHours';
import { getAllEmployee } from '../../../services';

const EditableContext = React.createContext<any | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
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
  allEmployees: TypeEmployee[];
}

const EditableCell: React.FC<any> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  allEmployees,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>();
  const form = useContext(EditableContext)!;

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

  if (editable) {
    childNode = editing ? (
      dataIndex === 'employee' ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}>
          <Select
            ref={inputRef}
            onBlur={save}
            showSearch
            filterOption={(input, option) =>
              typeof option?.children === 'string' &&
              (option.children as string)
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }>
            {allEmployees.map((emp: TypeEmployee) => (
              <Select.Option key={emp.id} value={emp.id}>
                {`${emp.lastName} ${emp.firstName}`}
              </Select.Option>
            ))}
          </Select>
          {/*<Input ref={inputRef} onPressEnter={save} onBlur={save} />*/}
        </Form.Item>
      ) : (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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

export const TableWorkHours: React.FC<TableProps<TypeWorkHoursFilter>> = ({
  isUpdateTable,
  onDelete,
  filter,
}) => {
  interface CustomColumnType<T> extends ColumnsType<T> {
    editable?: boolean;
  }

  // Лоудер и список всех единиц измерения
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allHours, setAllHours] = useState<TypeWorkHours[]>([]);

  const [allEmployees, setAllEmployees] = useState<TypeEmployee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

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

  const daysColumns: ColumnsType<TypeWorkHours> = days.map(day => ({
    title: `${day.format('dd')}\n${day.format('DD.MM')}`,
    dataIndex: day.format('DD.MM'),
    width: '90px',
    key: day.format('DD.MM'),
    editable: true, // Добавьте эту строку
    onCell: (record: TypeWorkHours) => ({
      record,
      editable: true,
      dataIndex: day.format('DD.MM'),
      title: `${day.format('dd')}\n${day.format('DD.MM')}`,
      handleSave: handleHoursChange,
    }),
    render: (hours: number) => (hours ? `${hours}ч` : ''),
  }));

  const transformData = (data: TypeWorkHours[]): any[] => {
    // Объект для агрегации данных
    const aggregatedData: { [key: string]: any } = {};

    data.forEach(item => {
      const key = `${item.employee.firstName} ${item.employee.lastName}`;
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
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

  const handleEmployeeChange = async (
    updatedRecord: TypeWorkHours,
    dataIndex: string,
  ) => {
    const fullEmployee = allEmployees.find(
      emp => emp.id === updatedRecord.employee,
    );

    if (!fullEmployee) {
      console.error(
        'Не удалось найти сотрудника по ID:',
        updatedRecord.employee,
      );
      return;
    }

    const matchingRecord = allHours.find(
      hour => hour.employee.id === updatedRecord.employee.id,
    );

    if (!matchingRecord) {
      console.error('Не удалось найти соответствующую запись');
      return;
    }

    const dataToSend = {
      id: matchingRecord.id,
      employee: fullEmployee,
      workDate: dayjs().format('YYYY-MM-DD'),
      hours: calculateTotalHours(updatedRecord),
    };

    try {
      const response = await updateWorkHours(dataToSend);
      if (response) {
        const updatedHours = allHours.map(item =>
          item.employee.id === updatedRecord.id
            ? { ...item, employee: updatedRecord }
            : item,
        );
        setAllHours(updatedHours);
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных сотрудника: ', error);
    }
  };

  const handleHoursChange = async (
    updatedRecord: TypeWorkHours,
    dataIndex: string,
  ) => {
    const dataToSend = {
      id: updatedRecord.id,
      employee: updatedRecord.employee,
      workDate: dataIndex,
      hours: updatedRecord[dataIndex],
    };

    try {
      const response = await updateWorkHours(dataToSend);
      if (response) {
        const updatedHours = allHours.map(item =>
          item.id === updatedRecord.id ? { ...item, ...updatedRecord } : item,
        );
        setAllHours(updatedHours);
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных рабочего времени: ', error);
    }
  };

  const handleAddEmptyRow = () => {
    const emptyRow: TypeWorkHours = {
      id: Math.random(),
      employee: {
        id: Math.random(),
        firstName: '',
        lastName: '',
        phone: '',
        hired: false,
        salaryRate: 0,
      },
      workDate: dayjs().toISOString(),
      hours: 0,
    };

    setAllHours(prevHours => [...prevHours, emptyRow]);
  };

  useEffect(() => {
    const fetchAllEmployees = async () => {
      const employees = await getAllEmployee();
      setAllEmployees(employees);
    };

    fetchAllEmployees();
  }, []);

  // Колонки в таблице
  const columns: CustomColumnType<TypeWorkHours> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'fullName',
      // editable: true,
      onCell: (record: TypeWorkHours) => ({
        record,
        editable: true,
        dataIndex: 'employee',
        title: 'Сотрудник',
        handleSave: handleEmployeeChange, // Ваша функция для сохранения данных
        allEmployees: allEmployees,
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
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center',
      render: (id: number) => (
        <Space>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту единицу измерения?"
              onConfirm={() => onDelete?.(id)}
              okText="Да"
              cancelText="Отмена">
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{ color: 'tomato', borderColor: 'tomato' }}
                ghost>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
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
        setAllHours(transformedData);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  useEffect(() => {
    handleUpdateTable();
  }, [isUpdateTable, handleUpdateTable, filter]);

  return (
    <div>
      <Table
        rowKey="id"
        bordered
        columns={columns}
        dataSource={allHours}
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
