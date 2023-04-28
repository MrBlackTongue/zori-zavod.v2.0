import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Typography, Space, Button, FloatButton, Divider, Tooltip} from 'antd';
import {SyncOutlined, PlusOutlined, ArrowLeftOutlined,} from '@ant-design/icons';
import '../../App.css'
import {postNewOperationAccounting, putChangeOperationAccounting} from "../../services";
import {TypeOperationAccounting} from "../../types";
import {TableOperationAccountingDetail} from "./components/TableOperationAccountingDetail";
import {AddModalOperationTimesheet} from "./components/AddModalOperationTimesheet";
import {EditDrawerOperationAccounting} from "../PageOperationAccounting/components/EditDrawerOperationAccounting";
import {TableOperationTimesheet} from "./components/TableOperationTimesheet";

const {Title} = Typography;

export const PageOperationAccountingDetail: React.FC = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  // Обновление таблицы учетная операция, обновление таблицы табель учета рабочего времени, выбрана учетная операция по id
  const [updateTableOperationAccountingDetail, setUpdateTableOperationAccountingDetail] = useState(false);
  const [updateTableOperationTimesheet, setUpdateTableOperationTimesheet] = useState(false);
  const [selectedOperationAccountingById, setSelectedOperationAccountingById] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);   // Добавить модальное окно, пока это пустышка
  const [isDrawerOperationAccountingOpen, setIsDrawerOperationAccountingOpen] = useState(false);

  // Добавить новую учетную операцию
  const addOperationAccounting = (values: { [key: string]: any }): TypeOperationAccounting => {
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
    };
    setIsModalOpen(false)
    postNewOperationAccounting(operationAccounting)
    setSelectedOperationAccountingById(selectedOperationAccountingById)
    setUpdateTableOperationAccountingDetail(!updateTableOperationAccountingDetail)
    return values;
  };

  // Открыть дравер OperationAccounting
  const openDrawerOperationAccounting = (operationAccountingId: number) => {
    setSelectedOperationAccountingById(operationAccountingId)
    setIsDrawerOperationAccountingOpen(true);
  };

  // Обновить учетную операцию
  const updateOperationAccounting = (values: { [key: string]: any }): TypeOperationAccounting => {
    const operationAccounting: TypeOperationAccounting = {
      id: selectedOperationAccountingById,
      date: values['date'].format('YYYY-MM-DD'),
      fact: values.fact || undefined,
      operation: {
        id: values.operation.id,
      },
      output: values.output
        ? {
          id: values.output.id,
        }
        : undefined,
    };
    setIsDrawerOperationAccountingOpen(false)
    putChangeOperationAccounting(operationAccounting)
    setSelectedOperationAccountingById(selectedOperationAccountingById)
    setUpdateTableOperationAccountingDetail(!updateTableOperationAccountingDetail)
    return values;
  };

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
            className='greenButton'>
            Обновить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableOperationAccountingDetail
        isUpdateTable={updateTableOperationAccountingDetail}
        openDrawer={openDrawerOperationAccounting}
        idDetail={id ? +id : undefined}
      />
      <EditDrawerOperationAccounting
        isOpen={isDrawerOperationAccountingOpen}
        closeDrawer={() => setIsDrawerOperationAccountingOpen(false)}
        selectedItemId={selectedOperationAccountingById}
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
            className='greenButton'>
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
      <TableOperationTimesheet
        isUpdateTable={updateTableOperationTimesheet}
        openDrawer={() => {
        }}
        idDetail={id ? +id : undefined}
      />
      {/*<AddModalOperationTimesheet*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  addItem={addOperationAccounting}*/}
      {/*  onCancel={() => setIsModalOpen(false)}*/}
      {/*/>*/}
    </div>
  );
}