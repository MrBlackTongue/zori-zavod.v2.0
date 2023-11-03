import React, { useCallback, useEffect, useState } from 'react';
import { Button, FloatButton, Popconfirm, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { TableRowSelection } from 'antd/lib/table/interface';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  deleteEmployeeById,
  EMPLOYEE,
  getAllEmployee,
} from '../../../services';
import { TableProps, TypeEmployee } from '../../../types';
import { CustomPopover } from '../../../components/CustomPopover/CustomPopover';
import { useNavigate } from 'react-router-dom';

export const EmployeeTableContainer: React.FC<TableProps> = () => {
  const navigate = useNavigate();

  // Обновление таблицы
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);

  // Spinner и список всех сотрудников
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allEmployee, setAllEmployee] = useState<TypeEmployee[]>();

  // Состояние для выбранных строк
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Параметры для пагинации
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const hasSelected = selectedRowKeys.length > 0;

  // Колонки в таблице
  const columns: ColumnsType<TypeEmployee> = [
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
      width: 250,
    },
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
      width: 250,
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
      width: 250,
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
      width: 250,
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
  ];

  // Переход на другую страницу по адресу
  const handleNavigateToEmployeeForm = (id?: number): void => {
    const path = id ? `${EMPLOYEE}/${id}` : EMPLOYEE;
    navigate(path);
  };

  // Параметры изменения таблицы
  const handleChangeTable = (pagination: TablePaginationConfig): void => {
    setPagination(prevPagination => ({
      current: pagination.current ?? prevPagination.current,
      pageSize: pagination.pageSize ?? prevPagination.pageSize,
    }));
  };

  // Обработчик выбора строк
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // Обновляем состояние с новыми выбранными ключами
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Конфигурация для `rowSelection`
  const rowSelection: TableRowSelection<TypeEmployee> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Функция массового удаления
  const handleDeleteSelected = async () => {
    setIsLoading(true);
    // Проходим по всем выбранным ключам и удаляем соответствующие записи
    await Promise.all(
      selectedRowKeys.map(key => deleteEmployeeById(Number(key))),
    );
    // Сбрасываем выбранные ключи
    setSelectedRowKeys([]);
    setIsUpdateTable(prev => !prev);
    setIsLoading(false);
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ marginBottom: 16 }}>
          <Popconfirm
            placement="topRight"
            disabled={!hasSelected}
            title="Вы действительно хотите удалить выбранные записи из таблицы?"
            onConfirm={() => handleDeleteSelected()}
            onCancel={() => setSelectedRowKeys([])}
            okText="Да"
            cancelText="Отмена">
            <Button type="primary" disabled={!hasSelected} danger>
              <DeleteOutlined /> Удалить
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Выбранные элементы ${selectedRowKeys.length}` : ''}
          </span>
        </div>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleNavigateToEmployeeForm()}>
            Добавить
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        bordered
        size="middle"
        columns={columns}
        dataSource={allEmployee}
        loading={isLoading}
        onChange={handleChangeTable}
        rowSelection={rowSelection}
        onRow={record => {
          return {
            onClick: () => handleNavigateToEmployeeForm(record.id),
          };
        }}
        pagination={{
          ...pagination,
          position: ['bottomCenter'],
          totalBoundaryShowSizeChanger: 10,
        }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'table-even-row' : 'table-odd-row'
        }
      />
      <FloatButton.BackTop />
    </div>
  );
};
