import React, {useState, useEffect, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {getAllOutputReportByFilter} from "../../../services";
import {TableProps, TypeOutputReport, TypeOutputReportFilter,} from "../../../types";
import dayjs from "dayjs";
import {renderNumber} from "../../../utils/numberUtils";

export const TableOutputReport: React.FC<TableProps<TypeOutputReportFilter>> = ({
                                                                                  isUpdateTable,
                                                                                  filter,
                                                                                }) => {
  // Лоудер и список всех output
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allOutputReport, setAllOutputReport] = useState<TypeOutputReport[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOutputReport> = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: "Название операции",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      title: "Результат",
      dataIndex: "fact",
      key: "fact",
      width: 100,
      render: renderNumber,
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
      width: 80,
      render: renderNumber,
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
    if (!allOutputReport) return null
    let totalHours = 0;

    allOutputReport.forEach(({hours}: TypeOutputReport) => {
      totalHours += hours ?? 0;
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}><strong>Итого</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={1}></Table.Summary.Cell>
          <Table.Summary.Cell index={2}></Table.Summary.Cell>
          <Table.Summary.Cell index={3}></Table.Summary.Cell>
          <Table.Summary.Cell index={4}>
            <strong>
              {totalHours.toLocaleString('ru-RU', {maximumFractionDigits: 2,})}
            </strong>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter) {
      setIsLoading(true);
      getAllOutputReportByFilter({
          outputId: filter?.outputId,
          withGrouping: filter?.withGrouping,
        }
      )
        .then((data) => {
          setAllOutputReport(data?.map((item, index) => ({...item, key: index})));
          setIsLoading(false);
        })
        .catch((error) => console.error("Ошибка при получении данных: ", error))
    }
  }, [filter]);

  useEffect(() => {
    handleFilterTable();
  }, [isUpdateTable, filter, handleFilterTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allOutputReport}
      loading={isLoading}
      onChange={handleChangeTable}
      summary={renderSummaryRow}
      pagination={{...pagination, position: ["bottomCenter"], totalBoundaryShowSizeChanger: 10}}
    />
  );
};