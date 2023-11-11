import React from 'react';
import { Button, FloatButton, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { TableRowSelection } from 'antd/lib/table/interface';
import { TypeEmployee } from '../../../../types';
import { CustomPopover } from '../../../atoms/CustomPopover/CustomPopover';

type EmployeeTableViewProps = {
  allEmployee: TypeEmployee[] | undefined;
  isLoading: boolean;
  pagination: TablePaginationConfig;
  selectedRowKeys: React.Key[];
  hasSelected: boolean;
  rowSelection: TableRowSelection<TypeEmployee>;
  handleNavigateToEmployeeForm: (id?: number) => void;
  handleChangeTable: (pagination: TablePaginationConfig) => void;
  handleDeleteSelected: () => void;
  handleClearSelected: () => void;
};

export const EmployeeTableView: React.FC<EmployeeTableViewProps> = ({
  allEmployee,
  isLoading,
  pagination,
  selectedRowKeys,
  hasSelected,
  rowSelection,
  handleNavigateToEmployeeForm,
  handleChangeTable,
  handleDeleteSelected,
  handleClearSelected,
}) => {
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

  return (
    <div>
      <div className="flex space-between">
        <Space style={{ marginBottom: 16 }}>
          <Popconfirm
            placement="topRight"
            disabled={!hasSelected}
            title="Вы действительно хотите удалить выбранные записи из таблицы?"
            onConfirm={handleDeleteSelected}
            onCancel={handleClearSelected}
            okText="Да"
            cancelText="Отмена">
            <Button type="primary" disabled={!hasSelected} danger>
              <DeleteOutlined /> Удалить
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Выбранные элементы ${selectedRowKeys.length}` : ''}
          </span>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleNavigateToEmployeeForm()}>
          Добавить
        </Button>
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
