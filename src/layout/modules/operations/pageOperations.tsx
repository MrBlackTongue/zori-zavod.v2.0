import React, {useState, useEffect} from 'react';
import {
  Typography,
  Space,
  Button,
  Form,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../../App.css'
import './pageOperations.css';
import {
  postNewOperation,
  putChangeOperation,
} from "../../../requests/operationsRequests";
import {OperationType} from "../../../types/operationType";
import {AddOperation} from "./addOperation";
import {OperationsTable} from "./OperationsTable";
import {EditOperation} from "./editOperation";

const {Title} = Typography;

const PageOperations: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

  // Типы операций в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новый тип операции
  const [operation] = useState<OperationType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть тип операции по id
  const [selectedOperationId, setSelectedOperationId] = useState<number | undefined>();

  const addOperation = (values: { [key: string]: any }): OperationType => {
    const operation: OperationType = {
      title: values.title,
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
      rate: values.rate,
      id: values.number,
    };
    setIsModalOpen(false)
    postNewOperation(operation)
    setUpdateTable(!updateTable)
    return operation;
  };

  useEffect(() => {
    if (operation) {
      form.setFieldsValue(operation);
    }
  }, [operation, form]);

  // Drawer
  const openDrawer = (operationId: number) => {
    setSelectedOperationId(operationId)
    setIsDrawerOpen(true);
  };

  const updateOperation = (values: { [key: string]: any }): OperationType => {
    const operation: OperationType = {
      title: values.title,
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
      rate: values.rate,
      id: values.id,
    };
    setIsDrawerOpen(false)
    putChangeOperation(operation)
    setUpdateTable(!updateTable)
    return operation
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Типы операций</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined spin={loading}/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            {updateButton}
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <OperationsTable
        updateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddOperation
        isOpen={isModalOpen}
        addOperation={addOperation}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditOperation
        isOpen={isDrawerOpen}
        selectedOperationId={selectedOperationId}
        updateOperation={updateOperation}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
}

export default PageOperations;