import React, {useState, useEffect, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {getAllProductReportByFilter} from "../../../services";
import {
  TableParam,
  TableProps,
  TypeProductReport,
  TypeProductReportFilter,
} from "../../../types";

export const TableProductReport: React.FC<TableProps<TypeProductReportFilter>> = ({
                                                                                    isUpdateTable,
                                                                                    filter
                                                                                  }) => {
  // Лоудер и список всех отчетов
  const [isLoading, setIsLoading] = useState(false);
  const [allProductReport, setAllProductReport] = useState<TypeProductReport[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeProductReport> = [
    {
      title: "Операция",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      title: "Результат",
      dataIndex: "fact",
      key: "fact",
      width: 130,
    },
    {
      title: "Ед.изм",
      dataIndex: "unit",
      key: "unit",
      width: 100,
    },
    {
      title: "Часы",
      dataIndex: "hours",
      key: "hours",
      width: 100,
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для расчета итоговых значений
  const renderSummaryRow = () => {
    if (!allProductReport) return null
    let totalHours = 0;

    allProductReport.forEach(({hours}: TypeProductReport) => {
      totalHours += hours ?? 0;
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}><strong>Итого</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={1}></Table.Summary.Cell>
          <Table.Summary.Cell index={2}></Table.Summary.Cell>
          <Table.Summary.Cell index={3}><strong>{
            totalHours.toLocaleString('ru-RU', {maximumFractionDigits: 2,})
          }</strong></Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };
  
  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter) {
      setIsLoading(true);
      getAllProductReportByFilter({
        dateFrom: filter.dateFrom ?? undefined,
        dateTo: filter.dateTo ?? undefined,
        productId: filter.productId ?? undefined,
      })
        .then((data) => {
          setAllProductReport(data?.map((item, index) => ({...item, key: index})));
          setIsLoading(false);
        })
        .catch((error) => console.error("Ошибка при получении данных: ", error))
    }
  }, [filter]);

  useEffect(() => {
    handleFilterTable();
  }, [filter, isUpdateTable, handleFilterTable]);

  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={allProductReport}
        loading={isLoading}
        onChange={handleChangeTable}
        summary={renderSummaryRow}
        pagination={{...tableParams.pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
      />
    </div>
  );
};