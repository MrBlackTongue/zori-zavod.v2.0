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
                                                                                          filter,
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
      render: (timeSheets: TypeOperationTimesheet[]) =>
        timeSheets
          ? (
            <div>
              {timeSheets
                .reduce((acc, timeSheet) => acc + (timeSheet.hours || 0), 0)
                .toLocaleString('ru-RU')}
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
                deleteOperationAccountingById(id).then(() => filterTable())
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
      setAllOperationAccounting(allOperationAccounting);
    }
  };

  // Функция для расчета итоговых значений
  const renderSummaryRow = () => {
    if (!allOperationAccounting) return null
    let totalFact = 0;
    let totalTimeSheets = 0;
    let totalAverage = 0

    allOperationAccounting.forEach(({fact, average, timeSheets}: TypeOperationAccounting) => {
      totalFact += fact || 0;
      totalAverage += average || 0

      if (timeSheets) {
        timeSheets.forEach((timeSheet: TypeOperationTimesheet) => {
          totalTimeSheets += timeSheet.hours || 0;
        });
      }
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}><strong>Итого</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={1}></Table.Summary.Cell>
          <Table.Summary.Cell index={2}></Table.Summary.Cell>
          <Table.Summary.Cell index={3}></Table.Summary.Cell>
          <Table.Summary.Cell index={4}></Table.Summary.Cell>
          <Table.Summary.Cell index={5}><strong>{
            totalFact.toLocaleString('ru-RU', {maximumFractionDigits: 2,})
          }</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={6}><strong>{
            totalAverage.toLocaleString('ru-RU', {maximumFractionDigits: 2,})
          }</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={7}><strong>{
            totalTimeSheets.toLocaleString('ru-RU', {maximumFractionDigits: 2,})
          }</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={8}></Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
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
    if (filter) {
      setLoading(true);
      postFilterByTable({
        date: filter.dateFilter || undefined,
        operationId: filter.idFilter || undefined,
      }).then((allOperationAccounting) => {
        setAllOperationAccounting(allOperationAccounting);
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    if (filter && (filter.dateFilter || filter.idFilter)) {
      filterTable();
    } else {
      updateTable();
    }
  }, [searchText, filter, isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allOperationAccounting}
      pagination={{
        position: [bottom],
        current: tableParams?.pagination?.current,
        pageSize: tableParams?.pagination?.pageSize,
      }}
      loading={loading}
      onChange={handleTableChange}
      summary={renderSummaryRow}
    />
  );
}