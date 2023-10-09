import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Space, Button, FloatButton, Divider, Tooltip, Typography} from 'antd';
import {PlusOutlined, ArrowLeftOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  updateOperationAccounting,
  createOperationTimesheet,
  deleteOperationTimesheetById,
  updateOperationTimesheet,
  deleteProductionProductMovementById,
  createProductionProductMovement,
  getOperationAccountingById,
  deleteOperationAccountingById,
} from "../../services";
import {
  TypeOperationAccounting,
  TypeOperationAccountingFormValue,
  TypeOperationTimesheet, TypeOperationTimesheetFormValue,
  TypeProductionProductMovement, TypeProductionProductMovementFormValue
} from "../../types";
import {TableOperationAccountingDetail} from "./components/TableOperationAccountingDetail";
import {CreateModalOperationTimesheet} from "./components/CreateModalOperationTimesheet";
import {UpdateDrawerOperationAccounting} from "../PageOperationAccounting/components/UpdateDrawerOperationAccounting";
import {TableOperationTimesheet} from "./components/TableOperationTimesheet";
import {UpdateDrawerOperationTimesheet} from "./components/UpdateDrawerOperationTimesheet";
import {TableProductionProductMovement} from "./components/TableProductionProductMovement";
import {CreateModalProductionProductMovement} from "./components/CreateModalProductionProductMovement";
import dayjs from "dayjs";

export const PageOperationAccountingDetail: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {Title} = Typography;

  // Состояние и методы для учетной операции
  const [isUpdateAllTable, setIsUpdateAllTable] = useState(false);
  const [isDrawerOperationAccountingOpen, setIsDrawerOperationAccountingOpen] = useState(false);

  // Состояние и методы для табеля учета рабочего времени
  const [selectedOperationTimesheetId, setSelectedOperationTimesheetId] = useState<number>();
  const [isModalOperationTimesheetOpen, setIsModalOperationTimesheetOpen] = useState(false);
  const [isDrawerOperationTimesheetOpen, setIsDrawerOperationTimesheetOpen] = useState(false);

  // Состояние для движения товаров на производстве
  const [isModalProductionProductMovementOpen, setIsModalProductionProductMovementOpen] = useState(false);

  // Обновить учетную операцию
  const handleUpdateOperationAccounting = async (values: TypeOperationAccountingFormValue): Promise<void> => {
    const operationAccounting: TypeOperationAccounting = {
      id: id ? Number(id) : undefined,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      fact: values.fact ?? undefined,
      operation: {id: values.operation},
      output: values.output ? {id: values.output} : undefined,
      productionType: values.productionType ? {id: values.productionType} : undefined,
    };
    setIsDrawerOperationAccountingOpen(false)
    await updateOperationAccounting(operationAccounting)
    setIsUpdateAllTable(prevState => !prevState)
  }

  // Удалить запись из таблицы
  const handleDeleteOperationAccounting = async (id: number): Promise<void> => {
    await deleteOperationAccountingById(id)
    handleBack()
  };

  // Создать сотрудника в табеле учета рабочего времени
  const handleCreateOperationTimesheet = async (values: TypeOperationTimesheetFormValue): Promise<void> => {
    const operationTimesheet: TypeOperationTimesheet = {
      hours: values.hours,
      employee: {id: values.employee},
      operationAccountingId: id ? Number(id) : undefined,
      fact: values.fact ?? 0,
    };
    setIsModalOperationTimesheetOpen(false)
    await createOperationTimesheet(operationTimesheet)
    setIsUpdateAllTable(prevState => !prevState)
  }

  // Обновить сотрудника в табеле учета рабочего времени
  const handleUpdateOperationTimesheet = async (values: TypeOperationTimesheetFormValue): Promise<void> => {
    const operationTimesheet: TypeOperationTimesheet = {
      id: selectedOperationTimesheetId,
      hours: values.hours,
      employee: {id: values.employee},
      operationAccountingId: id ? Number(id) : undefined,
      fact: values.fact ?? 0,
    };
    setIsDrawerOperationTimesheetOpen(false)
    await updateOperationTimesheet(operationTimesheet)
    setIsUpdateAllTable(prevState => !prevState)
  }

  // Удалить сотрудника из таблицы табель учета рабочего времени
  const handleDeleteOperationTimesheet = async (id: number): Promise<void> => {
    await deleteOperationTimesheetById(id)
    setIsUpdateAllTable(prevState => !prevState)
  }

  // Открыть дравер табеля учета рабочего времени
  const openDrawerOperationTimesheet = (operationTimesheetId: number): void => {
    setSelectedOperationTimesheetId(operationTimesheetId)
    setIsDrawerOperationTimesheetOpen(true);
  }

  // Создать запись движения товара на производстве
  const handleCreateProductionProductMovement = async (values: TypeProductionProductMovementFormValue): Promise<void> => {
    if (!id) return;
    const operationAccounting = await getOperationAccountingById(Number(id));
    let operationDate = operationAccounting?.date;

    const productionProductMovement: TypeProductionProductMovement = {
      amount: values.amount,
      income: values.income,
      stock: {id: values.stock},
      date: operationDate,
      productBatch: {id: values.productBatch},
      operationAccounting: {
        id: Number(id)
      },
    };
    setIsModalProductionProductMovementOpen(false)
    await createProductionProductMovement(productionProductMovement)
    setIsUpdateAllTable(prevState => !prevState)

  };

  // Удалить запись движения товара на производстве
  const handleDeleteProductionProductMovement = async (id: number): Promise<void> => {
    await deleteProductionProductMovementById(id)
    setIsUpdateAllTable(prevState => !prevState)
  }

  // Переход на другую страницу по адресу
  const handleBack = (): void => {
    navigate(`/operation-accounting`);
  };

  return (
    <div style={{display: 'grid'}}>
      <Tooltip title="Вернуться к таблице Учет операций" placement="bottomRight">
        <Button
          type="primary"
          ghost
          onClick={handleBack}
        >
          <ArrowLeftOutlined/>
          Вернуться к таблице Учет операций
        </Button>
      </Tooltip>
      <div className='centerTitle'>
        <Title level={3}>Детали учетной операции</Title>
        <Space>
        </Space>
      </div>
      <FloatButton.BackTop/>
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
      <div className='centerTitle'>
        <div style={{flex: 1}}>
          <Divider orientation="left">Табель учета рабочего времени</Divider>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalOperationTimesheetOpen(true)}
            size={"small"}
          >
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
      <div className='centerTitle'>
        <div style={{flex: 1}}>
          <Divider orientation="left">Движение товаров на производстве</Divider>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalProductionProductMovementOpen(true)}
            size={"small"}
          >
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
}