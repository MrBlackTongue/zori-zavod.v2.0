import React, { useMemo, useState } from 'react';
import { DatePicker, Flex, FloatButton, Select, Tooltip } from 'antd';
import {
  createOperationAccounting,
  deleteOperationAccountingById,
  updateOperationAccounting,
} from '../../services';
import {
  TypeOperationAccounting,
  TypeOperationAccountingFormValue,
} from '../../types';
import { TableOperationAccounting } from './components/TableOperationAccounting';
import { CreateModalOperationAccounting } from './components/CreateModalOperationAccounting';
import { UpdateDrawerOperationAccounting } from './components/UpdateDrawerOperationAccounting';
import dayjs from 'dayjs';
import { useFetchAllData } from '../../hooks';
import AddButton from '../../components/AddButton/AddButton';

export const PageOperationAccounting: React.FC = () => {
  // Обновление таблицы, открыть закрыть модальное окно, drawer
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранной учетной операции, Выбранная дата
  const [selectedOperationAccountingId, setSelectedOperationAccountingId] =
    useState<number>();
  const [selectedDate, setSelectedDate] = useState<any>();

  // Хук для получения данных
  const { allOperation, allProductionType } = useFetchAllData({
    depsOperation: true,
    depsProductionType: true,
  });

  // id выбранной операции, id выбранных типов производства
  const [selectedOperationId, setSelectedOperationId] = useState<number>();
  const [selectedProductionTypeIds, setSelectedProductionTypeIds] = useState<
    number[]
  >([]);

  // Создание объекта фильтра с использованием useMemo
  const filter = useMemo(
    () => ({
      date: selectedDate,
      operationId: selectedOperationId,
      productionTypeIds: selectedProductionTypeIds,
    }),
    [selectedDate, selectedOperationId, selectedProductionTypeIds],
  );

  // Изменить выбранную дату
  const onChangeDate = (value: any): void => {
    setSelectedDate(value ? dayjs(value).format('YYYY-MM-DD') : undefined);
  };

  // Изменить выбранную операцию
  const onChangeOperation = (value: any): void => {
    setSelectedOperationId(value || undefined);
  };

  // Изменить выбранный тип производства
  const onChangeProductionType = (values: any): void => {
    setSelectedProductionTypeIds(values || []);
  };

  // Поиск по select
  const onSearchSelect = (searchText: string, option: any) => {
    return option.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  };

  // Добавить новую учетную операцию
  const handleCreateOperationAccounting = async (
    values: TypeOperationAccountingFormValue,
  ): Promise<void> => {
    const operationAccounting: TypeOperationAccounting = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      fact: values.fact ?? undefined,
      operation: { id: values.operation },
      output: values.output ? { id: values.output } : undefined,
      productionType: values.productionType
        ? { id: values.productionType }
        : undefined,
    };
    setIsModalOpen(false);
    await createOperationAccounting(operationAccounting);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть drawer
  const openDrawer = (id: number): void => {
    setSelectedOperationAccountingId(id);
    setIsDrawerOpen(true);
  };

  // Обновить учетную операцию
  const handleUpdateOperationAccounting = async (
    values: TypeOperationAccountingFormValue,
  ): Promise<void> => {
    const operationAccounting: TypeOperationAccounting = {
      id: selectedOperationAccountingId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      fact: values.fact ?? undefined,
      operation: { id: values.operation },
      output: values.output ? { id: values.output } : undefined,
      productionType: values.productionType
        ? { id: values.productionType }
        : undefined,
    };
    setIsDrawerOpen(false);
    await updateOperationAccounting(operationAccounting);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteOperationAccounting = async (id: number): Promise<void> => {
    await deleteOperationAccountingById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div>
      <AddButton setIsModalOpen={setIsModalOpen} />
      <Flex
        gap="small"
        justify="flex-end"
        align="center"
        wrap="wrap"
        style={{ marginBottom: 15 }}>
        <DatePicker
          style={{ width: '150px' }}
          format="DD.MM.YYYY"
          onChange={onChangeDate}
        />
        <Select
          showSearch
          allowClear
          placeholder="Выберите операцию"
          style={{ width: '300px' }}
          onChange={onChangeOperation}
          filterOption={onSearchSelect}>
          {allOperation && allOperation.length > 0
            ? allOperation.map(operation => (
                <Select.Option
                  key={operation.id}
                  value={operation.id}
                  label={operation.title}>
                  <Tooltip placement="right" title={operation.title}>
                    {operation.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
        <Select
          showSearch
          allowClear
          mode="multiple"
          placeholder="Выберите тип производства"
          style={{ width: '250px' }}
          onChange={onChangeProductionType}
          filterOption={onSearchSelect}>
          {allProductionType && allProductionType.length > 0
            ? allProductionType.map(productionType => (
                <Select.Option
                  key={productionType.id}
                  value={productionType.id}
                  label={productionType.title}>
                  <Tooltip placement="right" title={productionType.title}>
                    {productionType.title}
                  </Tooltip>
                </Select.Option>
              ))
            : null}
        </Select>
      </Flex>
      <FloatButton.BackTop />
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
};
