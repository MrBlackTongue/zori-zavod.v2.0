import React, {useEffect, useState} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {getAllOperation, deleteOperationById} from "../../../services";
import {TableProps, TypeOperation, TableParams} from "../../../types";

export const TableOperation: React.FC<TableProps<TypeOperation>> = ({
                                                                      isUpdateTable,
                                                                      openDrawer,
                                                                    }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех операций
  const [loading, setLoading] = useState(false);
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeOperation> = [
    {
      title: 'Операция',
      dataIndex: 'title',
      key: 'title',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => (a.title ?? '') < (b.title ?? '') ? -1 : 1,
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
      render: ((unit: any) =>
        unit !== null ? (<div key={unit.id}> {unit.name}</div>) : null),
    },
    {
      title: 'Норма',
      dataIndex: 'rate',
      key: 'rate',
      sorter: (a, b) => (a.rate ?? 0) < (b.rate ?? 0) ? -1 : 1,
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
              onClick={() => openDrawer(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить эту операцию?"
              onConfirm={() => {
                deleteOperationById(id).then(() => {
                  getAllOperation().then((allOperations) => setAllOperation(allOperations))
                })
              }}
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
    sorter: SorterResult<TypeOperation>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllOperation([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllOperation().then((allOperations) => {
      setAllOperation(allOperations);
      setLoading(false);
    });
  }, [isUpdateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allOperation}
      pagination={{position: [bottom]}}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};