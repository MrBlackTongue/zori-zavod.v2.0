import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAllEmployee } from '../../../services';
import { TableProps, TypeEmployee } from '../../../types';
import { CustomPopover } from '../../../components/CustomPopover/CustomPopover';
import {
  ACTIONS_INSTRUCTION_CONTENT_DELETE,
  ACTIONS_INSTRUCTION_CONTENT_EDIT,
  ACTIONS_OVERVIEW_CONTENT,
} from '../../../components/CustomPopover/ContentPopover';

export const TableEmployee: React.FC<TableProps> = ({
  isUpdateTable,
  openDrawer,
  onDelete,
}) => {
  // Spinner и список всех сотрудников
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allEmployee, setAllEmployee] = useState<TypeEmployee[]>();

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Колонки в таблице
  const columns: ColumnsType<TypeEmployee> = [
    {
      title: (
        <>
          Имя
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть имя сотрудника
              </p>
            }
          />
        </>
      ),
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: (
        <>
          Фамилия
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть фамилию сотрудника
              </p>
            }
          />
        </>
      ),
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: (
        <>
          Телефон
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть телефон сотрудника
              </p>
            }
          />
        </>
      ),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: (
        <>
          Ставка
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть ставку сотрудника в час
              </p>
            }
          />
        </>
      ),
      dataIndex: 'salaryRate',
      key: 'salaryRate',
    },
    {
      title: (
        <>
          Статус найма
          <CustomPopover
            content={
              <p style={{ fontSize: '13px', maxWidth: 350 }}>
                Здесь вы можете увидеть статус найма сотрудника
              </p>
            }
          />
        </>
      ),
      dataIndex: 'hired',
      key: 'hired',
      showSorterTooltip: false,
      sorter: (a, b) => Number(a.hired) - Number(b.hired),
      render: hired => (
        <Tag color={hired ? 'green' : 'volcano'}>
          {hired ? 'Работает' : 'Не работает'}
        </Tag>
      ),
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
              title="Вы действительно хотите удалить этого сотрудника?"
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
    getAllEmployee()
      .then(data => {
        setAllEmployee(data);
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
      dataSource={allEmployee}
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
