import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { GetRef } from 'antd';
import { Form, InputNumber, Table } from 'antd';
import { TypeProduct, TypeProductMovement, TypeStock } from '../../../types';
import { useParams } from 'react-router-dom';
import {
  getProductMovementByIdAndEntityType,
  updateProductMovement,
} from '../../../api';

type InputRef = GetRef<typeof InputNumber>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  stock: number;
  product: string;
  amount: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Ошибка сохранения:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const EditableTable = () => {
  const [dataSource, setDataSource] = useState<TypeProductMovement[]>([]);

  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string[] | string;
  })[] = [
    {
      title: 'Товар',
      dataIndex: ['stock', 'product'],
      width: '40%',
      render: (product: TypeProduct) => product?.title,
    },
    {
      title: 'Корректировка',
      dataIndex: 'amount',
      width: '20%',
      editable: true,
    },
    {
      title: 'На складе',
      dataIndex: 'stock',
      render: (amountInStock: TypeStock) => amountInStock?.amount,
    },
  ];

  const handleSave = async (row: TypeProductMovement) => {
    try {
      const { key, date, ...rowWithoutKeyDate } = row;
      const originalItem = dataSource.find(item => item.key === row.key);
      if (originalItem && originalItem.amount === row.amount) {
        return;
      }

      await updateProductMovement(rowWithoutKeyDate);
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
      console.error('Ошибка при обновлении данных:', error);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TypeProductMovement) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

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
    <Table
      components={components}
      className={'editable-table'}
      rowClassName={() => 'editable-row'}
      bordered
      size={'small'}
      pagination={false}
      dataSource={dataSource}
      columns={columns as ColumnTypes}
    />
  );
};
