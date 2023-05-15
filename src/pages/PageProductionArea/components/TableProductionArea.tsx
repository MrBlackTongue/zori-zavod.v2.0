import React, {useState, useEffect} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {getAllProductionArea,} from "../../../services";
import {TableProps, TypeProductionArea, TableParams} from "../../../types";

export const TableProductionArea: React.FC<TableProps<TypeProductionArea>> = ({
                                                                                isUpdateTable,
                                                                                openDrawer,
                                                                                onDelete,
                                                                              }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список типов производства
  const [loading, setLoading] = useState(false);
  const [allProductionArea, setAllProductionArea] = useState<TypeProductionArea[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeProductionArea> = [
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
    sorter: SorterResult<TypeProductionArea>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllProductionArea(allProductionArea);
    }
  };

  // Функция для обновления таблицы
  const updateTable = () => {
    setLoading(true);
    getAllProductionArea().then((allProductionArea) => {
      setAllProductionArea(allProductionArea);
      setLoading(false);
    });
  }

  useEffect(() => {
    updateTable();
  }, [isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allProductionArea}
      pagination={{
        position: [bottom],
        current: tableParams?.pagination?.current,
        pageSize: tableParams?.pagination?.pageSize,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}