import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css';
import {postNewMeter, putChangeMeter, deleteMeterById} from '../../services';
import {TypeMeter} from '../../types';
import {TableMeter} from "./components/TableMeter";
import {AddModalMeter} from "./components/AddModalMeter";
import {EditDrawerMeter} from "./components/EditDrawerMeter";

const {Title} = Typography;

export const PageMeter: React.FC = () => {
  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбран счётчик по id
  const [selectedMeterId, setSelectedMeterId] = useState<number>();

  // Добавить новый счётчик
  const addMeter = (values: TypeMeter): TypeMeter => {
    console.log('values:', values);
    const meter: TypeMeter = {
      id: values.id,
      serialNumber: values.serialNumber,
      description: values.description,
      meterTypeDto: values.meterTypeDto,
    };
    setIsModalOpen(false);

    postNewMeter(meter);
    setUpdateTable(prevState => !prevState);
    return meter;
  };

  // Открыть дравер
  const openDrawer = (MeterId: number) => {
    setSelectedMeterId(MeterId);
    setIsDrawerOpen(true);
  };

  // Обновить счетчик
  const handleUpdateMeter = (values: TypeMeter): TypeMeter => {
    const meter: TypeMeter = {
      id: selectedMeterId,
      serialNumber: values.serialNumber,
      description: values.description,
      meterTypeDto: {
        id: values.meterTypeDto?.id,
      },
    };
    setIsDrawerOpen(false);
    putChangeMeter(meter);
    setUpdateTable(!updateTable);
    return meter;
  };

  // Удалить запись из таблицы
  const handleDelete = (id: number) => {
    deleteMeterById(id).catch((error) => console.error(error));
    setUpdateTable(!updateTable);
  };

  return (
    <div style={{display: 'grid'}}>
      <div className="centerTitle">
        <Title level={3}>Счётчики</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
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
        isUpdateTable={updateTable}
        onDelete={handleDelete}
        openDrawer={openDrawer}
      />
      <AddModalMeter
        isOpen={isModalOpen}
        addItem={addMeter}
        onCancel={() => setIsModalOpen(false)}
      />
        <EditDrawerMeter
          isOpen={isDrawerOpen}
          selectedItemId={selectedMeterId}
          updateItem={handleUpdateMeter}
          closeDrawer={() => setIsDrawerOpen(false)}
        />
    </div>
  );
};