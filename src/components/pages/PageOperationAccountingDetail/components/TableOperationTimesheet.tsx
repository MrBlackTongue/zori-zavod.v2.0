import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  TableProps,
  TypeEmployee,
  TypeOperationTimesheet,
} from '../../../../types';
import { getOperationTimesheetByIdOperationAccounting } from '../../../../api';
import { renderNumber } from '../../../../utils';
import { CustomPopover } from '../../../atoms/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../atoms/CustomPopover/ContentPopover';

export const TableOperationTimesheet: React.FC<TableProps> = React.memo(
  ({ isUpdateTable, openDrawer, onDelete, idDetail }) => {
    // Spinner и весь табель учета рабочего времени
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allOperationTimesheet, setAllOperationTimesheet] =
      useState<TypeOperationTimesheet[]>();

    // Колонки в таблице
    const columns: ColumnsType<TypeOperationTimesheet> = [
      {
        title: 'Сотрудник',
        dataIndex: 'employee',
        key: 'employee',
        showSorterTooltip: false,
        sorter: (a, b) =>
          (a.employee?.lastName ?? 0) < (b.employee?.lastName ?? 0) ? -1 : 1,
        render: (employee: TypeEmployee) => (
          <div>
            {employee.lastName} {employee.firstName}
          </div>
        ),
      },
      {
        title: 'Часы',
        dataIndex: 'hours',
        key: 'hours',
        render: renderNumber,
      },
      {
        title: 'Результат',
        dataIndex: 'fact',
        key: 'fact',
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
                title="Вы действительно хотите удалить этого сотрудника из табеля учета рабочего времени?"
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

    // Функция для расчета итоговых значений
    const renderSummaryRow = () => {
      if (!allOperationTimesheet) return null;
      let totalHours = 0;
      let totalResult = 0;

      allOperationTimesheet.forEach(
        ({ hours, fact }: TypeOperationTimesheet) => {
          totalHours += hours ?? 0;
          totalResult += fact ?? 0;
        },
      );

      return (
        <>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>
              <strong>Итого</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              <strong>
                {totalHours.toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <strong>
                {totalResult.toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </strong>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </>
      );
    };

    // Обновить таблицу
    const handleUpdateTable = useCallback(() => {
      if (idDetail) {
        setIsLoading(true);
        getOperationTimesheetByIdOperationAccounting(idDetail)
          .then(data => {
            setAllOperationTimesheet(data);
            setIsLoading(false);
          })
          .catch(error =>
            console.error('Ошибка при получении данных: ', error),
          );
      }
    }, [idDetail]);

    useEffect(() => {
      handleUpdateTable();
    }, [idDetail, isUpdateTable, handleUpdateTable]);

    return (
      <Table
        rowKey="id"
        bordered
        size="small"
        columns={columns}
        dataSource={allOperationTimesheet}
        pagination={false}
        loading={isLoading}
        summary={renderSummaryRow}
        style={{ marginBottom: '20px' }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'table-even-row' : 'table-odd-row'
        }
      />
    );
  },
);
