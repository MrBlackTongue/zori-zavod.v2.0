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
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбранного счетчика
  const [selectedMeterId, setSelectedMeterId] = useState<number>();

  // Добавить новый счетчик
  const handleCreateMeter = async (values: TypeMeterFormValue): Promise<void> => {
    const meter: TypeMeter = {
      serialNumber: values.serialNumber,
      title: values.title,
      meterType: {id: values.meterType},
    };
    setIsModalOpen(false);
    await createMeter(meter);
    setIsUpdateTable(prevState => !prevState);
  };

  // Открыть дравер
  const openDrawer = (id: number): void => {
    setSelectedMeterId(id);
    setIsDrawerOpen(true);
  };

  // Обновить счетчик
  const handleUpdateMeter = async (values: TypeMeterFormValue): Promise<void> => {
    const meter: TypeMeter = {
      id: selectedMeterId,
      serialNumber: values.serialNumber,
      title: values.title,
      meterType: {id: values.meterType},
    };
    setIsDrawerOpen(false);
    await updateMeter(meter);
    setIsUpdateTable(prevState => !prevState);
  };

  // Удалить запись из таблицы
  const handleDeleteMeter = async (id: number): Promise<void> => {
    await deleteMeterById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{display: 'grid'}}>
      <div className="centerTitle">
        <Title level={3}>Счетчики</Title>
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
        openDrawer={openDrawer}
        onDelete={handleDeleteMeter}
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