import React, {useEffect, useState} from 'react';
import {
  Space,
  Button,
  Table,
  Tooltip,
  Popconfirm,
} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import type {SorterResult} from 'antd/es/table/interface';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  getAllOperations,
  deleteOperationById,
} from "../../services";
import {OperationsTableProps, OperationTypes, TableParams} from "../../types";

export const TableOperations: React.FC<OperationsTableProps> = ({
                                                                  updateTable,
                                                                  openDrawer,
                                                                }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех операций
  const [loading, setLoading] = useState(false);
  const [allOperations, setAllOperations] = useState<OperationTypes[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<OperationTypes> = [
    {
      title: 'Операция',
      dataIndex: 'title',
      key: 'title',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.title < b.title ? -1 : 1,
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
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: ((id: number) => (
        <Space>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => {
                openDrawer(id)
              }}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              title="Вы действительно хотите удалить эту операцию?"
              onConfirm={() => {
                deleteOperationById(id).then(() => {
                  getAllOperations().then((allOperations) => setAllOperations(allOperations))
                })
              }}
              okText="Да"
              cancelText="Отмена">
              <Button type="primary" size="small" shape="circle" style={{color: 'tomato', borderColor: 'tomato'}} ghost onClick={() => {
              }}>
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
    sorter: SorterResult<OperationTypes>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllOperations([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllOperations().then((allOperations) => {
      setAllOperations(allOperations);
      setLoading(false);
    });
  }, [!updateTable]);

  return (
    <Table
      columns={columns}
      dataSource={allOperations}
      pagination={{position: [bottom]}}
      // pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};