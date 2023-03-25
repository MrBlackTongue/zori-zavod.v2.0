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
import '../../App.css'
import {postNewOperation, putChangeOperation} from "../../services";
import {OperationType} from "../../types";
import {TableOperation} from "./components/TableOperation";
import {AddModalOperation} from "./components/AddModalOperation";
import {EditDrawerOperation} from "./components/EditDrawerOperation";

const {Title} = Typography;

export const PageOperation: React.FC = () => {

  const [form] = Form.useForm();

  // Типы операций в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новый тип операции
  const [operation] = useState<OperationType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть тип операции по id
  const [selectedOperationId, setSelectedOperationId] = useState<number>();

  const addOperation = (values: { [key: string]: any }): OperationType => {
    const operation: OperationType = {
      title: values.title,
      unit: {
        id: values.unit.id,
        name: values.unit.name,
      },
      rate: values.rate,
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
      id: selectedOperationId,
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
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
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
      <TableOperation
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalOperation
        isOpen={isModalOpen}
        addItem={addOperation}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerOperation
        isOpen={isDrawerOpen}
        selectedItemId={selectedOperationId}
        updateItem={updateOperation}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
}