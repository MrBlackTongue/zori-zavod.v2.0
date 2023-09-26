import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllMeterType} from "../../../services";
import {TableProps, TypeMeterType, TypeUnit} from "../../../types";
import {renderAsRuble} from "../../../utils/numberUtils";

export const TableMeterType: React.FC<TableProps> = ({
                                                       isUpdateTable,
                                                       openDrawer,
                                                       onDelete,
                                                     }) => {
  // Лоудер и список всех типов счетчиков
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allMeterType, setAllMeterType] = useState<TypeMeterType[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
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
      render: renderAsRuble,
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
      render: ((unit: TypeUnit) =>
        unit !== null ? (<div> {unit.name}</div>) : null),
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
              title="Вы действительно хотите удалить этот тип счетчика?"
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
    setPagination((prevPagination) => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllMeterType()
      .then((data) => {
        setAllMeterType(data);
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
      dataSource={allMeterType}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{...pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};