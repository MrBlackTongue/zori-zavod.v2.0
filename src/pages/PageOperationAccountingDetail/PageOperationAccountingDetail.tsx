import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Typography, Space, Button, FloatButton, Divider, Tooltip} from 'antd';
import {SyncOutlined, PlusOutlined, ArrowLeftOutlined,} from '@ant-design/icons';
import '../../App.css'
import {putChangeOperationAccounting, postNewOperationTimesheet} from "../../services";
import {TypeOperationAccounting, TypeOperationTimesheet} from "../../types";
import {TableOperationAccountingDetail} from "./components/TableOperationAccountingDetail";
import {AddModalOperationTimesheet} from "./components/AddModalOperationTimesheet";
import {EditDrawerOperationAccounting} from "../PageOperationAccounting/components/EditDrawerOperationAccounting";
import {TableOperationTimesheet} from "./components/TableOperationTimesheet";

const {Title} = Typography;

export const PageOperationAccountingDetail: React.FC = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  // Обновление таблицы учетная операция, обновление таблицы табель учета рабочего времени
  const [updateTableOperationAccountingDetail, setUpdateTableOperationAccountingDetail] = useState(false);
  const [updateTableOperationTimesheet, setUpdateTableOperationTimesheet] = useState(false);

  // Открыть закрыть дравер учетной операции
  const [isDrawerOperationAccountingOpen, setIsDrawerOperationAccountingOpen] = useState(false);

  // Открыть закрыть модальное окно, дравер табеля учета рабочего времени
  const [isModalOperationTimesheet, setIsModalOperationTimesheet] = useState(false);
  // const [isDrawerOperationTimesheetOpen, setIsDrawerOperationTimesheetOpen] = useState(false);

  // Обновить учетную операцию
  const updateOperationAccounting = (values: { [key: string]: any }): TypeOperationAccounting => {
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
    setUpdateTableOperationAccountingDetail(!updateTableOperationAccountingDetail)
    return values;
  };

  // Добавить человека в табель учета рабочего времени
  const addOperationTimesheet = (values: { [key: string]: any }): TypeOperationTimesheet => {
    const operationTimesheet: TypeOperationTimesheet = {
      hours: values.hours,
      employee: values.employee,
      operationAccountingId: id ? +id : undefined,
      fact: values.fact || 0,
    };
    setIsModalOperationTimesheet(false)
    postNewOperationTimesheet(operationTimesheet)
    setUpdateTableOperationTimesheet(!updateTableOperationTimesheet)
    return values;
  };

  // // Открыть дравер OperationTimesheet
  // const openDrawerOperationTimesheet = (operationTimesheetId: number) => {
  //   // setSelectedOperationTimesheetById(operationTimesheetId)
  //   setIsDrawerOperationTimesheetOpen(true);
  // };

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
            onClick={() => setUpdateTableOperationAccountingDetail(!updateTableOperationAccountingDetail)}
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
        updateItem={updateOperationAccounting}
      />
      <Divider/>
      <div className='centerTitle'>
        <Title level={3}>Табель учета рабочего времени </Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTableOperationTimesheet(!updateTableOperationTimesheet)}
            className='greenButton'
          >
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => setIsModalOperationTimesheet(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <TableOperationTimesheet
        isUpdateTable={updateTableOperationTimesheet}
        openDrawer={() => {}}
        idDetail={id ? +id : undefined}
      />
      <AddModalOperationTimesheet
        isOpen={isModalOperationTimesheet}
        addItem={addOperationTimesheet}
        onCancel={() => setIsModalOperationTimesheet(false)}
      />
      <Divider/>
    </div>
  );
}