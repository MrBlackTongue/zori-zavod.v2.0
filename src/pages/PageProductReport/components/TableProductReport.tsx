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
  const [allProductReports, setAllProductReports] = useState<TypeProductReport[]>();

  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<TypeProductReport> = [
    {
      title: "Операция",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Результат",
      dataIndex: "fact",
      key: "fact",
    },
    {
      title: "Часы",
      dataIndex: "hours",
      key: "hours",
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
    if (!allProductReports) return null
    let totalHours = 0;

    allProductReports.forEach(({hours}: TypeProductReport) => {
      totalHours += hours ?? 0;
    });


    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}><strong>Итого</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={1}></Table.Summary.Cell>
          <Table.Summary.Cell index={2}><strong>{
            totalHours.toLocaleString('ru-RU', {maximumFractionDigits: 2,})
          }</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={3}></Table.Summary.Cell>
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
          setAllProductReports(data?.map((item, index) => ({...item, key: index})));
          setIsLoading(false);
        })
        .catch((error) => console.error("Ошибка при получении данных: ", error))
    }
  }, [filter]);

  useEffect(() => {
    if (filter?.dateFrom || filter?.dateTo || filter?.productId) {
      handleFilterTable();
    }
  }, [filter, isUpdateTable, handleFilterTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allProductReports}
      loading={isLoading}
      onChange={handleChangeTable}
      summary={renderSummaryRow}
      pagination={{...tableParams.pagination, position: ["bottomCenter"]}}
    />
  );
};