import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteOutputById, createOutput, updateOutput} from "../../services";
import {TypeOutput, TypeOutputFormValue} from "../../types";
import {TableOutput} from "./components/TableOutput";
import {CreateModalOutput} from "./components/CreateModalOutput";
import {UpdateDrawerOutput} from "./components/UpdateDrawerOutput";
import dayjs from "dayjs";

export const PageOutput: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного выпуска продукции
  const [selectedOutputId, setSelectedOutputId] = useState<number>();

  // Добавить новый выпуск продукции
  const handleCreateOutput = (values: TypeOutputFormValue): void => {
    const output: TypeOutput = {
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      product: {id: values.product}
    };
    setIsModalOpen(false)
    void createOutput(output)
    setIsUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (id: number): void => {
    setSelectedOutputId(id)
    setIsDrawerOpen(true);
  };

  // Обновить выпуск продукции
  const handleUpdateOutput = (values: TypeOutputFormValue): void => {
    const output: TypeOutput = {
      id: selectedOutputId,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      product: {id: values.product},
    };
    setIsDrawerOpen(false)
    void updateOutput(output)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteOutput = (id: number): void => {
    void deleteOutputById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Выпуски продукции</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
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
        isUpdateTable={isUpdateTable}
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