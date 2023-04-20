import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Select, DatePicker,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {getAllOperation, postNewOperationAccounting, putChangeOperationAccounting} from "../../services";
import {TypeOperation, TypeOperationAccounting} from "../../types";
import {TableOperationAccounting} from "./components/TableOperationAccounting";
import {AddModalOperationAccounting} from "./components/AddModalOperationAccounting";
import {EditDrawerOperationAccounting} from "./components/EditDrawerOperationAccounting";
import dayjs from "dayjs";

const {Title} = Typography;
const {Option} = Select;

export const PageOperationAccounting: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы, учетная операция, выбрана учетная операция по id
  const [updateTable, setUpdateTable] = useState(false);
  const [operationAccounting] = useState<TypeOperationAccounting | null>(null);
  const [selectedOperationAccountingId, setSelectedOperationAccountingId] = useState<number>();

  // Открыть закрыть модальное окно, дравер, дата
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [date, setDate] = useState<any>();

  // Все операции, выбранная операция
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();
  const [selectedOperationById, setSelectedOperationById] = useState<number>();

  // Добавить новую учетную операцию
  const addOperationAccounting = (values: { [key: string]: any }): TypeOperationAccounting => {
    const operationAccounting: TypeOperationAccounting = {
      date: values['date'].format('YYYY-MM-DD'),
      fact: values.fact || undefined,
      operation: {
        id: values.operation.id,
        title: values.operation.title,
      },
      output: values.output
        ? {
          id: values.output.id,
          date: values.output.date,
          product: {
            id: values.output.product.id,
            productGroup: values.output.product.productGroup,
            title: values.output.product.title,
            unit: values.output.product.unit,
          }
        }
        : undefined,
    };
    setIsModalOpen(false)
    postNewOperationAccounting(operationAccounting)
    setDate(date)
    setSelectedOperationAccountingId(selectedOperationAccountingId)
    setUpdateTable(!updateTable)
    return values;
  };

  // Открыть дравер
  const openDrawer = (operationAccountingId: number) => {
    setSelectedOperationAccountingId(operationAccountingId)
    setIsDrawerOpen(true);
  };

  // Изменить выбранную операцию
  const onChangeOperation = (values: string, option: any): TypeOperation | undefined => {
    if (values === undefined) {
      setSelectedOperationById(undefined);
      return undefined;
    }
    setSelectedOperationById(option.id)
    return option.id
  };

  // Обновить учетную операцию
  const updateOperationAccounting = (values: { [key: string]: any }): TypeOperationAccounting => {
    const operationAccounting: TypeOperationAccounting = {
      id: selectedOperationAccountingId,
      date: values['date'].format('YYYY-MM-DD'),
      fact: values.fact || undefined,
      operation: {
        id: values.operation.id,
      },
      output: values.output
        ? {
          id: values.output.id,
        }
        : undefined,
    };
    setIsModalOpen(false)
    putChangeOperationAccounting(operationAccounting)
    setUpdateTable(!updateTable)
    return values;
  };

  useEffect(() => {
    getAllOperation().then((allOperation) => {
      setAllOperation(allOperation);
    });
  }, []);

  useEffect(() => {
    if (operationAccounting) {
      form.setFieldsValue(operationAccounting);
    }
  }, [operationAccounting, form]);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Учет операций</Title>
        <Space>
          <DatePicker
            style={{width: '150px'}}
            format='DD.MM.YYYY'
            onChange={(value) => {
              setDate(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
            }}
          />
          <Select
            showSearch
            allowClear
            placeholder='Операция'
            onChange={onChangeOperation}
            style={{'width': '300px'}}
          >
            {allOperation && allOperation.length > 0 ?
              allOperation.map(operation => (
                <Option id={operation.id} key={operation.id} value={operation.title}>
                  {operation.title}
                </Option>
              )) : null}
          </Select>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <TableOperationAccounting
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        filter={{
          dateFilter: date,
          idFilter: selectedOperationById,
        }}
      />
      <AddModalOperationAccounting
        isOpen={isModalOpen}
        addItem={addOperationAccounting}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerOperationAccounting
        isOpen={isDrawerOpen}
        selectedItemId={selectedOperationAccountingId}
        updateItem={updateOperationAccounting}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}