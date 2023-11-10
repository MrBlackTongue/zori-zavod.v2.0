import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, FloatButton, Space } from 'antd';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import {
  createOperationTimesheet,
  createProductionProductMovement,
  deleteOperationAccountingById,
  deleteOperationTimesheetById,
  deleteProductionProductMovementById,
  getOperationAccountingById,
  updateOperationAccounting,
  updateOperationTimesheet,
} from '../../../services';
import {
  TypeOperationAccounting,
  TypeOperationAccountingFormValue,
  TypeOperationTimesheet,
  TypeOperationTimesheetFormValue,
  TypeProductionProductMovement,
  TypeProductionProductMovementFormValue,
} from '../../../types';
import { TableOperationAccountingDetail } from './components/TableOperationAccountingDetail';
import { CreateModalOperationTimesheet } from './components/CreateModalOperationTimesheet';
import { UpdateDrawerOperationAccounting } from '../PageOperationAccounting/components/UpdateDrawerOperationAccounting';
import { TableOperationTimesheet } from './components/TableOperationTimesheet';
import { UpdateDrawerOperationTimesheet } from './components/UpdateDrawerOperationTimesheet';
import { TableProductionProductMovement } from './components/TableProductionProductMovement';
import { CreateModalProductionProductMovement } from './components/CreateModalProductionProductMovement';
import dayjs from 'dayjs';

