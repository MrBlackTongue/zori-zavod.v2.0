import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  TableProps,
  TypeEmployee,
  TypeOperationTimesheet,
} from '../../../types';
import { getOperationTimesheetByIdOperationAccounting } from '../../../services';
import { renderNumber } from '../../../utils';

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
        defaultSortOrder: 'ascend',
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
        title: 'Действия',
        dataIndex: 'id',
        key: 'id',
        width: 100,
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
        columns={columns}
        dataSource={allOperationTimesheet}
        pagination={false}
        loading={isLoading}
        size="small"
        style={{ marginBottom: '20px' }}
      />
    );
  },
);
