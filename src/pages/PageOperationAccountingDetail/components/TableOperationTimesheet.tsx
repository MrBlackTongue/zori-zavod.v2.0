import React, {useState, useEffect, useCallback} from 'react';
import {Space, Button, Table, Tooltip, Popconfirm,} from 'antd';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import type {ColumnsType} from 'antd/es/table';
import {TableProps, TypeOperationTimesheet, TypeEmployee} from "../../../types";
import {getOperationTimesheetByIdOperationAccounting} from "../../../services";

export const TableOperationTimesheet: React.FC<TableProps<TypeOperationTimesheet>> = React.memo(({
                                                                                                   isUpdateTable,
                                                                                                   openDrawer,
                                                                                                   onDelete,
                                                                                                   idDetail,
                                                                                                 }) => {
  // Лоудер и весь табель учета рабочего времени
  const [loading, setLoading] = useState(false);
  const [allOperationTimesheet, setAllOperationTimesheet] = useState<TypeOperationTimesheet[]>();

  // Колонки в таблице
  const columns: ColumnsType<TypeOperationTimesheet> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
      render: (employee: TypeEmployee) => (
        <div>
          {employee.lastName} {employee.firstName}
        </div>
      ),
    },
    {
      title: 'Часы',
      dataIndex: 'hours',
      key: 'hours',
      render: ((hours: number | null) =>
        hours !== null ? (
          <div>
            {hours.toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}
          </div>
        ) : 0)
    },
    {
      title: 'Результат',
      dataIndex: 'fact',
      key: 'fact',
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
              title="Вы действительно хотите удалить этого сотрудника из табеля учета рабочего времени?"
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

  // Обновить таблицу
  const updateOperationTimesheet = useCallback(() => {
    if (idDetail) {
      setLoading(true);
      getOperationTimesheetByIdOperationAccounting(idDetail).then((allOperationTimesheet) => {
        setAllOperationTimesheet(allOperationTimesheet);
        setLoading(false);
      });
    }
  }, [idDetail]);

  useEffect(() => {
    updateOperationTimesheet();
  }, [idDetail, isUpdateTable, updateOperationTimesheet]);

  return (
    <Table
      bordered
      columns={columns}
      dataSource={allOperationTimesheet}
      pagination={false}
      loading={loading}
      size="middle"
    />
  );
})