export const PageOperationAccountingDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Состояние и методы для учетной операции
  const [isUpdateAllTable, setIsUpdateAllTable] = useState(false);
  const [isDrawerOperationAccountingOpen, setIsDrawerOperationAccountingOpen] =
    useState(false);

  // Состояние и методы для табеля учета рабочего времени
  const [selectedOperationTimesheetId, setSelectedOperationTimesheetId] =
    useState<number>();
  const [isModalOperationTimesheetOpen, setIsModalOperationTimesheetOpen] =
    useState(false);
  const [isDrawerOperationTimesheetOpen, setIsDrawerOperationTimesheetOpen] =
    useState(false);

  // Состояние для движения товаров на производстве
  const [
    isModalProductionProductMovementOpen,
    setIsModalProductionProductMovementOpen,
  ] = useState(false);

  // Обновить учетную операцию
  const handleUpdateOperationAccounting = async (
    values: TypeOperationAccountingFormValue,
  ): Promise<void> => {
    const operationAccounting: TypeOperationAccounting = {
      id: id ? Number(id) : undefined,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      fact: values.fact ?? undefined,
      operation: { id: values.operation },
      output: values.output ? { id: values.output } : undefined,
      productionType: values.productionType
        ? { id: values.productionType }
        : undefined,
    };
    setIsDrawerOperationAccountingOpen(false);
    await updateOperationAccounting(operationAccounting);
    setIsUpdateAllTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteOperationAccounting = async (id: number): Promise<void> => {
    await deleteOperationAccountingById(id);
    handleBack();
  };

  // Создать сотрудника в табеле учета рабочего времени
  const handleCreateOperationTimesheet = async (
    values: TypeOperationTimesheetFormValue,
  ): Promise<void> => {
    const operationTimesheet: TypeOperationTimesheet = {
      hours: values.hours,
      employee: { id: values.employee },
      operationAccountingId: id ? Number(id) : undefined,
      fact: values.fact ?? 0,
    };
    setIsModalOperationTimesheetOpen(false);
    await createOperationTimesheet(operationTimesheet);
    setIsUpdateAllTable(prevState => !prevState);
  };

  // Обновить сотрудника в табеле учета рабочего времени
  const handleUpdateOperationTimesheet = async (
    values: TypeOperationTimesheetFormValue,
  ): Promise<void> => {
    const operationTimesheet: TypeOperationTimesheet = {
      id: selectedOperationTimesheetId,
      hours: values.hours,
      employee: { id: values.employee },
      operationAccountingId: id ? Number(id) : undefined,
      fact: values.fact ?? 0,
    };
    setIsDrawerOperationTimesheetOpen(false);
    await updateOperationTimesheet(operationTimesheet);
    setIsUpdateAllTable(prevState => !prevState);
  };

  // Удалить сотрудника из таблицы табель учета рабочего времени
  const handleDeleteOperationTimesheet = async (id: number): Promise<void> => {
    await deleteOperationTimesheetById(id);
    setIsUpdateAllTable(prevState => !prevState);
  };

  // Открыть drawer табеля учета рабочего времени
  const openDrawerOperationTimesheet = (operationTimesheetId: number): void => {
    setSelectedOperationTimesheetId(operationTimesheetId);
    setIsDrawerOperationTimesheetOpen(true);
  };

  // Создать запись движения товара на производстве
  const handleCreateProductionProductMovement = async (
    values: TypeProductionProductMovementFormValue,
  ): Promise<void> => {
    if (!id) return;
    const operationAccounting = await getOperationAccountingById(Number(id));
    let operationDate = operationAccounting?.date;

    const productionProductMovement: TypeProductionProductMovement = {
      amount: values.amount,
      income: values.income,
      stock: { id: values.stock },
      date: operationDate,
      productBatch: { id: values.productBatch },
      operationAccounting: {
        id: Number(id),
      },
    };
    setIsModalProductionProductMovementOpen(false);
    await createProductionProductMovement(productionProductMovement);
    setIsUpdateAllTable(prevState => !prevState);
  };

  // Удалить запись движения товара на производстве
  const handleDeleteProductionProductMovement = async (
    id: number,
  ): Promise<void> => {
    await deleteProductionProductMovementById(id);
    setIsUpdateAllTable(prevState => !prevState);
  };

  // Переход на другую страницу по адресу
  const handleBack = (): void => {
    navigate(`/operation-accounting`);
  };

  return (
    <div>
      <Button type="primary" onClick={handleBack} style={{ marginBottom: 10 }}>
        <RollbackOutlined />
        Назад
      </Button>
      <FloatButton.BackTop />
      <TableOperationAccountingDetail
        isUpdateTable={isUpdateAllTable}
        openDrawer={() => setIsDrawerOperationAccountingOpen(true)}
        onDelete={handleDeleteOperationAccounting}
        idDetail={id ? Number(id) : undefined}
      />
      <UpdateDrawerOperationAccounting
        isOpen={isDrawerOperationAccountingOpen}
        onCancel={() => setIsDrawerOperationAccountingOpen(false)}
        selectedItemId={id ? Number(id) : undefined}
        updateItem={handleUpdateOperationAccounting}
      />
      <div className="content-filter-bar-detail-page">
        <div style={{ flex: 1 }}>
          <Divider orientation="left">Табель учета рабочего времени</Divider>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOperationTimesheetOpen(true)}
            size="small">
            Добавить
          </Button>
        </Space>
      </div>
      <TableOperationTimesheet
        isUpdateTable={isUpdateAllTable}
        openDrawer={openDrawerOperationTimesheet}
        onDelete={handleDeleteOperationTimesheet}
        idDetail={id ? Number(id) : undefined}
      />
      <CreateModalOperationTimesheet
        isOpen={isModalOperationTimesheetOpen}
        createItem={handleCreateOperationTimesheet}
        onCancel={() => setIsModalOperationTimesheetOpen(false)}
      />
      <UpdateDrawerOperationTimesheet
        isOpen={isDrawerOperationTimesheetOpen}
        onCancel={() => setIsDrawerOperationTimesheetOpen(false)}
        selectedItemId={selectedOperationTimesheetId}
        updateItem={handleUpdateOperationTimesheet}
      />
      <div className="content-filter-bar-detail-page">
        <div style={{ flex: 1 }}>
          <Divider orientation="left">Движение товаров на производстве</Divider>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalProductionProductMovementOpen(true)}
            size="small">
            Добавить
          </Button>
        </Space>
      </div>
      <TableProductionProductMovement
        isUpdateTable={isUpdateAllTable}
        onDelete={handleDeleteProductionProductMovement}
        idDetail={id ? Number(id) : undefined}
      />
      <CreateModalProductionProductMovement
        isOpen={isModalProductionProductMovementOpen}
        createItem={handleCreateProductionProductMovement}
        onCancel={() => setIsModalProductionProductMovementOpen(false)}
      />
    </div>
  );
};
