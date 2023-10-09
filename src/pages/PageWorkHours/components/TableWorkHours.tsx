import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {DeleteOutlined, PlusOutlined,} from '@ant-design/icons';
import {TableProps, TypeWorkHours} from "../../../types";
import dayjs from "dayjs";
import {getAllWorkHours} from "../../../services/apiWorkHours";

export const TableWorkHours: React.FC<TableProps> = ({
                                                       isUpdateTable,
                                                       onDelete,
                                                       selectedDate,
                                                     }) => {
  // Лоудер и список всех единиц измерения
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allHours, setAllHours] = useState<TypeWorkHours[]>([]);

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const startDate = (selectedDate || dayjs()).startOf('week');
  const days: dayjs.Dayjs[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(startDate.add(i, 'day'));
  }

  const daysColumns: ColumnsType<TypeWorkHours> = days.map(day => ({
    title: `${day.format('dd')}\n${day.format('DD.MM')}`,
    dataIndex: day.format('DD.MM'),
    width: '90px',
    key: day.format('DD.MM'),
    render: (hours: number) => hours ? `${hours}ч` : '',
  }));

  const transformData = (data: TypeWorkHours[]): any[] => {
    // Объект для агрегации данных
    const aggregatedData: { [key: string]: any } = {};

    data.forEach(item => {
      const key = `${item.employee.firstName} ${item.employee.lastName}`;
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          employee: item.employee,
          [dayjs(item.workDate).format('DD.MM')]: item.hours
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

  const handleAddEmptyRow = () => {
    const emptyRow: TypeWorkHours = {
      id: Math.random(),
      employee: {
        id: Math.random(),
        firstName: "",
        lastName: "",
        phone: "",
        hired: false,
        salaryRate: 0
      },
      workDate: dayjs().toISOString(),
      hours: 0
    };

    setAllHours(prevHours => [...prevHours, emptyRow]);
  };


  // Колонки в таблице
  const columns: ColumnsType<TypeWorkHours> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'fullName',
      render: (employee: any) => {
        return `${employee.lastName} ${employee.firstName} `;
      },
    },
    ...daysColumns,
    {
      title: 'Итого',
      key: 'total',
      width: 80,

      render: (_, record) => {
        return `${calculateTotalHours(record)}ч`;
      }
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center',
      render: ((id: number) => (
        <Space>
          {/*<Tooltip title="Изменить" placement="bottomRight">*/}
          {/*  <Button*/}
          {/*    type="primary"*/}
          {/*    size="small"*/}
          {/*    shape="circle"*/}
          {/*    ghost*/}
          {/*    onClick={() => openDrawer?.(id)}>*/}
          {/*    <EditOutlined/>*/}
          {/*  </Button>*/}
          {/*</Tooltip>*/}
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту единицу измерения?"
              onConfirm={() => onDelete?.(id)}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

// Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination((prevPagination) => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllWorkHours()
      .then((data) => {
        const transformedData = transformData(data);
        setAllHours(transformedData);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, []);

  useEffect(() => {
    handleUpdateTable()
  }, [isUpdateTable, handleUpdateTable, selectedDate]);

  return (
      <div>
      <Button
          type="primary"
          icon={<PlusOutlined/>}
          onClick={handleAddEmptyRow}
      >
        Добавить
      </Button>
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allHours}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  </div>
  );
}