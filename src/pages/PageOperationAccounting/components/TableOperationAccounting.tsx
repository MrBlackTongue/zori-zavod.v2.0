import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  getAllOperationAccountingByFilter,
  OPERATION_ACCOUNTING,
} from '../../../services';
import {
  TableProps,
  TypeOperationAccounting,
  TypeOperationAccountingFilter,
  TypeOperationTimesheet,
  TypeUnit,
} from '../../../types';
import dayjs from 'dayjs';
import { renderNumber } from '../../../utils';
import { CustomPopover } from '../../../components/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_INSTRUCTION_CONTENT_MORE_DETAILS,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../components/CustomPopover/ContentPopover';

export const TableOperationAccounting: React.FC<
  TableProps<TypeOperationAccountingFilter>
> = ({ isUpdateTable, openDrawer, onDelete, filter }) => {
  const navigate = useNavigate();

  // Spinner и список всех учетных операций
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allOperationAccounting, setAllOperationAccounting] =
    useState<TypeOperationAccounting[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Сколько всего записей в таблице
  const [total, setTotal] = useState<number>(0);

  // Переход на другую страницу по адресу
  const handleMoreDetail = (id: number): void => {
    navigate(`${OPERATION_ACCOUNTING}/${id}`);
  };

  // Колонки в таблице
  const columns: ColumnsType<TypeOperationAccounting> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'idOperationAccounting',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: any) =>
        date !== null ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
    },
    {
      title: 'ID выпуска',
      dataIndex: ['output', 'id'],
      key: 'outputId',
    },
    {
      title: 'Операция',
      dataIndex: ['operation', 'title'],
      key: 'operationTitle',
    },
    {
      title: 'Ед. изм.',
      dataIndex: ['operation', 'unit'],
      key: 'unit',
      render: (unit: TypeUnit) =>
        unit !== null ? <div>{unit.name}</div> : null,
    },
    {
      title: 'Факт',
      dataIndex: 'fact',
      key: 'fact',
      render: renderNumber,
    },
    {
      title: 'Среднее',
      dataIndex: 'average',
      key: 'average',
      render: renderNumber,
    },
    {
      title: 'Часы',
      dataIndex: 'timeSheets',
      key: 'timeSheets',
      render: (timeSheets: TypeOperationTimesheet[]) =>
        timeSheets ? (
          <div>
            {timeSheets
              .reduce((acc, timeSheet) => acc + (timeSheet.hours ?? 0), 0)
              .toLocaleString('ru-RU')}
          </div>
        ) : (
          0
        ),
    },
    {
      title: (
        <>
          Действия
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                {ACTIONS_OVERVIEW_CONTENT}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_EDIT}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_DELETE}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_MORE_DETAILS}
              </p>
            }
          />
        </>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'center',
      render: (id: number) => (
        <Space>
          <Tooltip title="Подробнее" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              onClick={() => handleMoreDetail(id)}>
              <EllipsisOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer?.(id)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту учетную операцию?"
              onConfirm={() => onDelete?.(id)}
              okText="Да"
              cancelText="Отмена">
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{ color: 'tomato', borderColor: 'tomato' }}
                ghost>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для расчета итоговых значений
  const renderSummaryRow = () => {
    if (!allOperationAccounting) return null;
    let totalFact = 0;
    let totalTimeSheets = 0;
    let totalAverage = 0;

    allOperationAccounting.forEach(
      ({ fact, average, timeSheets }: TypeOperationAccounting) => {
        totalFact += fact ?? 0;
        totalAverage += average ?? 0;

        if (timeSheets) {
          timeSheets.forEach((timeSheet: TypeOperationTimesheet) => {
            totalTimeSheets += timeSheet.hours ?? 0;
          });
        }
      },
    );

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>
            <strong>Итого</strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}></Table.Summary.Cell>
          <Table.Summary.Cell index={2}></Table.Summary.Cell>
          <Table.Summary.Cell index={3}></Table.Summary.Cell>
          <Table.Summary.Cell index={4}></Table.Summary.Cell>
          <Table.Summary.Cell index={5}>
            <strong>
              {totalFact.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
            </strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={6}>
            <strong>
              {totalAverage.toLocaleString('ru-RU', {
                maximumFractionDigits: 2,
              })}
            </strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={7}>
            <strong>
              {totalTimeSheets.toLocaleString('ru-RU', {
                maximumFractionDigits: 2,
              })}
            </strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={8}></Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  // Функция для фильтрации и обновления таблицы
  const handleFilterTable = useCallback((): void => {
    setIsLoading(true);
    getAllOperationAccountingByFilter({
      date: filter?.date,
      operationId: filter?.operationId,
      productionTypeIds: filter?.productionTypeIds,
      pageNumber: pagination?.current,
      pageSize: pagination?.pageSize,
    })
      .then(data => {
        setAllOperationAccounting(data.items);
        setTotal(data.total);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, [filter, pagination]);

  useEffect(() => {
    handleFilterTable();
  }, [isUpdateTable, handleFilterTable, filter, pagination]);

  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={allOperationAccounting}
      loading={isLoading}
      onChange={handleChangeTable}
      summary={renderSummaryRow}
      pagination={{
        ...pagination,
        total,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
      rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
    />
  );
};
