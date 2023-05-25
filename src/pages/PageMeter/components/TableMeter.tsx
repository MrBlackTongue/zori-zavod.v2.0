import React, {useState, useEffect, useCallback} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig, SorterResult} from "antd/es/table/interface";
import {TableProps, TableParams, TypeMeter} from "../../../types";
import {getAllMeter} from "../../../services";

export const TableMeter: React.FC<TableProps<TypeMeter>> = ({
                                                              isUpdateTable,
                                                              openDrawer,
                                                              onDelete,
                                                            }) => {
  type TablePaginationPosition = 'bottomCenter'

  // Лоудер и список всех счётчиков
  const [loading, setLoading] = useState(false);
  const [allMeter, setAllMeter] = useState<TypeMeter[]>();

  // Параментры для пагинации
  const [bottom] = useState<TablePaginationPosition>('bottomCenter');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeMeter> = [
    {
      title: 'Тип счётчика',
      dataIndex: 'meterTypeDto',
      key: 'meterTypeDto',
      render: ((meterTypeDto: any) =>
        meterTypeDto !== null ? (<div key={meterTypeDto.id}>{meterTypeDto.title}</div>) : null)
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Серийный номер',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
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
              title="Вы действительно хотите удалить этот счётчик?"
              onConfirm={() => onDelete && onDelete(id)}
              okText="Да"
              cancelText="Отмена"
            >
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{color: "tomato", borderColor: "tomato"}}
                ghost
              >
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
    sorter: SorterResult<TypeMeter>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAllMeter(allMeter);
    }
  };

  // Функция для обновления таблицы счётчиков
  const updateTable = useCallback(() => {
    setLoading(true);
    getAllMeter().then((allMeter) => {
      setAllMeter(allMeter);
      setLoading(false);
    });
  }, [isUpdateTable]);

  useEffect(() => {
    updateTable();
  }, [updateTable]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allMeter}
      pagination={{
        position: [bottom],
        current: tableParams?.pagination?.current,
        pageSize: tableParams?.pagination?.pageSize,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};