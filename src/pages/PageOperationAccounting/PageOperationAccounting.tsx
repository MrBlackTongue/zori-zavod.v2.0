import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Select, DatePicker, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  getAllOperation,
  createOperationAccounting,
  editOperationAccounting,
  deleteOperationAccountingById,
  getAllProductionType,
} from "../../services";
import {TypeOperation, TypeOperationAccounting, TypeProductionType} from "../../types";
import {TableOperationAccounting} from "./components/TableOperationAccounting";
import {AddModalOperationAccounting} from "./components/AddModalOperationAccounting";
import {EditDrawerOperationAccounting} from "./components/EditDrawerOperationAccounting";
import dayjs from "dayjs";

const {Title} = Typography;
const {Option} = Select;

export const PageOperationAccounting: React.FC = () => {

  // Обновление таблицы, id выбраной учетной операции
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedOperationAccountingId, setSelectedOperationAccountingId] = useState<number>();

  // Открыть закрыть модальное окно, дравер, дата
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [date, setDate] = useState<any>();

  // Все операции, id выбранной операции
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();
  const [selectedOperationId, setSelectedOperationId] = useState<number>();

  // Все типы производства, id выбранного типа производства
  const [allProductionType, setAllProductionType] = useState<TypeProductionType[]>();
  const [selectedProductionTypeId, setSelectedProductionTypeId] = useState<number>();

  // Добавить новую учетную операцию
  const handleAddOperationAccounting = (values: TypeOperationAccounting): void => {
    const operationAccounting: TypeOperationAccounting = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD'): undefined,
      fact: values.fact || undefined,
      operation: {
        id: values.operation?.id,
        title: values.operation?.title,
      },
      output: values.output
        ? {
          id: values.output.id,
          date: values.output.date,
          product: {
            id: values.output?.product?.id,
            productGroup: values.output?.product?.productGroup,
            title: values.output?.product?.title,
            unit: values.output?.product?.unit,
          }
        }
        : undefined,
      productionType: values.productionType,
    };
    setIsModalOpen(false)
    createOperationAccounting(operationAccounting)
    setDate(date)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (operationAccountingId: number): void => {
    setSelectedOperationAccountingId(operationAccountingId)
    setIsDrawerOpen(true);
  };

  // Изменить выбранную операцию
  const onChangeOperation = (value: string, option: any): void => {
    setSelectedOperationId(value !== undefined ? option.id : undefined);
  };

  // Изменить выбранный тип производства
  const onChangeProductionType = (value: string, option: any): void => {
    setSelectedProductionTypeId(value !== undefined ? option.id : undefined);
  };

  // Обновить учетную операцию
  const handleUpdateOperationAccounting = (values: TypeOperationAccounting): void => {
    const operationAccounting: TypeOperationAccounting = {
      id: selectedOperationAccountingId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD'): undefined,
      fact: values.fact || undefined,
      operation: {
        id: values.operation?.id,
      },
      output: values.output ? {id: values.output.id} : undefined,
      productionType: {id: values.productionType?.id},
    };
    setIsDrawerOpen(false)
    editOperationAccounting(operationAccounting)
    setDate(date)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteOperationAccounting = (id: number): void => {
    deleteOperationAccountingById(id)
    setIsTableUpdate(prevState => !prevState)
  };

  useEffect(() => {
    getAllOperation().then((allOperation) => {
      setAllOperation(allOperation);
    });
  }, []);

  useEffect(() => {
    getAllProductionType().then((allProductionType) => {
      setAllProductionType(allProductionType);
    });
  }, []);

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
          <Select
            showSearch
            allowClear
            placeholder='Тип производства'
            onChange={onChangeProductionType}
            style={{'width': '250px'}}
          >
            {allProductionType && allProductionType.length > 0 ?
              allProductionType.map(productionType => (
                <Option id={productionType.id} key={productionType.id} value={productionType.title}>
                  {productionType.title}
                </Option>
              )) : null}
          </Select>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsTableUpdate(prevState => !prevState)}
            className='greenButton'
          >
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
      <FloatButton.BackTop/>
      <TableOperationAccounting
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeleteOperationAccounting}
        filter={{
          date: date,
          operationId: selectedOperationId,
          productionTypeId: selectedProductionTypeId,
        }}
      />
      <AddModalOperationAccounting
        isOpen={isModalOpen}
        addItem={handleAddOperationAccounting}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerOperationAccounting
        isOpen={isDrawerOpen}
        selectedItemId={selectedOperationAccountingId}
        updateItem={handleUpdateOperationAccounting}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}