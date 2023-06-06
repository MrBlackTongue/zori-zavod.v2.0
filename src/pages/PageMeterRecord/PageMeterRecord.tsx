import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {createMeterRecord, updateMeterRecord, deleteMeterRecordById} from "../../services";
import {TypeMeterRecord, TypeMeterRecordFormValue} from "../../types";
import {TableMeterRecord} from "./components/TableMeterRecord";
import {CreateModalMeterRecord} from "./components/CreateModalMeterRecord";
import {UpdateDrawerMeterRecord} from "./components/UpdateDrawerMeterRecord";
import dayjs from "dayjs";

export const PageMeterRecord: React.FC = () => {

  const {Title} = Typography;

  // Обновление таблицы, Открыть закрыть модальное окно, дравер
  const [isUpdateTable, setIsUpdateTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // id выбраного типа счетчика
  const [selectedMeterRecordId, setSelectedMeterRecordId] = useState<number>();

  // Добавить новый тип счетчика
  const handleCreateMeterRecord = (values: TypeMeterRecordFormValue): void => {
    const meterRecord: TypeMeterRecord = {
      value: values.value,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss') : undefined,
      meterDto: {id: values.meterDto},
    };
    setIsModalOpen(false)
    createMeterRecord(meterRecord)
    setIsUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (id: number): void => {
    setSelectedMeterRecordId(id)
    setIsDrawerOpen(true);
  };

  // Обновить запись счетчика
  const handleUpdateMeterRecord = (values: TypeMeterRecordFormValue): void => {
    const meterRecord: TypeMeterRecord = {
      id: selectedMeterRecordId,
      value: values.value,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss') : undefined,
      meterDto: {id: values.meterDto},
    };
    setIsDrawerOpen(false)
    updateMeterRecord(meterRecord)
    setIsUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteMeterRecord = (id: number): void => {
    deleteMeterRecordById(id)
    setIsUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Записи счетчиков</Title>
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
      <TableMeterRecord
        isUpdateTable={isUpdateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteMeterRecord}
      />
      <CreateModalMeterRecord
        isOpen={isModalOpen}
        createItem={handleCreateMeterRecord}
        onCancel={() => setIsModalOpen(false)}
      />
      <UpdateDrawerMeterRecord
        isOpen={isDrawerOpen}
        selectedItemId={selectedMeterRecordId}
        updateItem={handleUpdateMeterRecord}
        onCancel={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};