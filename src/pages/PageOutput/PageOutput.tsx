import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteOutputById, createOutput, editChangeOutput} from "../../services";
import {TypeOutput} from "../../types";
import {TableOutput} from "./components/TableOutput";
import {AddModalOutput} from "./components/AddModalOutput";
import {EditDrawerOutput} from "./components/EditDrawerOutput";
import dayjs from "dayjs";

const {Title} = Typography;

export const PageOutput: React.FC = () => {

  // Обновление таблицы, id выбраного выпуска продукции
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedOutputId, setSelectedOutputId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить новый выпуск продукции
  const handleAddOutput = (values: TypeOutput): void => {
    const output: TypeOutput = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD'): undefined,
      product: {
        id: values.product?.id,
      }
    };
    setIsModalOpen(false)
    createOutput(output)
    setIsTableUpdate(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (outputId: number): void => {
    setSelectedOutputId(outputId)
    setIsDrawerOpen(true);
  };

  // Обновить выпуск продукции
  const handleUpdateOutput = (values: TypeOutput): void => {
    const output: TypeOutput = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD'): undefined,
      product: {
        id: values.product?.id,
      },
      id: selectedOutputId,
    };
    setIsDrawerOpen(false)
    editChangeOutput(output)
    setIsTableUpdate(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteOutput = (id: number): void => {
    deleteOutputById(id)
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Выпуски продукции</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsTableUpdate(prevState => !prevState)}
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
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeleteOutput}
      />
      <AddModalOutput
        isOpen={isModalOpen}
        addItem={handleAddOutput}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerOutput
        isOpen={isDrawerOpen}
        selectedItemId={selectedOutputId}
        updateItem={handleUpdateOutput}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};