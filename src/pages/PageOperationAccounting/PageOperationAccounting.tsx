import React, {useState, useMemo} from 'react';
import {Typography, Space, Button, Select, DatePicker, FloatButton, Tooltip} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  createOperationAccounting,
  updateOperationAccounting,
  deleteOperationAccountingById,
} from "../../services";
import {
  TypeOperationAccounting,
  TypeOperationAccountingFormValue,
} from "../../types";
import {TableOperationAccounting} from "./components/TableOperationAccounting";
import {CreateModalOperationAccounting} from "./components/CreateModalOperationAccounting";
import {UpdateDrawerOperationAccounting} from "./components/UpdateDrawerOperationAccounting";
import dayjs from "dayjs";
import {useFetchAllData} from "../../hooks";

export const PageOperationAccounting: React.FC = () => {

  const {Title} = Typography;
  const {Option} = Select;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбраной учетной операции, Выбранная дата
  const [selectedOperationAccountingId, setSelectedOperationAccountingId] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<any>();

  // Хук для получения данных
  const {allOperation, allProductionType} = useFetchAllData({depsOperation: true, depsProductionType: true});

  // id выбранной операции, id выбранного типа производства
  const [selectedOperationId, setSelectedOperationId] = useState<number>();
  const [selectedProductionTypeId, setSelectedProductionTypeId] = useState<number>();

  // Создание объекта фильтра с использованием useMemo
  const filter = useMemo(() => ({
    date: selectedDate,
    operationId: selectedOperationId,
    productionTypeId: selectedProductionTypeId,
  }), [selectedDate, selectedOperationId, selectedProductionTypeId]);

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
  const handleCreateOperationAccounting = (values: TypeOperationAccountingFormValue): void => {
    const operationAccounting: TypeOperationAccounting = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      fact: values.fact ?? undefined,
      operation: {id: values.operation},
      output: values.output ? {id: values.output} : undefined,
      productionType: values.productionType ? {id: values.productionType} : undefined,
    };
    setIsModalOpen(false)
    void createOperationAccounting(operationAccounting)
    setIsUpdateTable(prevState => !prevState)
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
      fact: values.fact ?? undefined,
      operation: {id: values.operation},
      output: values.output ? {id: values.output} : undefined,
      productionType: values.productionType ? {id: values.productionType} : undefined,
    };
    setIsDrawerOpen(false)
    void updateOperationAccounting(operationAccounting)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteOperationAccounting = (id: number): void => {
    void deleteOperationAccountingById(id)
    setIsUpdateTable(prevState => !prevState)
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
                  <Tooltip placement="right" title={operation.title}>
                    {operation.title}
                  </Tooltip>
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
                  <Tooltip placement="right" title={productionType.title}>
                    {productionType.title}
                  </Tooltip>
                </Option>
              )) : null}
          </Select>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            className='greenButton'
            onClick={() => setIsUpdateTable(prevState => !prevState)}
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
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteOperationAccounting}
        filter={filter}
      />
      <CreateModalOperationAccounting
        isOpen={isModalOpen}
        createItem={handleCreateOperationAccounting}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerOperationAccounting
        isOpen={isDrawerOpen}
        selectedItemId={selectedOperationAccountingId}
        updateItem={handleUpdateOperationAccounting}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}