import React, {useEffect, useState} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {getAllOperationAccounting, deleteOperationAccountingById, postFilterByTable,} from "../../../services";
import {TableProps, TypeOperationAccounting, TableParams, TypeOperationTimesheet} from "../../../types";
import dayjs from "dayjs";

export const TableOperationAccounting: React.FC<TableProps<TypeOperationAccounting>> = ({
                                                                                          isUpdateTable,
                                                                                          openDrawer,
                                                                                          searchText,
                                                                                          filterByTable,
                                                                                        }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех учетных операций
  const [loading, setLoading] = useState(false);
  const [allOperationAccounting, setAllOperationAccounting] = useState<TypeOperationAccounting[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOperationAccounting> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => (a.id || 0) < (b.id || 0) ? -1 : 1,
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'ID выпуска',
      dataIndex: ['operation', 'id'],
      key: 'operationId',
    },
    {
      title: 'Операция',
      dataIndex: ['operation', 'title'],
      key: 'operationTitle',
    },
    {
      title: 'Ед. изм.',
      dataIndex: ['operation', 'unit', 'name'],
      key: 'unit',
      render: (unitName: string, record: TypeOperationAccounting) =>
        record.operation?.unit ? (
          <div key={record.operation?.unit.id}>{record.operation?.unit.name}</div>
        ) : null,
    },
    {
      title: 'Факт',
      dataIndex: 'fact',
      key: 'fact',
      sorter: (a, b) => (a.fact || 0) < (b.fact || 0) ? -1 : 1,
      render: ((fact: number | null) =>
        fact !== null ? (
          <div>
            {fact.toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}
          </div>
        ) : 0)
    },
    {
      title: 'Среднее',
      dataIndex: 'average',
      key: 'average',
      render: ((average: number | null) =>
        average !== null ? (
          <div>
            {average.toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}
          </div>
        ) : 0)
    },
    {
      title: 'Часы',
      dataIndex: 'timeSheets',
      key: 'timeSheets',
      render: (timeSheets: TypeOperationTimesheet) =>
        timeSheets
          ? (
            <div>
              {timeSheets.reduce((acc, timeSheet) => acc + (timeSheet.hours || 0), 0).toLocaleString('ru-RU')}
            </div>
          ) : 0,
    },
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
              onClick={() => openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этот учет операции?"
              onConfirm={() => {
                deleteOperationAccountingById(id).then(() => {
                  getAllOperationAccounting()
                    .then((allOperationAccounting) => setAllOperationAccounting(allOperationAccounting))
                })
              }}
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
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TypeOperationAccounting>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllOperationAccounting([]);
    }
  };

  // Функция для обновления таблицы товаров
  const updateTable = () => {
    setLoading(true);
    getAllOperationAccounting().then((allOperationAccounting) => {
      setAllOperationAccounting(allOperationAccounting);
      setLoading(false);
    });
  }

  // Функция для фильтрации таблицы
  const filterTable = () => {
    if (filterByTable) {
      setLoading(true);
      postFilterByTable(filterByTable).then((allOperationAccounting) => {
        setAllOperationAccounting(allOperationAccounting);
        setLoading(false);
      });
    }
  }

  // Обновление таблицы товаров
  useEffect(() => {
    updateTable();
  }, [!isUpdateTable]);

  // Поиск по таблице товаров
  useEffect(() => {
    if (filterByTable && (filterByTable.date || filterByTable.operationId)) {
      filterTable();
    } else {
      updateTable();
    }
  }, [searchText, filterByTable]);

  return (
    <Table
      columns={columns}
      dataSource={allOperationAccounting}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}