import React, {useState} from 'react';
import {Typography, Space, Button, Select, DatePicker, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  createOperationAccounting,
  editOperationAccounting,
  deleteOperationAccountingById,
} from "../../services";
import {
  TypeOperationAccounting,
  TypeOperationAccountingFormValue,
} from "../../types";
import {TableOperationAccounting} from "./components/TableOperationAccounting";
import {AddModalOperationAccounting} from "./components/AddModalOperationAccounting";
import {EditDrawerOperationAccounting} from "./components/EditDrawerOperationAccounting";
import dayjs from "dayjs";
import {useFetchAllData} from "../../hooks";

const {Title} = Typography;
const {Option} = Select;

export const PageOperationAccounting: React.FC = () => {

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраной учетной операции, Выбранная дата
  const [selectedOperationAccountingId, setSelectedOperationAccountingId] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<any>();

  // Хук для получения данных
  const {allOperation, allProductionType} = useFetchAllData();

  // id выбранной операции, id выбранного типа производства
  const [selectedOperationId, setSelectedOperationId] = useState<number>();
  const [selectedProductionTypeId, setSelectedProductionTypeId] = useState<number>();

  // Изменить выбранную дату
  const onChangeDate = (value: any): void => {
    setSelectedDate(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
  }

  // Изменить выбранную операцию
  const onChangeOperation = (value: any): void => {
    setSelectedOperationId(value ? value : undefined);
  };

  // Изменить выбранный тип производства
  const onChangeProductionType = (value: any): void => {
    setSelectedProductionTypeId(value ? value : undefined);
  };

  // Поиск по селекту
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  // Добавить новую учетную операцию
  const handleAddOperationAccounting = (values: TypeOperationAccountingFormValue): void => {
    const operationAccounting: TypeOperationAccounting = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      fact: values.fact || undefined,
      operation: {id: values.operation},
      output: values.output ? {id: values.output} : undefined,
      productionType: values.productionType ? {id: values.productionType} : undefined,
    };
    setIsModalOpen(false)
    createOperationAccounting(operationAccounting)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (operationAccountingId: number): void => {
    setSelectedOperationAccountingId(operationAccountingId)
    setIsDrawerOpen(true);
  };

  // Обновить учетную операцию
  const handleUpdateOperationAccounting = (values: TypeOperationAccountingFormValue): void => {
    const operationAccounting: TypeOperationAccounting = {
      id: selectedOperationAccountingId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      fact: values.fact || undefined,
      operation: {id: values.operation},
      output: values.output ? {id: values.output} : undefined,
      productionType: values.productionType ? {id: values.productionType} : undefined,
    };
    setIsDrawerOpen(false)
    editOperationAccounting(operationAccounting)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteOperationAccounting = (id: number): void => {
    deleteOperationAccountingById(id)
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Учет операций</Title>
        <Space>
          <DatePicker
            style={{width: '150px'}}
            format='DD.MM.YYYY'
            onChange={onChangeDate}
          />
          <Select
            showSearch
            allowClear
            placeholder='Выберите операцию'
            style={{'width': '300px'}}
            onChange={onChangeOperation}
            filterOption={onSearchSelect}
          >
            {allOperation && allOperation.length > 0 ?
              allOperation.map(operation => (
                <Option key={operation.id} value={operation.id} label={operation.title}>
                  {operation.title}
                </Option>
              )) : null}
          </Select>
          <Select
            showSearch
            allowClear
            placeholder='Выберите тип производства'
            style={{'width': '250px'}}
            onChange={onChangeProductionType}
            filterOption={onSearchSelect}
          >
            {allProductionType && allProductionType.length > 0 ?
              allProductionType.map(productionType => (
                <Option key={productionType.id} value={productionType.id} label={productionType.title}>
                  {productionType.title}
                </Option>
              )) : null}
          </Select>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            className='greenButton'
            onClick={() => setIsTableUpdate(prevState => !prevState)}
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
          date: selectedDate,
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