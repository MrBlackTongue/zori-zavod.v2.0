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
import './pageOutputs.css';
import {
  postNewOutput,
  putChangeOutput,
} from "../../../requests/outputsRequests";
import {OutputType} from "../../../types/outputType";
import {AddOutput} from "./addOutput";
import {OutputsTable} from "./outputsTable";
import {EditOutput} from "./editOutput";

const {Title} = Typography;

const PageOutputs: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

  // Выпуски продукции в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новый выпуск продукции
  const [output] = useState<OutputType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть выпуск продукции по id
  const [selectedOutputId, setSelectedOutputId] = useState<number | undefined>();

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
      id: values.id,
    };
    console.log('values2 :', values)
    setIsDrawerOpen(false)
    // putChangeOutput(output)
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
      <OutputsTable
        updateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddOutput
        isOpen={isModalOpen}
        addOutput={addOutput}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditOutput
        isOpen={isDrawerOpen}
        selectedOutputId={selectedOutputId}
        updateOutput={updateOutput}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default PageOutputs;