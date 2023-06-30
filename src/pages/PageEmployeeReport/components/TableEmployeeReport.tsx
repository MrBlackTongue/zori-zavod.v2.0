import React, {useState, useEffect, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {getAllEmployeeReportByFilter} from "../../../services";
import {
  TableParam,
  TableProps,
  TypeEmployeeReport,
  TypeEmployeeReportFilter,
  TypeOperationReport,
} from "../../../types";
import dayjs from "dayjs";

export const TableEmployeeReport: React.FC<TableProps<TypeEmployeeReportFilter>> = ({
                                                                                      isUpdateTable,
                                                                                      filter
                                                                                    }) => {
  // Лоудер и список всех отчетов по операциям
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allEmployeeReport, setAllEmployeeReport] = useState<TypeOperationReport[]>();

  // Параметры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeEmployeeReport> = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: 100,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 100,
      sorter: (a, b) => (a.firstName ?? '') < (b.firstName ?? '') ? -1 : 1,
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 100,
      sorter: (a, b) => (a.lastName ?? '') < (b.lastName ?? '') ? -1 : 1,
    },
    {
      title: "Тип операции",
      dataIndex: "title",
      key: "title",
      width: 350,
      sorter: (a, b) => (a.title ?? '') < (b.title ?? '') ? -1 : 1,
    },
    {
      title: "Результат",
      dataIndex: "fact",
      key: "fact",
      width: 100,
      sorter: (a, b) => (a.fact ?? 0) - (b.fact ?? 0),
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
      title: "Часы",
      dataIndex: "hours",
      key: "hours",
      width: 100,
      sorter: (a, b) => (a.hours ?? 0) - (b.hours ?? 0),
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
      title: "Производительность",
      dataIndex: "performance",
      key: "performance",
      width: 100,
      sorter: (a, b) => (a.performance ?? 0) - (b.performance ?? 0),
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для расчета итоговых значений
  const renderSummaryRow = () => {
    if (!allEmployeeReport) return null
    let totalHours = 0;

    allEmployeeReport.forEach(({hours}: TypeEmployeeReport) => {
      totalHours += hours ?? 0;
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
            totalHours.toLocaleString('ru-RU', {maximumFractionDigits: 2,})
          }</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={6}></Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter) {
      setIsLoading(true);
      getAllEmployeeReportByFilter({
        employeeId: filter?.employeeId,
        operationId: filter?.operationId,
        dateFrom: filter?.dateFrom,
        dateTo: filter?.dateTo,
      })
        .then((data) => {
          setAllEmployeeReport(data?.map((item, index) => ({...item, key: index})));
          setIsLoading(false);
        })
        .catch((error) => console.error("Ошибка при получении данных: ", error))
    }
  }, [filter]);

  useEffect(() => {
    handleFilterTable();
  }, [filter, isUpdateTable, handleFilterTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allEmployeeReport}
      loading={isLoading}
      onChange={handleChangeTable}
      summary={renderSummaryRow}
      pagination={{...tableParams.pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};