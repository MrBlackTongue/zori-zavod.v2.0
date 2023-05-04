import React, {useState, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Typography, Space, Button, FloatButton, Divider, Tooltip} from 'antd';
import {SyncOutlined, PlusOutlined, ArrowLeftOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  putChangeOperationAccounting,
  postNewOperationTimesheet,
  deleteOperationTimesheetById, putChangeOperationTimesheet,
} from "../../services";
import {TypeOperationAccounting, TypeOperationTimesheet} from "../../types";
import {TableOperationAccountingDetail} from "./components/TableOperationAccountingDetail";
import {AddModalOperationTimesheet} from "./components/AddModalOperationTimesheet";
import {EditDrawerOperationAccounting} from "../PageOperationAccounting/components/EditDrawerOperationAccounting";
import {TableOperationTimesheet} from "./components/TableOperationTimesheet";
import {EditDrawerOperationTimesheet} from "./components/EditDrawerOperationTimesheet";

const {Title} = Typography;

export const PageOperationAccountingDetail: React.FC = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  // Состояние и методы для учетной операции
  const [updateTableOperationAccountingDetail, setUpdateTableOperationAccountingDetail] = useState(false);
  const [isDrawerOperationAccountingOpen, setIsDrawerOperationAccountingOpen] = useState(false);

  // Состояние и методы для табеля учета рабочего времени
  const [updateTableOperationTimesheet, setUpdateTableOperationTimesheet] = useState(false);
  const [selectedOperationTimesheetId, setSelectedOperationTimesheetId] = useState<number>();
  const [isModalOperationTimesheetOpen, setIsModalOperationTimesheetOpen] = useState(false);
  const [isDrawerOperationTimesheetOpen, setIsDrawerOperationTimesheetOpen] = useState(false);

  // Обновить учетную операцию
  const handleUpdateOperationAccounting = useCallback((values: { [key: string]: any }): TypeOperationAccounting => {
    const operationAccounting: TypeOperationAccounting = {
      id: id ? +id : undefined,
      date: values['date'].format('YYYY-MM-DD'),
      fact: values.fact || 0,
      operation: {
        id: values.operation.id,
      },
      output: values.output ? {id: values.output.id} : undefined,
    };
    setIsDrawerOperationAccountingOpen(false)
    putChangeOperationAccounting(operationAccounting)
    setUpdateTableOperationAccountingDetail(prevState => !prevState)
    return values;
  }, [id]);

  // Добавить сотрудника в табель учета рабочего времени
  const handleAddOperationTimesheet = useCallback((values: { [key: string]: any }): TypeOperationTimesheet => {
    const operationTimesheet: TypeOperationTimesheet = {
      hours: values.hours,
      employee: values.employee,
      operationAccountingId: id ? +id : undefined,
      fact: values.fact || 0,
    };
    setIsModalOperationTimesheetOpen(false)
    postNewOperationTimesheet(operationTimesheet)
    setUpdateTableOperationTimesheet(prevState => !prevState)
    setUpdateTableOperationAccountingDetail(prevState => !prevState)
    return values;
  }, [id]);

  // Обновить сотрудника в табеле учета рабочего времени
  const handleUpdateOperationTimesheet = useCallback((values: { [key: string]: any }): TypeOperationTimesheet => {
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
    setUpdateTableOperationTimesheet(prevState => !prevState)
    setUpdateTableOperationAccountingDetail(prevState => !prevState)
    return values;
  }, [selectedOperationTimesheetId]);

  // Удалить сотрудника из таблицы табель учета рабочего времени
  const handleDeleteOperationTimesheet = useCallback(async (id: number) => {
    await deleteOperationTimesheetById(id)
    setUpdateTableOperationTimesheet(prevState => !prevState)
    setUpdateTableOperationAccountingDetail(prevState => !prevState)
  }, [id]);

  // Открыть дравер табеля учета рабочего времени
  const openDrawerOperationTimesheet = useCallback((operationTimesheetId: number) => {
    setSelectedOperationTimesheetId(operationTimesheetId)
    setIsDrawerOperationTimesheetOpen(true);
  }, []);

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
          Назад к учету операций
        </Button>
      </Tooltip>
      <div className='centerTitle'>
        <Title level={3}>Учетная операция</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTableOperationAccountingDetail(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableOperationAccountingDetail
        isUpdateTable={updateTableOperationAccountingDetail}
        openDrawer={() => setIsDrawerOperationAccountingOpen(true)}
        idDetail={id ? +id : undefined}
      />
      <EditDrawerOperationAccounting
        isOpen={isDrawerOperationAccountingOpen}
        closeDrawer={() => setIsDrawerOperationAccountingOpen(false)}
        selectedItemId={id ? +id : undefined}
        updateItem={handleUpdateOperationAccounting}
      />
      <Divider/>
      <div className='centerTitle'>
        <Title level={3}>Табель учета рабочего времени </Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTableOperationTimesheet(prevState => !prevState)}
            className='greenButton'
          >
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalOperationTimesheetOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <TableOperationTimesheet
        isUpdateTable={updateTableOperationTimesheet}
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
      <Divider/>
    </div>
  );
}