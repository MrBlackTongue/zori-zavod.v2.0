import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {TableProps, TypeWorkHours} from "../../../types";
import dayjs from "dayjs";
import {getAllWorkHours} from "../../../services/apiWorkHours";

export const TableWorkHours: React.FC<TableProps> = ({
                                                       isUpdateTable,
                                                       openDrawer,
                                                       onDelete,
                                                     }) => {
  // Лоудер и список всех единиц измерения
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allHours, setAllHours] = useState<TypeWorkHours[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const startDate = dayjs().startOf('week');
  // const endDate = dayjs().endOf('week');
  const days = [];

  for(let i = 0; i < 7; i++) {
    days.push(startDate.add(i, 'day'));
  }

  const daysColumns: ColumnsType<TypeWorkHours> = days.map(day => ({
    title: `${day.format('dd')}\n${day.format('DD.MM')}`,
    dataIndex: day.format('DD.MM'),
    key: day.format('DD.MM'),
    render: (hours: number) => hours ? `${hours}ч` : '',
  }));

  const transformData = (data: TypeWorkHours[]): any[] => {
    // Создайте объект для агрегации данных
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


  // Колонки в таблице
  const columns: ColumnsType<TypeWorkHours> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'fullName',
      render: (employee: any) => {
        return `${employee.firstName} ${employee.lastName}`;
      },
    },
    ...daysColumns,
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer?.(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
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
  }, [])

  useEffect(() => {
    handleUpdateTable()
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allHours}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
}