import React, {useState, useEffect} from 'react';
import {
  Typography,
  Space,
  Button,
  Form, FloatButton,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../App.css'
import {postNewOperation, putChangeOperation} from "../../services";
import {TypeOperation} from "../../types";
import {TableOperation} from "./components/TableOperation";
import {AddModalOperation} from "./components/AddModalOperation";
import {EditDrawerOperation} from "./components/EditDrawerOperation";

const {Title} = Typography;

export const PageOperation: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Операция
  const [operation] = useState<TypeOperation | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбрана операция по id
  const [selectedOperationId, setSelectedOperationId] = useState<number>();

  // Добавить новую операцию
  const addOperation = (values: { [key: string]: any }): TypeOperation => {
    const operation: TypeOperation = {
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


  // Открыть дравер
  const openDrawer = (operationId: number) => {
    setSelectedOperationId(operationId)
    setIsDrawerOpen(true);
  };

  // Обновить операцию
  const updateOperation = (values: { [key: string]: any }): TypeOperation => {
    const operation: TypeOperation = {
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

  useEffect(() => {
    if (operation) {
      form.setFieldsValue(operation);
    }
  }, [operation, form]);

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
      <FloatButton.BackTop />
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