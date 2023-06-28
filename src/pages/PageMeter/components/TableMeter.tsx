import React, {useState, useEffect, useCallback} from "react";
import {Table, Button, Space, Tooltip, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ColumnsType, TablePaginationConfig} from "antd/es/table/interface";
import {TableProps, TableParam, TypeMeter, TypeMeterType} from "../../../types";
import {getAllMeter} from "../../../services";

export const TableMeter: React.FC<TableProps> = ({
                                                   isUpdateTable,
                                                   openDrawer,
                                                   onDelete,
                                                 }) => {

  // Лоудер и список всех счетчиков
  const [loading, setLoading] = useState(false);
  const [allMeter, setAllMeter] = useState<TypeMeter[]>();

  // Параментры для пагинации
  const [tableParams, setTableParams] = useState<TableParam>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeMeter> = [
    {
      title: 'Тип счетчика',
      dataIndex: 'meterTypeDto',
      key: 'meterType',
      render: ((meterTypeDto: TypeMeterType) =>
        meterTypeDto !== null ? (<div>{meterTypeDto.title}</div>) : null)
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
              onClick={() => openDrawer?.(id)}>
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить этот счетчик?"
              onConfirm={() => onDelete?.(id)}
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
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setTableParams({pagination});
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setLoading(true);
    getAllMeter()
      .then((data) => {
        setAllMeter(data);
        setLoading(false);
      })
      .catch((error) => console.error("Ошибка при получении данных: ", error));
  }, []);

  useEffect(() => {
    handleUpdateTable();
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      columns={columns}
      dataSource={allMeter}
      loading={loading}
      onChange={handleChangeTable}
      pagination={{...tableParams.pagination, position: ['bottomCenter'], totalBoundaryShowSizeChanger: 10}}
    />
  );
};