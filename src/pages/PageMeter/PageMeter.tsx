import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css';
import {createMeter, updateMeter, deleteMeterById} from '../../services';
import {TypeMeter, TypeMeterFormValue} from '../../types';
import {TableMeter} from "./components/TableMeter";
import {CreateModalMeter} from "./components/CreateModalMeter";
import {UpdateDrawerMeter} from "./components/UpdateDrawerMeter";

export const PageMeter: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраного счётчика
  const [selectedMeterId, setSelectedMeterId] = useState<number>();

  // Добавить новый счётчик
  const handleCreateMeter = (values: TypeMeterFormValue): void => {
    const meter: TypeMeter = {
      serialNumber: values.serialNumber,
      description: values.description,
      meterTypeDto: {id: values.meterTypeDto},
    };
    setIsModalOpen(false);
    createMeter(meter);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть дравер
  const openDrawer = (meterId: number): void => {
    setSelectedMeterId(meterId);
    setIsDrawerOpen(true);
  };

  // Обновить счетчик
  const handleUpdateMeter = (values: TypeMeterFormValue): void => {
    const meter: TypeMeter = {
      id: selectedMeterId,
      serialNumber: values.serialNumber,
      description: values.description,
      meterTypeDto: {id: values.meterTypeDto},
    };
    setIsDrawerOpen(false);
    updateMeter(meter);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteMeter = (id: number): void => {
    deleteMeterById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{display: 'grid'}}>
      <div className="centerTitle">
        <Title level={3}>Счётчики</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
            className="greenButton"
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
      <TableMeter
        isUpdateTable={isUpdateTable}
        onDelete={handleDeleteMeter}
        openDrawer={openDrawer}
      />
      <CreateModalMeter
        isOpen={isModalOpen}
        createItem={handleCreateMeter}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerMeter
        isOpen={isDrawerOpen}
        selectedItemId={selectedMeterId}
        updateItem={handleUpdateMeter}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};