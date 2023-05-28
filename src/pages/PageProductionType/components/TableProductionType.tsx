import React, {useState, useEffect} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {getAllProductionType,} from "../../../services";
import {TableProps, TypeProductionType, TableParams} from "../../../types";

export const TableProductionType: React.FC<TableProps> = ({
                                                            isUpdateTable,
                                                            openDrawer,
                                                            onDelete,
                                                          }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список типов производства
  const [isLoading, setIsLoading] = useState(false);
  const [allProductionType, setAllProductionType] = useState<TypeProductionType[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeProductionType> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
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
              title="Вы действительно хотите удалить этот тип производства?"
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
    sorter: SorterResult<TypeProductionType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProductionType(allProductionType);
    }
  };

  // Функция для обновления таблицы
  const updateTable = () => {
    setIsLoading(true);
    getAllProductionType().then((allProductionType) => {
      setAllProductionType(allProductionType);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    updateTable();
  }, [isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allProductionType}
      pagination={{
        position: [bottom],
        current: tableParams?.pagination?.current,
        pageSize: tableParams?.pagination?.pageSize,
      }}
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
}