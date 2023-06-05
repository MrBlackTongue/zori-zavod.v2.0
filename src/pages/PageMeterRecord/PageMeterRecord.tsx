import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton,} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {deleteMeterRecordById, createMeterRecord, editMeterRecord} from "../../services";
import {TypeMeterRecord, TypeMeterType} from "../../types";
import {TableMeterRecord} from "./components/TableMeterRecord";
// import {AddModalMeterRecord} from "./components/AddModalMeterRecord";
// import {EditDrawerMeterRecord} from "./components/EditDrawerMeterRecord";

const {Title} = Typography;

export const PageMeterRecord: React.FC = () => {

  // Обновление таблицы, id выбраного типа счетчика
  const [isTableUpdate, setIsTableUpdate] = useState(false);
  const [selectedMeterRecordId, setSelectedMeterRecordId] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить новый тип счетчика
  // const handleAddMeterRecord = (values: TypeMeterRecord): void => {
  //   const meterRecord: TypeMeterRecord = {
  //     title: values.title,
  //     unit: {
  //       id: values.unit?.id,
  //       name: values.unit?.name,
  //     },
  //     cost: values.cost,
  //   };
  //   setIsModalOpen(false)
  //   createMeterRecord(meterType)
  //   setIsTableUpdate(prevState => !prevState)
  // };

  // Открыть дравер
  const openDrawer = (meterTypeId: number): void => {
    setSelectedMeterRecordId(meterTypeId)
    setIsDrawerOpen(true);
  };

  // Обновить тип счетчика
  // const handleUpdateMeterRecord = (values: TypeMeterRecord): void => {
  //   const meterRecord: TypeMeterRecord = {
  //     title: values.title,
  //     unit: {
  //       id: values.unit?.id,
  //       name: values.unit?.name,
  //     },
  //     cost: values.cost,
  //     id: selectedMeterRecordId,
  //   };
  //   setIsDrawerOpen(false)
  //   editMeterRecord(meterRecord)
  //   setIsTableUpdate(prevState => !prevState)
  // };

  // Удалить запись из таблицы
  const handleDeleteMeterRecord = (id: number): void => {
    deleteMeterRecordById(id)
    setIsTableUpdate(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Записи счетчиков</Title>
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
      <TableMeterRecord
        isUpdateTable={isTableUpdate}
        openDrawer={openDrawer}
        onDelete={handleDeleteMeterRecord}
      />
      {/*<AddModalMeterType*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  addItem={handleAddMeterRecord}*/}
      {/*  onCancel={() => setIsModalOpen(false)}*/}
      {/*/>*/}
      {/*<EditDrawerMeterType*/}
      {/*  isOpen={isDrawerOpen}*/}
      {/*  selectedItemId={selectedMeterRecordId}*/}
      {/*  updateItem={handleUpdateMeterRecord}*/}
      {/*  closeDrawer={() => setIsDrawerOpen(false)}*/}
      {/*/>*/}
    </div>
  );
};