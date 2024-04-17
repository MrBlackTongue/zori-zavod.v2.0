import React from 'react';
import { Table } from 'antd';
import { TypeProductMovement, TypeStock } from '../../../../types';
import { EditableSelect } from '../../../molecules/EditableSelect/EditableSelect';
import { EditableInputNumber } from '../../../molecules/EditableInputNumber/EditableInputNumber';
import { renderNumber } from '../../../../utils';
import { DeleteRowButton } from '../../../atoms/DeleteRowButton/DeleteRowButton';
import { AddNewRowButton } from '../../../atoms/AddNewRowButton/AddNewRowButton';
import { getAllStock } from '../../../../api';

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface ProductMovementTableViewProps {
  dataSource: TypeProductMovement[];
  isLoading: boolean;
  addNewRow: () => void;
  deleteRow: (row: TypeProductMovement) => Promise<void>;
  onSaveAmount: (row: TypeProductMovement) => Promise<void>;
  onSaveStock: (key: string, stockId: number | undefined) => Promise<void>;
}

export const ProductMovementTableView: React.FC<
  ProductMovementTableViewProps
> = ({
  dataSource,
  isLoading,
  addNewRow,
  deleteRow,
  onSaveAmount,
  onSaveStock,
}) => {
  const columns: ColumnTypes = [
    {
      title: '',
      dataIndex: 'number',
      width: 40,
      render: (_, __, index) => index + 1 + '.',
    },
    {
      title: 'Товар',
      dataIndex: ['stock', 'item'],
      width: '40%',
      render: (_, record) => (
        <EditableSelect
          value={record.stock?.id}
          label={record.stock?.item?.title}
          placeholder="Выберите товар"
          fetchDataList={getAllStock}
          getId={item => item.id ?? 0}
          getLabel={item => item?.item?.title ?? ''}
          onValueChange={value => onSaveStock(record.key, value)}
        />
      ),
    },
    {
      title: 'Движение +/-',
      dataIndex: 'amount',
      width: '20%',
      render: (_, record: TypeProductMovement) => (
        <EditableInputNumber
          dataIndex="amount"
          record={record}
          save={onSaveAmount}>
          {renderNumber(record.amount)}{' '}
          <span style={{ color: '#61666D' }}>
            {record.stock?.item?.unit?.name}
          </span>
        </EditableInputNumber>
      ),
    },
    {
      title: 'На складе',
      dataIndex: 'stock',
      render: (stock: TypeStock) => {
        const amount = stock?.amount ?? 0;
        const unitName = stock?.item?.unit?.name ?? '';
        return (
          <>
            {renderNumber(amount)}{' '}
            <span style={{ color: '#61666D' }}>{unitName}</span>
          </>
        );
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      width: '3%',
      align: 'center',
      render: (_, record) => (
        <DeleteRowButton record={record} deleteRow={deleteRow} />
      ),
    },
  ];

  return (
    <div>
      <Table
        bordered
        size={'small'}
        pagination={false}
        loading={isLoading}
        className={'editable-table'}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columns}
      />
      <AddNewRowButton onClick={addNewRow} />
    </div>
  );
};
