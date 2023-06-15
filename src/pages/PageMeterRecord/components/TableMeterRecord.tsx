import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllMeterRecord} from "../../../services"
import {TableProps, TypeMeterRecord, TableParam, TypeMeter} from "../../../types";
import dayjs from "dayjs";

export const TableMeterRecord: React.FC<TableProps> = ({
                                                         isUpdateTable,
                                                         openDrawer,
                                                         onDelete,
                                                       }) => {
  // Лоудер и список всех типов счетчиков
  const [isLoading, setIsLoading] = useState(false);
  const [allMeterRecord, setAllMeterRecord] = useState<TypeMeterRecord[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeMeterRecord> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: ((date: any) =>
        date !== null ? (<div>{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</div>) : null),
    },
    {
      title: 'Счетчик',
      dataIndex: 'meterDto',
      key: 'meterDto',
      render: (meterDto: TypeMeter) =>
        meterDto !== null ? (<div>{meterDto.description}</div>) : null,
    },
    {
      title: 'Показания',
      dataIndex: 'value',
      key: 'value',
      render: ((value: number | null) =>
        value !== null ? (
          <div>
            {value.toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}
          </div>
        ) : 0)
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
              onClick={() => openDrawer?.(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту запись счетчика?"
              onConfirm={() => onDelete?.(id)}
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

// Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllMeterRecord()
      .then((data) => {
        setAllMeterRecord(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, [])

  useEffect(() => {
    handleUpdateTable();
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allMeterRecord}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...tableParams.pagination, position: ['bottomCenter']}}
    />
  );
};