import React, {useState, useEffect, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {getAllOperationReportByFilter} from "../../../services";
import {
  TableParam,
  TableProps,
  TypeOperationReport,
  TypeOperationReportFilter,
} from "../../../types";

export const TableOperationReport: React.FC<TableProps<TypeOperationReportFilter>> = ({
                                                                                        isUpdateTable,
                                                                                        filter
                                                                                      }) => {
  // Лоудер и список всех отчетов по операциям
  const [isLoading, setIsLoading] = useState(false);
  const [allOperationReport, setAllOperationReport] = useState<TypeOperationReport[]>();

  // Параметры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOperationReport> = [
    {
      title: "Тип операции",
      dataIndex: "operationName",
      key: "operationName",
    },
    {
      title: "Часы",
      dataIndex: "hours",
      key: "hours",
    },
    {
      title: "Результат",
      dataIndex: "fact",
      key: "fact",
    },
    {
      title: "Ед.изм",
      dataIndex: "unit",
      key: "unit",
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для расчета итоговых значений
  const renderSummaryRow = () => {
    if (!allOperationReport) return null
    let totalHours = 0;

    allOperationReport.forEach(({hours}: TypeOperationReport) => {
      totalHours += hours ?? 0;
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}><strong>Итого</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={1}><strong>{
            totalHours.toLocaleString('ru-RU', {maximumFractionDigits: 2,})
          }</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={2}></Table.Summary.Cell>
          <Table.Summary.Cell index={3}></Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter) {
      setIsLoading(true);
      getAllOperationReportByFilter({
        dateFrom: filter.dateFrom ?? undefined,
        dateTo: filter.dateTo ?? undefined,
      })
        .then((data) => {
          setAllOperationReport(data?.map((item, index) => ({...item, key: index})));
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
      dataSource={allOperationReport}
      loading={isLoading}
      onChange={handleChangeTable}
      summary={renderSummaryRow}
      pagination={{...tableParams.pagination, position: ["bottomCenter"]}}
    />
  );
};