import React, {useState, useEffect, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {getAllOutput} from "../../../services";
import {
  TableParam,
  TypeOutput,
  TypeOutputReportFilter,
} from "../../../types";

type TableOutputReportProps = {
  filter: TypeOutputReportFilter;
  isUpdateTable: boolean;
}

export const TableOutputReport: React.FC<TableOutputReportProps> = ({
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
    },
    {
      title: "Продукт",
      dataIndex: ["product", "title"],
      key: "product",
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
      getAllOutput().then((data) => {
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