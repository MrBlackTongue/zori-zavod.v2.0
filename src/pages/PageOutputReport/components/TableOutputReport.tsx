import React, {useState, useEffect, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {getAllProductReportByFilter} from "../../../services";
import {
  TableParam,
  TableProps,
  TypeOutput,
  TypeOutputReportFilter,
} from "../../../types";
import dayjs from "dayjs";

// type TableOutputReportProps = {
//   filter: TypeOutputReportFilter;
//   isUpdateTable: boolean;
// }

export const TableOutputReport: React.FC<TableProps<TypeOutputReportFilter>> = ({
                                                                      filter,
                                                                      isUpdateTable,
                                                                    }) => {
  // Лоудер и список всех output
  const [isLoading, setIsLoading] = useState(false);
  const [allOutputs, setAllOutputs] = useState<TypeOutput[]>();

  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<TypeOutput> = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
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
      title: "Ед.изм",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Часы",
      dataIndex: "hours",
      key: "hours",
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter) {
      setIsLoading(true);
      getAllProductReportByFilter({
        outputId: filter.outputId ?? undefined,
        withGrouping:  filter.withGrouping ?? undefined,
        }
      )
        .then((data) => {
          setAllOutputs(data?.map((item, index) => ({...item, key: index})));
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
      dataSource={allOutputs}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...tableParams.pagination, position: ["bottomCenter"]}}
    />
  );
};