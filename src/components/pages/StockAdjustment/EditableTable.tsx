import React, { useCallback, useEffect, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { TypeProductMovement, TypeStock } from '../../../types';
import { useParams } from 'react-router-dom';
import {
  createProductionProductMovement,
  deleteProductMovementByIdAndEntityType,
  getAllStock,
  getProductMovementByIdAndEntityType,
  updateProductMovement,
} from '../../../api';
import { EditableSelect } from '../../molecules/EditableSelect/EditableSelect';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { EditableInputNumber } from '../../molecules/EditableInputNumber/EditableInputNumber';
import { renderNumber } from '../../../utils';

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const EditableTable = () => {
  const [dataSource, setDataSource] = useState<TypeProductMovement[]>([]);

  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;

  const columns: ColumnTypes = [
    {
      title: '',
      dataIndex: 'number',
      width: 40,
      render: (_, __, index) => index + 1 + '.',
    },
    {
      title: 'Товар',
      dataIndex: ['stock', 'product'],
      width: '40%',
      render: (_, record) => (
        <EditableSelect
          value={record.stock?.id}
          isEditable={true}
          placeholder="Выберите товар"
          fetchDataList={getAllStock}
          getId={item => item.id ?? 0}
          getLabel={item => item?.product?.title ?? ''}
          onValueChange={value => handleStockChange(record.key, value)}
        />
      ),
    },
    {
      title: 'Движение',
      dataIndex: 'amount',
      width: '20%',
      render: (_, record) => (
        <EditableInputNumber
          dataIndex="amount"
          record={record}
          handleSave={handleSave}>
          {renderNumber(record.amount)} {record.stock?.product?.unit?.name}
        </EditableInputNumber>
      ),
    },
    {
      title: 'На складе',
      dataIndex: 'stock',
      render: (stock: TypeStock) => {
        const amount = stock?.amount ?? 0;
        const unitName = stock?.product?.unit?.name ?? '';
        return `${renderNumber(amount)} ${unitName}`;
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      width: '3%',
      align: 'center',
      render: (_, record) => (
        <div className={'delete-button'}>
          <Popconfirm
            placement="topLeft"
            title="Вы действительно хотите удалить строку?"
            onConfirm={() => handleDeleteRow(record)}
            okText="Да"
            cancelText="Отмена">
            <Button
              size={'small'}
              style={{ color: 'tomato', borderColor: 'tomato' }}
              type="default"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDeleteRow = async (row: TypeProductMovement) => {
    try {
      if (row.id) {
        await deleteProductMovementByIdAndEntityType(
          'STOCK_ADJUSTMENT',
          row.id,
        );
        setDataSource(prevDataSource => {
          const newData = [...prevDataSource];
          const index = newData.findIndex(item => row.key === item.key);
          newData.splice(index, 1);
          return newData;
        });
        handleUpdateTable();
      } else {
        console.error('Ошибка при удалении данных: отсутствует id');
      }
    } catch (error) {
      console.error('Ошибка при удалении данных:', error);
    }
  };

  const addNewRow = () => {
    const newRow: TypeProductMovement = {
      stock: { id: undefined },
      amount: 0,
    };

    setDataSource(prevDataSource => [
      ...prevDataSource,
      { ...newRow, key: prevDataSource.length.toString() },
    ]);
  };

  const handleSave = async (row: TypeProductMovement) => {
    try {
      const { key, date, ...rowWithoutKeyDate } = row;
      const originalItem = dataSource.find(item => item.key === row.key);

      if (row.id) {
        if (originalItem && originalItem.amount === row.amount) {
          return;
        }
        await updateProductMovement(rowWithoutKeyDate);
      } else {
        if (row.stock?.id && row.amount !== 0) {
          const response = await createProductionProductMovement(
            'STOCK_ADJUSTMENT',
            itemId!,
            rowWithoutKeyDate,
          );
          if (response && response.status && response.data) {
            row.id = response.data.id;
          }
        } else {
          return;
        }
      }

      setDataSource(prevDataSource => {
        const newData = [...prevDataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        return newData;
      });
      handleUpdateTable();
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  const handleStockChange = async (
    key: string,
    stockId: number | undefined,
  ) => {
    try {
      const newData = [...dataSource];
      const index = newData.findIndex(item => key === item.key);
      const item = newData[index];
      const updatedItem = {
        ...item,
        stock: { id: stockId },
        amount: 0,
      };

      if (item.id) {
        await updateProductMovement(updatedItem);
      } else {
        if (itemId) {
          await createProductionProductMovement(
            'STOCK_ADJUSTMENT',
            itemId,
            updatedItem,
          );
          updatedItem.id = dataSource.length + 1;
        }
      }

      setDataSource(prevDataSource => {
        const newData = [...prevDataSource];
        newData.splice(index, 1, updatedItem);
        return newData;
      });

      handleUpdateTable();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    }
  };

  // Обновить таблицу
  const handleUpdateTable = useCallback(() => {
    if (itemId) {
      getProductMovementByIdAndEntityType('STOCK_ADJUSTMENT', itemId)
        .then(data => {
          if (data) {
            const newDataSource = data.map((item, index) => ({
              ...item,
              key: index.toString(),
            }));
            setDataSource(newDataSource);
          }
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [itemId]);

  useEffect(() => {
    handleUpdateTable();
  }, [handleUpdateTable]);

  return (
    <div>
      <Table
        bordered
        size={'small'}
        pagination={false}
        className={'editable-table'}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columns}
      />
      <Button
        type="link"
        icon={<PlusOutlined />}
        style={{ marginTop: 15 }}
        onClick={addNewRow}>
        Добавить
      </Button>
    </div>
  );
};
