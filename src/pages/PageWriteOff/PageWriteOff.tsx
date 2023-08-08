import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteWriteOffById, createWriteOff, updateWriteOff} from "../../services";
import {TypeWriteOff, TypeWriteOffFormValue} from "../../types";
import {TableWriteOff} from "./components/TableWriteOff";
import {CreateModalWriteOff} from "./components/CreateModalWriteOff";
import {UpdateDrawerWriteOff} from "./components/UpdateDrawerWriteOff";

export const PageWriteOff: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного списания
  const [selectedWriteOffId, setSelectedWriteOffId] = useState<number>();

  // Добавить новое списание
  const handleCreateWriteOff = (values: TypeWriteOffFormValue): void => {
    const writeOff: TypeWriteOff = {
      employee: {id: values.employee},
      productionType: {id: values.productionType},
      description: values.description,
    };
    setIsModalOpen(false)
    void createWriteOff(writeOff)
    setIsUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (writeOffId: number): void => {
    setSelectedWriteOffId(writeOffId)
    setIsDrawerOpen(true);
  };

  // Обновить списание
  const handleUpdateWriteOff = (values: TypeWriteOffFormValue): void => {
    const writeOff: TypeWriteOff = {
      id: selectedWriteOffId,
      employee: {id: values.employee},
      productionType: {id: values.productionType},
      description: values.description,
    };
    setIsDrawerOpen(false)
    void updateWriteOff(writeOff)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteWriteOff = (id: number): void => {
    void deleteWriteOffById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}> Списание со склада</Title>
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
      <TableWriteOff
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteWriteOff}
      />
      <CreateModalWriteOff
        isOpen={isModalOpen}
        createItem={handleCreateWriteOff}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerWriteOff
        isOpen={isDrawerOpen}
        selectedItemId={selectedWriteOffId}
        updateItem={handleUpdateWriteOff}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};