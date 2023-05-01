import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {postNewOutput, putChangeOutput} from "../../services";
import {TypeOutput} from "../../types";
import {TableOutput} from "./components/TableOutput";
import {AddModalOutput} from "./components/AddModalOutput";
import {EditDrawerOutput} from "./components/EditDrawerOutput";

const {Title} = Typography;

export const PageOutput: React.FC = () => {

  // Обновление таблицы, выбран выпуск продукции по id
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedOutputId, setSelectedOutputId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop/>
      <TableOutput
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalOutput
        isOpen={isModalOpen}
        addItem={addOutput}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerOutput
        isOpen={isDrawerOpen}
        selectedItemId={selectedOutputId}
        updateItem={updateOutput}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};