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

  const [loading, setLoading] = useState(false);
  const [allMeterType, setAllMeterType] = useState<TypeMeterType[]>();
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<TypeMeterType> = [
    {
      title: 'Счетчик',
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
              title="Вы действительно хотите удалить этот счетчик?"
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TypeMeterType>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
  };

  useEffect(() => {
    setLoading(true);
    getAllMeterType().then((meterType) => {
      setAllMeterType(meterType);
      setLoading(false);
    });
  }, [isUpdateTable]);

  return (
    <Table<TypeMeterType>
      columns={columns}
      dataSource={allMeterType}
      loading={loading}
      onChange={handleTableChange}
      pagination={{...tableParams.pagination, position: [bottom]}}
    />
  );
};