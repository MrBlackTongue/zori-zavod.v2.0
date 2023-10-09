import React, {useState, useEffect, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {getAllOperationReportByFilter} from "../../../services";
import {TableProps, TypeOperationReport, TypeOperationReportFilter,} from "../../../types";
import {renderNumber} from "../../../utils";

export const TableOperationReport: React.FC<TableProps<TypeOperationReportFilter>> = ({
                                                                                        filter,
                                                                                      }) => {
  // Лоудер и список всех отчетов по операциям
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allOperationReport, setAllOperationReport] = useState<TypeOperationReport[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOperationReport> = [
    {
      title: "Название операции",
      dataIndex: "operationName",
      key: "operationName",
      width: 300,
    },
    {
      title: "Часы",
      dataIndex: "hours",
      key: "hours",
      width: 130,
      render: renderNumber,
    },
    {
      title: "Результат",
      dataIndex: "fact",
      key: "fact",
      width: 130,
      render: renderNumber,
    },
    {
      title: "Ед.изм",
      dataIndex: "unit",
      key: "unit",
      width: 100,
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination((prevPagination) => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
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
          <Table.Summary.Cell index={1}>
            <strong>
              {totalHours.toLocaleString('ru-RU', {maximumFractionDigits: 2,})}
            </strong>
          </Table.Summary.Cell>
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
        dateFrom: filter?.dateFrom,
        dateTo: filter?.dateTo,
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
  }, [filter, handleFilterTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allOperationReport}
      loading={isLoading}
      onChange={handleChangeTable}
      summary={renderSummaryRow}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};