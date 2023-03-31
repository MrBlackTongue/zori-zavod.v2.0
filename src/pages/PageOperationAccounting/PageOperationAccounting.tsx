import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Form, Input, Select, DatePicker,} from 'antd';
import {SyncOutlined, PlusOutlined, SearchOutlined,} from '@ant-design/icons';
import '../../App.css'
import {getAllOperations, getAllUnits, postNewOperationAccounting, putChangeOperationAccounting} from "../../services";
import {TypeOperation, TypeOperationAccounting, TypeUnit} from "../../types";
import {TableOperationAccounting} from "./components/TableOperationAccounting";
import {AddModalOperationAccounting} from "./components/AddModalOperationAccounting";
import {EditDrawerOperationAccounting} from "./components/EditDrawerOperationAccounting";

const {Title} = Typography;
const {Option} = Select;

export const PageOperationAccounting: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы, учетная операция, выбрана учетная операция по id
  const [updateTable, setUpdateTable] = useState(false);
  const [operationAccounting] = useState<TypeOperationAccounting | null>(null);
  const [selectedOperationAccountingId, setSelectedOperationAccountingId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Текст поиска, дата
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState<any>();

  // Все операции, выбранная операция
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();
  const [selectedOperation, setSelectedOperation] = useState<TypeOperation>();

  // // Добавить новую учетную операцию
  // const addOperationAccounting = (values: { [key: string]: any }): TypeOperationAccounting => {
  //   const operationAccounting: TypeOperationAccounting = {
  //     title: values.title,
  //     operationAccountingGroup: {
  //       id: values.operationAccountingGroup.id,
  //       title: values.operationAccountingGroup.title,
  //     },
  //     operation: {
  //       id: values.operation.id,
  //       name: values.operation.name,
  //     },
  //   };
  //   setIsModalOpen(false)
  //   postNewOperationAccounting(operationAccounting)
  //   setUpdateTable(!updateTable)
  //   return operationAccounting;
  // };

  // Открыть дравер
  const openDrawer = (operationAccountingId: number) => {
    setSelectedOperationAccountingId(operationAccountingId)
    setIsDrawerOpen(true);
  };

  // Изменить выбранную операцию
  const onChangeOperation = (values: string, option: any): TypeOperation => {
    setSelectedOperation(option.id)
    return option.id
  };

  // Обновить учетную операцию
  // const updateOperationAccounting = (values: { [key: string]: any }): TypeOperationAccounting => {
  //   const operationAccounting: TypeOperationAccounting = {
  //     title: values.title,
  //     operationAccountingGroup: {
  //       id: values.operationAccountingGroup.id,
  //       title: values.operationAccountingGroup.title,
  //     },
  //     operation: {
  //       id: values.operation.id,
  //       name: values.operation.name,
  //     },
  //     id: selectedOperationAccountingId,
  //   };
  //   setIsDrawerOpen(false)
  //   putChangeOperationAccounting(operationAccounting)
  //   setUpdateTable(!updateTable)
  //   return operationAccounting
  // };

  useEffect(() => {
    getAllOperations().then((allOperation) => {
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
              setDate(value);
            }}
          />
          <Select
            allowClear
            placeholder='Операция'
            value={selectedOperation ? selectedOperation.title : undefined}
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
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <TableOperationAccounting
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        searchText={searchText}
      />
      {/*<AddModalOperationAccounting*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  addItem={addOperationAccounting}*/}
      {/*  onCancel={() => {*/}
      {/*    setIsModalOpen(false)*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<EditDrawerOperationAccounting*/}
      {/*  isOpen={isDrawerOpen}*/}
      {/*  selectedItemId={selectedOperationAccountingId}*/}
      {/*  updateItem={updateOperationAccounting}*/}
      {/*  closeDrawer={() => {*/}
      {/*    setIsDrawerOpen(false);*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
}