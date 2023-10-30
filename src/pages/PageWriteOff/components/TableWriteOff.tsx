import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { getAllWriteOff } from '../../../services';
import {
  TableProps,
  TypeEmployee,
  TypeProductionType,
  TypeWriteOff,
} from '../../../types';
import { CustomPopover } from '../../../components/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_INSTRUCTION_CONTENT_MORE_DETAILS,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../components/CustomPopover/ContentPopover';

export const TableWriteOff: React.FC<TableProps> = ({
  isUpdateTable,
  openDrawer,
  onDelete,
  openDetailDrawer,
}) => {
  // Spinner и список всех списаний
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allWriteOff, setAllWriteOff] = useState<TypeWriteOff[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeWriteOff> = [
    {
      title: 'Сотрудник',
      dataIndex: 'employee',
      key: 'employee',
      width: 300,
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.employee?.lastName ?? 0) < (b.employee?.lastName ?? 0) ? -1 : 1,
      render: (employee: TypeEmployee) => (
        <div>
          {employee.lastName} {employee.firstName}
        </div>
      ),
    },
    {
      title: 'Тип производства',
      dataIndex: 'productionType',
      key: 'productionType',
      width: 300,
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.productionType?.title ?? 0) < (b.productionType?.title ?? 0)
          ? -1
          : 1,
      render: (productionType: TypeProductionType) => (
        <div>{productionType.title}</div>
      ),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: (
        <>
          Действия
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                {ACTIONS_OVERVIEW_CONTENT}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_EDIT}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_DELETE}
                <br />
                <br />
                {ACTIONS_INSTRUCTION_CONTENT_MORE_DETAILS}
              </p>
            }
          />
        </>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'center',
      render: (id: number) => (
        <Space>
          <Tooltip title="Подробнее" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              onClick={() => id && openDetailDrawer?.(id)}>
              <EllipsisOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Изменить" placement="bottomRight">
            <Button
              type="primary"
              size="small"
              shape="circle"
              ghost
              onClick={() => openDrawer?.(id)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Удалить" placement="bottomRight">
            <Popconfirm
              placement="topRight"
              title="Вы действительно хотите удалить это списание со склада?"
              onConfirm={() => onDelete?.(id)}
              okText="Да"
              cancelText="Отмена">
              <Button
                type="primary"
                size="small"
                shape="circle"
                style={{ color: 'tomato', borderColor: 'tomato' }}
                ghost>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Функция для обновления таблицы
  const handleUpdateTable = useCallback((): void => {
    setIsLoading(true);
    getAllWriteOff()
      .then(data => {
        setAllWriteOff(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Ошибка при получении данных: ', error));
  }, []);

  useEffect(() => {
    handleUpdateTable();
  }, [isUpdateTable, handleUpdateTable]);

  return (
    <Table
      rowKey="id"
      bordered
      size="middle"
      columns={columns}
      dataSource={allWriteOff}
      loading={isLoading}
      onChange={handleChangeTable}
      pagination={{
        ...pagination,
        position: ['bottomCenter'],
        totalBoundaryShowSizeChanger: 10,
      }}
      rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
    />
  );
};
