import React, { useState, useEffect, useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table/interface";
import { getAllOperationReportByFilter } from "../../../services";
import { TableParam, TableProps, TypeOperationReport, TypeOperationReportFilter } from "../../../types";

export const TableOperationReport: React.FC<TableProps<TypeOperationReportFilter>> = ({ isUpdateTable, filter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allOperationReports, setAllOperationReports] = useState<TypeOperationReport[]>();

  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

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

  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({ pagination });
  };

  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    if (filter) {
      getAllOperationReportByFilter(filter)
        .then((data) => {
          setAllOperationReports(data?.map((item, index) => ({ ...item, key: index })));
          setIsLoading(false);
        })
        .catch((error) => console.error("Ошибка при получении данных: ", error));
    }
  }, [filter]);

  useEffect(() => {
    handleUpdateTable();
  }, [filter, isUpdateTable, handleUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allOperationReports}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{ ...tableParams.pagination, position: ["bottomCenter"] }}
    />
  );
};