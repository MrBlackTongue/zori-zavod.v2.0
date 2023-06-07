import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType} from 'antd/es/table';
import {getOperationAccountingById} from "../../../services";
import {TableProps, TypeOperationAccounting, TypeOperationTimesheet, TypeUnit} from "../../../types";
import dayjs from "dayjs";

export const TableOperationAccountingDetail: React.FC<TableProps> = React.memo(({
                                                                                  isUpdateTable,
                                                                                  openDrawer,
                                                                                  onDelete,
                                                                                  idDetail,
                                                                                }) => {
  // Лоудер и учетная операция
  const [isLoading, setIsLoading] = useState(false);
  const [operationAccounting, setOperationAccounting] = useState<TypeOperationAccounting>();

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
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY')}</div>) : null),
    },
    {
      title: 'ID выпуска',
      dataIndex: ['operation', 'id'],
      key: 'operationId',
    },
    {
      title: 'Операция',
      dataIndex: ['operation', 'title'],
      key: 'operationTitle',
    },
    {
      title: 'Ед. изм.',
      dataIndex: ['operation', 'unit', 'name'],
      key: 'unit',
      render: (unit: TypeUnit) =>
        unit !== null ? (<div>{unit.name}</div>) : null,
    },
    {
      title: 'Факт',
      dataIndex: 'fact',
      key: 'fact',
      render: ((fact: number | null) =>
        fact !== null ? (
          <div>
            {fact.toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}
          </div>
        ) : 0)
    },
    {
      title: 'Среднее',
      dataIndex: 'average',
      key: 'average',
      render: ((average: number | null) =>
        average !== null ? (
          <div>
            {average.toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}
          </div>
        ) : 0)
    },
    {
      title: 'Часы',
      dataIndex: 'timeSheets',
      key: 'timeSheets',
      render: (timeSheets: TypeOperationTimesheet[]) =>
        timeSheets
          ? (
            <div>
              {timeSheets
                .reduce((acc, timeSheet) => acc + (timeSheet.hours || 0), 0)
                .toLocaleString('ru-RU')}
            </div>
          ) : 0,
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: ((id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer && openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту учетную операцию?"
              onConfirm={() => onDelete && onDelete(id)}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle"
                      style={{color: 'tomato', borderColor: 'tomato'}} ghost>
                <DeleteOutlined/>
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ))
    },
  ];

  // Обновить учетную операцию
  const handleUpdateTable = useCallback((): void => {
    if (idDetail) {
      setIsLoading(true);
      getOperationAccountingById(idDetail).then((data) => {
        setOperationAccounting(data)
        setIsLoading(false);
      })
    }
  }, [idDetail]);

  useEffect(() => {
    handleUpdateTable()
  }, [idDetail, isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={operationAccounting ? [operationAccounting] : []}
      pagination={false}
      loading={isLoading}
      size="middle"
      style={{marginBottom: '20px'}}
    />
  );
})