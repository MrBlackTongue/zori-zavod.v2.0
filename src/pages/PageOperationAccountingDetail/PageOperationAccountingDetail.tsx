import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Space, Button, FloatButton, Divider, Tooltip, Typography} from 'antd';
import {SyncOutlined, PlusOutlined, ArrowLeftOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  putChangeOperationAccounting,
  postNewOperationTimesheet,
  deleteOperationTimesheetById,
  putChangeOperationTimesheet,
  deleteProductionProductMovementById,
  postNewProductionProductMovement,
  getOperationAccountingById,
  deleteOperationAccountingById,
} from "../../services";
import {TypeOperationAccounting, TypeOperationTimesheet, TypeProductionProductMovement} from "../../types";
import {TableOperationAccountingDetail} from "./components/TableOperationAccountingDetail";
import {AddModalOperationTimesheet} from "./components/AddModalOperationTimesheet";
import {EditDrawerOperationAccounting} from "../PageOperationAccounting/components/EditDrawerOperationAccounting";
import {TableOperationTimesheet} from "./components/TableOperationTimesheet";
import {EditDrawerOperationTimesheet} from "./components/EditDrawerOperationTimesheet";
import {TableProductionProductMovement} from "./components/TableProductionProductMovement";
import {AddModalProductionProductMovement} from "./components/AddModalProductionProductMovement";

export const PageOperationAccountingDetail: React.FC = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const {Title} = Typography;

  // Состояние и методы для учетной операции
  const [isAllTableUpdate, setIsAllTableUpdate] = useState(false);
  const [isDrawerOperationAccountingOpen, setIsDrawerOperationAccountingOpen] = useState(false);

  // Состояние и методы для табеля учета рабочего времени
  const [selectedOperationTimesheetId, setSelectedOperationTimesheetId] = useState<number>();
  const [isModalOperationTimesheetOpen, setIsModalOperationTimesheetOpen] = useState(false);
  const [isDrawerOperationTimesheetOpen, setIsDrawerOperationTimesheetOpen] = useState(false);

  // Состояние и методы для движения товаров на производстве
  const [isModalProductionProductMovementOpen, setIsModalProductionProductMovementOpen] = useState(false);

  // Обновить учетную операцию
  const handleUpdateOperationAccounting = (values: { [key: string]: any }): void => {
    const operationAccounting: TypeOperationAccounting = {
      id: id ? +id : undefined,
      date: values['date'].format('YYYY-MM-DD'),
      fact: values.fact || 0,
      operation: {
        id: values.operation.id,
      },
      output: values.output ? {id: values.output.id} : undefined,
      productionType: {id: values.productionType?.id},
    };
    setIsDrawerOperationAccountingOpen(false)
    putChangeOperationAccounting(operationAccounting)
    setIsAllTableUpdate(prevState => !prevState)
  }

  // Удалить запись из таблицы
  const handleDeleteOperationAccounting = (id: number): void => {
    deleteOperationAccountingById(id).catch((error) => console.error(error));
    handleBack()
  };

  // Добавить сотрудника в табель учета рабочего времени
  const handleAddOperationTimesheet = (values: TypeOperationTimesheet): void => {
    const operationTimesheet: TypeOperationTimesheet = {
      hours: values.hours,
      employee: values.employee,
      operationAccountingId: id ? +id : undefined,
      fact: values.fact || 0,
    };
    setIsModalOperationTimesheetOpen(false)
    postNewOperationTimesheet(operationTimesheet)
    setIsAllTableUpdate(prevState => !prevState)
  }

  // Обновить сотрудника в табеле учета рабочего времени
  const handleUpdateOperationTimesheet = (values: TypeOperationTimesheet): void => {
    const operationTimesheet: TypeOperationTimesheet = {
      id: selectedOperationTimesheetId,
      hours: values.hours,
      employee: {
        id: values.employee?.id,
      },
      operationAccountingId: id ? +id : undefined,
      fact: values.fact || 0,
    };
    setIsDrawerOperationTimesheetOpen(false)
    putChangeOperationTimesheet(operationTimesheet)
    setIsAllTableUpdate(prevState => !prevState)
  }

  // Удалить сотрудника из таблицы табель учета рабочего времени
  const handleDeleteOperationTimesheet = (id: number): void => {
    deleteOperationTimesheetById(id).catch((error) => console.error(error));
    setIsAllTableUpdate(prevState => !prevState)
  }

  // Открыть дравер табеля учета рабочего времени
  const openDrawerOperationTimesheet = (operationTimesheetId: number): void => {
    setSelectedOperationTimesheetId(operationTimesheetId)
    setIsDrawerOperationTimesheetOpen(true);
  }

  // Добавить запись движения товара на производстве
  const handleAddProductionProductMovement = async (values: TypeProductionProductMovement): Promise<void> => {
    if (!id) return;
    const operationAccounting = await getOperationAccountingById(+id);
    let operationDate = operationAccounting?.date;

    const productionProductMovement: TypeProductionProductMovement = {
      amount: values.amount,
      income: values.income,
      stock: values.stock,
      date: operationDate,
      productBatch: values.productBatch,
      operationAccounting: {
        id: id ? +id : undefined
      },
    };
    setIsModalProductionProductMovementOpen(false)
    postNewProductionProductMovement(productionProductMovement)
    setIsAllTableUpdate(prevState => !prevState)
  }

  // Удалить запись движения товара на производстве
  const handleDeleteProductionProductMovement = (id: number): void => {
    deleteProductionProductMovementById(id).catch((error) => console.error(error));
    setIsAllTableUpdate(prevState => !prevState)
  }

  // Переход на другую страницу по адресу
  const handleBack = () => {
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
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsAllTableUpdate(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableOperationAccountingDetail
        isUpdateTable={isAllTableUpdate}
        openDrawer={() => setIsDrawerOperationAccountingOpen(true)}
        onDelete={handleDeleteOperationAccounting}
        idDetail={id ? +id : undefined}
      />
      <EditDrawerOperationAccounting
        isOpen={isDrawerOperationAccountingOpen}
        closeDrawer={() => setIsDrawerOperationAccountingOpen(false)}
        selectedItemId={id ? +id : undefined}
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
        isUpdateTable={isAllTableUpdate}
        openDrawer={openDrawerOperationTimesheet}
        onDelete={handleDeleteOperationTimesheet}
        idDetail={id ? +id : undefined}
      />
      <AddModalOperationTimesheet
        isOpen={isModalOperationTimesheetOpen}
        addItem={handleAddOperationTimesheet}
        onCancel={() => setIsModalOperationTimesheetOpen(false)}
      />
      <EditDrawerOperationTimesheet
        isOpen={isDrawerOperationTimesheetOpen}
        closeDrawer={() => setIsDrawerOperationTimesheetOpen(false)}
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
        isUpdateTable={isAllTableUpdate}
        onDelete={handleDeleteProductionProductMovement}
        idDetail={id ? +id : undefined}
      />
      <AddModalProductionProductMovement
        isOpen={isModalProductionProductMovementOpen}
        addItem={handleAddProductionProductMovement}
        onCancel={() => setIsModalProductionProductMovementOpen(false)}
      />
    </div>
  );
}