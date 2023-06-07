import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined, EllipsisOutlined} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {getAllOperationAccounting, getAllOperationAccountingByFilter,} from "../../../services";
import {
  TableProps,
  TypeOperationAccounting,
  TableParam,
  TypeOperationTimesheet,
  TypeOperationAccountingFilter, TypeUnit,
} from "../../../types";
import dayjs from "dayjs";

export const TableOperationAccounting:
  React.FC<TableProps<TypeOperationAccountingFilter>> = ({
                                                           isUpdateTable,
                                                           openDrawer,
                                                           onDelete,
                                                           filter,
                                                         }) => {
  const navigate = useNavigate();

  // Лоудер и список всех учетных операций
  const [isLoading, setIsLoading] = useState(false);
  const [allOperationAccounting, setAllOperationAccounting] = useState<TypeOperationAccounting[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Переход на другую страницу по адресу
  const handleMoreDetail = (id: number) => {
    navigate(`/operation-accounting/${id}/detail`);
  };

  // Колонки в таблице
  const columns: ColumnsType<TypeOperationAccounting> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'idOperationAccounting',
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
      render: (unit: TypeUnit) =>
        unit !== null ? (<div>{unit.name}</div>) : null,
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
          <Tooltip title="Подробнее" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              onClick={() => handleMoreDetail(id)}>
              <EllipsisOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer && openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту учетную операцию?"
              onConfirm={() => onDelete && onDelete(id)}
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
    setTableParams({pagination});
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

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllOperationAccounting().then((data) => {
      setAllOperationAccounting(data);
      setIsLoading(false);
    });
  }, [])

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter) {
      setIsLoading(true);
      getAllOperationAccountingByFilter({
        date: filter.date || undefined,
        operationId: filter.operationId || undefined,
        productionTypeId: filter.productionTypeId || undefined,
      })
        .then((data) => {
          setAllOperationAccounting(data);
          setIsLoading(false);
        });
    }
  }, [filter]);

  useEffect(() => {
    if (filter?.date || filter?.operationId || filter?.productionTypeId) {
      handleFilterTable();
    } else {
      handleUpdateTable();
    }
  }, [filter, isUpdateTable, handleUpdateTable, handleFilterTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allOperationAccounting}
      loading={isLoading}
      onChange={handleChangeTable}
      summary={renderSummaryRow}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
    />
  );
}