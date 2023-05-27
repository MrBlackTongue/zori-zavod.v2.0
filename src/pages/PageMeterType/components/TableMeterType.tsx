import React, {useState, useEffect} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllMeterType} from "../../../services";
import {TableProps, TypeMeterType, TableParams} from "../../../types";

export const TableMeterType: React.FC<TableProps<TypeMeterType>> = ({
                                                                      isUpdateTable,
                                                                      openDrawer,
                                                                      onDelete,
                                                                    }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех типов счетчиков
  const [isLoading, setIsLoading] = useState(false);
  const [allMeterType, setAllMeterType] = useState<TypeMeterType[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeMeterType> = [
    {
      title: 'Счетчик',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Цена за ед. изм',
      dataIndex: 'cost',
      key: 'cost',
      render: ((cost: number | null) =>
        cost !== null ? (
          <div>
            {cost.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        ) : null)
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
      render: ((unit: any) =>
        unit !== null ? (<div key={unit.id}> {unit.name}</div>) : null),
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
              title="Вы действительно хотите удалить этот тип счётчика?"
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

  // Параметры изменения таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TypeMeterType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllMeterType(allMeterType);
    }
  };

  // Функция для обновления таблицы
  const updateTable = () => {
    setIsLoading(true);
    getAllMeterType().then((meterType) => {
      setAllMeterType(meterType);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    updateTable();
  }, [isUpdateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allMeterType}
      loading={isLoading}
      onChange={handleTableChange}
      pagination={{...tableParams.pagination, position: [bottom]}}
      bordered
    />
  );
};