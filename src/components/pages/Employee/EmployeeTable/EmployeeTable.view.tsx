import React from 'react';
import { FloatButton, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { TableRowSelection } from 'antd/lib/table/interface';
import { TypeEmployee } from '../../../../types';
import { CustomPopover } from '../../../atoms/CustomPopover/CustomPopover';
import { AddButton } from '../../../atoms/AddButton/AddButton';
import { DeleteWithConfirmationButton } from '../../../atoms/DeleteWithConfirmationButton/DeleteWithConfirmationButton';
import { BasicTable } from '../../../molecules/BasicTable/BasicTable';

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
        <DeleteWithConfirmationButton
          hasSelected={hasSelected}
          selectedCount={selectedRowKeys.length}
          onConfirm={handleDeleteSelected}
          onCancel={handleClearSelected}
        />
        <AddButton onClick={() => handleNavigateToEmployeeForm()} />
      </div>
      <BasicTable
        data={allEmployee}
        isLoading={isLoading}
        columns={columns}
        pagination={pagination}
        rowSelection={rowSelection}
        onRowClick={record => handleNavigateToEmployeeForm(record.id)}
        onChangeTable={handleChangeTable}
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'table-even-row' : 'table-odd-row'
        }
      />
      <FloatButton.BackTop />
    </div>
  );
};
