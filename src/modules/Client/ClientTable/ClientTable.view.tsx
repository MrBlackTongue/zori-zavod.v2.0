import React from 'react';
import { Button, FloatButton, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { TypeClient } from '../../../types';
import dayjs from 'dayjs';
import { TableRowSelection } from 'antd/lib/table/interface';

type ClientTableViewProps = {
  allClient: TypeClient[] | undefined;
  isLoading: boolean;
  pagination: TablePaginationConfig;
  selectedRowKeys: React.Key[];
  hasSelected: boolean;
  rowSelection: TableRowSelection<TypeClient>;
  handleNavigateToClientForm: (id?: number) => void;
  handleChangeTable: (pagination: TablePaginationConfig) => void;
  handleDeleteSelected: () => void;
  handleClearSelected: () => void;
};

export const ClientTableView: React.FC<ClientTableViewProps> = ({
  allClient,
  isLoading,
  pagination,
  selectedRowKeys,
  hasSelected,
  rowSelection,
  handleNavigateToClientForm,
  handleChangeTable,
  handleDeleteSelected,
  handleClearSelected,
}) => {
  const columns: ColumnsType<TypeClient> = [
    {
      title: 'Имя',
      dataIndex: 'title',
      key: 'title',
      width: 500,
      showSorterTooltip: false,
      sorter: (a, b) => ((a.title ?? '') < (b.title ?? '') ? -1 : 1),
    },
    {
      title: 'Последняя отгрузка',
      dataIndex: 'lastShipment',
      key: 'lastShipment',
      showSorterTooltip: false,
      sorter: (a, b) =>
        (a.lastShipment ?? '') < (b.lastShipment ?? '') ? -1 : 1,
      render: (date: any) =>
        date !== null ? <div>{dayjs(date).format('DD.MM.YYYY')}</div> : null,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          onClick={() => handleNavigateToClientForm()}>
          Добавить
        </Button>
      </div>
      <Table
        rowKey="id"
        bordered
        size="middle"
        columns={columns}
        dataSource={allClient}
        loading={isLoading}
        onChange={handleChangeTable}
        rowSelection={rowSelection}
        onRow={record => {
          return {
            onClick: () => handleNavigateToClientForm(record.id),
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
