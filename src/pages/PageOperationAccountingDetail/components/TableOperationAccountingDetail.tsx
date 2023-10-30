import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getOperationAccountingById } from '../../../services';
import {
  TableProps,
  TypeOperationAccounting,
  TypeOperationTimesheet,
  TypeUnit,
} from '../../../types';
import dayjs from 'dayjs';
import { renderNumber } from '../../../utils';
import { CustomPopover } from '../../../components/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../components/CustomPopover/ContentPopover';

export const TableOperationAccountingDetail: React.FC<TableProps> = React.memo(
  ({ isUpdateTable, openDrawer, onDelete, idDetail }) => {
    // Spinner и учетная операция
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [operationAccounting, setOperationAccounting] =
      useState<TypeOperationAccounting>();

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

    // Обновить учетную операцию
    const handleUpdateTable = useCallback((): void => {
      if (idDetail) {
        setIsLoading(true);
        getOperationAccountingById(idDetail)
          .then(data => {
            setOperationAccounting(data);
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
        size="middle"
        columns={columns}
        dataSource={operationAccounting ? [operationAccounting] : []}
        pagination={false}
        loading={isLoading}
        style={{ marginBottom: '20px' }}
        rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
      />
    );
  },
);
