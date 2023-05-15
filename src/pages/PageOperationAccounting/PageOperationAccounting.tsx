import React, {useState, useEffect} from 'react';
import {Typography, Space, Button, Select, DatePicker, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  getAllOperation,
  postNewOperationAccounting,
  putChangeOperationAccounting,
  deleteOperationAccountingById,
  getAllProductionArea,
} from "../../services";
import {TypeOperation, TypeOperationAccounting, TypeProductionArea} from "../../types";
import {TableOperationAccounting} from "./components/TableOperationAccounting";
import {AddModalOperationAccounting} from "./components/AddModalOperationAccounting";
import {EditDrawerOperationAccounting} from "./components/EditDrawerOperationAccounting";
import dayjs from "dayjs";

const {Title} = Typography;
const {Option} = Select;

export const PageOperationAccounting: React.FC = () => {

  // Обновление таблицы, выбрана учетная операция по id
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedOperationAccountingById, setSelectedOperationAccountingById] = useState<number>();

  // Открыть закрыть модальное окно, дравер, дата
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [date, setDate] = useState<any>();

  // Все операции, выбранная операция по id
  const [allOperation, setAllOperation] = useState<TypeOperation[]>();
  const [selectedOperationById, setSelectedOperationById] = useState<number>();

  // Все типы производства, выбранный тип по id
  const [allProductionArea, setAllProductionArea] = useState<TypeProductionArea[]>();
  const [selectedProductionAreaById, setSelectedProductionAreaById] = useState<number>();

  // Добавить новую учетную операцию
  const handleAddOperationAccounting = (values: { [key: string]: any }): void => {
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
      productionType: values.productionType,
    };
    setIsModalOpen(false)
    postNewOperationAccounting(operationAccounting)
    setDate(date)
    setSelectedOperationAccountingById(selectedOperationAccountingById)
    setUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (operationAccountingId: number) => {
    setSelectedOperationAccountingById(operationAccountingId)
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

  // Изменить выбранный тип производства
  const onChangeProductionArea = (values: string, option: any): TypeProductionArea | undefined => {
    if (values === undefined) {
      setSelectedProductionAreaById(undefined);
      return undefined;
    }
    setSelectedProductionAreaById(option.id)
    return option.id
  };

  // Обновить учетную операцию
  const handleUpdateOperationAccounting = (values: { [key: string]: any }): void => {
    const operationAccounting: TypeOperationAccounting = {
      id: selectedOperationAccountingById,
      date: values['date'].format('YYYY-MM-DD'),
      fact: values.fact || undefined,
      operation: {
        id: values.operation.id,
      },
      output: values.output ? {id: values.output.id} : undefined,
      productionType: values.productionType,
    };
    setIsDrawerOpen(false)
    putChangeOperationAccounting(operationAccounting)
    setDate(date)
    setSelectedOperationAccountingById(selectedOperationAccountingById)
    setUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteOperationAccounting = (id: number) => {
    deleteOperationAccountingById(id).catch((error) => console.error(error));
    setUpdateTable(prevState => !prevState)
  };

  useEffect(() => {
    getAllOperation().then((allOperation) => {
      setAllOperation(allOperation);
    });
  }, []);

  useEffect(() => {
    getAllProductionArea().then((allProductionArea) => {
      setAllProductionArea(allProductionArea);
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
            onChange={onChangeProductionArea}
            style={{'width': '250px'}}
          >
            {allProductionArea && allProductionArea.length > 0 ?
              allProductionArea.map(productionArea => (
                <Option id={productionArea.id} key={productionArea.id} value={productionArea.title}>
                  {productionArea.title}
                </Option>
              )) : null}
          </Select>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(prevState => !prevState)}
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
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteOperationAccounting}
        filter={{
          date: date,
          operationId: selectedOperationById,
          productionTypeId: selectedProductionAreaById,
        }}
      />
      <AddModalOperationAccounting
        isOpen={isModalOpen}
        addItem={handleAddOperationAccounting}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerOperationAccounting
        isOpen={isDrawerOpen}
        selectedItemId={selectedOperationAccountingById}
        updateItem={handleUpdateOperationAccounting}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}