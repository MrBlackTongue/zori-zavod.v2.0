import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteOutputById, createOutput, updateChangeOutput} from "../../services";
import {TypeOutput, TypeOutputFormValue} from "../../types";
import {TableOutput} from "./components/TableOutput";
import {CreateModalOutput} from "./components/CreateModalOutput";
import {UpdateDrawerOutput} from "./components/UpdateDrawerOutput";
import dayjs from "dayjs";

const {Title} = Typography;

export const PageOutput: React.FC = () => {

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраного выпуска продукции
  const [selectedOutputId, setSelectedOutputId] = useState<number>();

  // Добавить новый выпуск продукции
  const handleCreateOutput = (values: TypeOutputFormValue): void => {
    const output: TypeOutput = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      product: {id: values.product}
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
  const handleUpdateOutput = (values: TypeOutputFormValue): void => {
    const output: TypeOutput = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      product: {id: values.product},
      id: selectedOutputId,
    };
    setIsDrawerOpen(false)
    updateChangeOutput(output)
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
            className='greenButton'
          >
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
      <CreateModalOutput
        isOpen={isModalOpen}
        createItem={handleCreateOutput}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerOutput
        isOpen={isDrawerOpen}
        selectedItemId={selectedOutputId}
        updateItem={handleUpdateOutput}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};