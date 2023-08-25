import React, {useState, useEffect, useCallback} from "react";
import {Table} from "antd";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {getAllCostPriceByFilter} from "../../../services";
import {TableProps, TypeCostPrice, TypeCostPriceFilter,} from "../../../types";

export const TableCostPrice: React.FC<TableProps<TypeCostPriceFilter>> = ({
                                                                            isUpdateTable,
                                                                            filter,
                                                                          }) => {
  // Лоудер и список всех отчетов по себестоимости
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allCostPrice, setAllCostPrice] = useState<TypeCostPrice[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeCostPrice> = [
    {
      title: "Название операции",
      dataIndex: "operationTitle",
      key: "operationTitle",
      width: 300,
    },
    {
      title: "Расходы на зарплату",
      dataIndex: "salaryExpenses",
      key: "salaryExpenses",
      width: 150,
      render: ((salaryExpenses: number | null) =>
        salaryExpenses !== null ? (
          <div>
            {salaryExpenses.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 2,
            })}
          </div>
        ) : 0)
    },
    {
      title: "Материальные расходы",
      dataIndex: "materialExpenses",
      key: "materialExpenses",
      width: 150,
      render: ((materialExpenses: number | null) =>
        materialExpenses !== null ? (
          <div>
            {materialExpenses.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 2,
            })}
          </div>
        ) : 0)
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
    if (!allCostPrice) return null
    const totalExpenses = allCostPrice.reduce(
      (acc, {salaryExpenses, materialExpenses}: TypeCostPrice) => {
        return {
          totalSalaryExpenses: acc.totalSalaryExpenses + (salaryExpenses ?? 0),
          totalMaterialExpenses: acc.totalMaterialExpenses + (materialExpenses ?? 0),
        };
      }, {totalSalaryExpenses: 0, totalMaterialExpenses: 0});

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}><strong>Итого по столбцам</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <strong>
              {totalExpenses.totalSalaryExpenses.toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 2,
              })}
            </strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <strong>
              {totalExpenses.totalMaterialExpenses.toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 2,
              })}
            </strong>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}><strong>Итого за выпуск</strong></Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={2}>
            <div style={{width: '200%', position: 'relative', left: '40%'}}>
              <strong>
                {(totalExpenses.totalSalaryExpenses + totalExpenses.totalMaterialExpenses).toLocaleString('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  // Функция для фильтрации таблицы
  const handleFilterTable = useCallback((): void => {
    if (filter) {
      setIsLoading(true);
      getAllCostPriceByFilter({
        outputId: filter?.outputId,
      })
        .then((data) => {
          setAllCostPrice(data?.map((item, index) => ({...item, key: index})));
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
      dataSource={allCostPrice}
      loading={isLoading}
      onChange={handleChangeTable}
      summary={renderSummaryRow}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};