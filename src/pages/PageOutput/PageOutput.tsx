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
import {postNewOutput, putChangeOutput} from "../../services";
import {TypeOutput} from "../../types";
import {TableOutput} from "./components/TableOutput";
import {AddModalOutput} from "./components/AddModalOutput";
import {EditDrawerOutput} from "./components/EditDrawerOutput";

const {Title} = Typography;

export const PageOutput: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Выпуск продукции
  const [output] = useState<TypeOutput | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбран выпуск продукции по id
  const [selectedOutputId, setSelectedOutputId] = useState<number>();

  // Добавить новый выпуск продукции
  const addOutput = (values: { [key: string]: any }): TypeOutput => {
    const output: TypeOutput = {
      date: values['date'].format('YYYY-MM-DD'),
      product: {
        id: values.product,
      }
    };
    setIsModalOpen(false)
    postNewOutput(output)
    setUpdateTable(!updateTable)
    return output;
  };

  // Открыть дравер
  const openDrawer = (outputId: number) => {
    setSelectedOutputId(outputId)
    setIsDrawerOpen(true);
  };

  // Обновить выпуск продукции
  const updateOutput = (values: { [key: string]: any }): TypeOutput => {
    const output: TypeOutput = {
      date: values['date'].format('YYYY-MM-DD'),
      product: {
        id: values.product,
      },
      id: selectedOutputId,
    };
    setIsDrawerOpen(false)
    putChangeOutput(output)
    setUpdateTable(!updateTable)
    return output
  };

  useEffect(() => {
    if (output) {
      form.setFieldsValue(output);
    }
  }, [output, form]);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Выпуски продукции</Title>
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
      <TableOutput
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalOutput
        isOpen={isModalOpen}
        addItem={addOutput}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerOutput
        isOpen={isDrawerOpen}
        selectedItemId={selectedOutputId}
        updateItem={updateOutput}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};