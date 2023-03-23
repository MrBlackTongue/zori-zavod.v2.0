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
import {OutputType} from "../../types";
import {AddModalOutput, TableOutputs, EditDrawerOutput} from "../../components";

const {Title} = Typography;

export const PageOutputs: React.FC = () => {

  const [form] = Form.useForm();

  // Выпуски продукции в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новый выпуск продукции
  const [output] = useState<OutputType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть выпуск продукции по id
  const [selectedOutputId, setSelectedOutputId] = useState<number>();

  const addOutput = (values: { [key: string]: any }): OutputType => {
    const output: OutputType = {
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

  useEffect(() => {
    if (output) {
      form.setFieldsValue(output);
    }
  }, [output, form]);

  // Drawer
  const openDrawer = (outputId: number) => {
    setSelectedOutputId(outputId)
    setIsDrawerOpen(true);
  };

  const updateOutput = (values: { [key: string]: any }): OutputType => {
    const output: OutputType = {
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
      <TableOutputs
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