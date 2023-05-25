import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined} from '@ant-design/icons';
import '../../App.css';
import {postNewMeter, putChangeMeter, deleteMeterById} from '../../services';
import {TypeMeter} from '../../types';
import {TableMeter} from "./components/TableMeter";
/*import {AddModalMeter} from "../PageMeter/components/AddModalMeter";*/
/*import {EditDrawerMeter} from "../PageMeter/components/EditDrawerMeter";*/

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
 /* const addMeter = (values: { [key: string]: any }): TypeMeter => {
    const Meter: TypeMeter = {
      amount: values.amount,
      product: {
        id: values.product.id,
      },
    };
    setIsModalOpen(false);
    postNewMeter(Meter);
    setUpdateTable(!updateTable);
    return Meter;
  };*/

  // Открыть дравер
  const openDrawer = (MeterId: number) => {
    setSelectedMeterId(MeterId);
    setIsDrawerOpen(true);
  };

  // Обновить товар на складе
  /*const updateMeter = (values: { [key: string]: any }): TypeMeter => {
    const Meter: TypeMeter = {
      id: selectedMeterId,
      amount: values.amount,
      product: {
        id: values.product.id,
      },
    };
    setIsDrawerOpen(false);
    putChangeMeter(Meter);
    setUpdateTable(!updateTable);
    return Meter;
  };*/

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
      {/*<AddModalMeter
        isOpen={isModalOpen}
        addItem={addMeter}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerMeter
        isOpen={isDrawerOpen}
        selectedItemId={selectedMeterId}
        updateItem={updateMeter}
        closeDrawer={() => setIsDrawerOpen(false)}
      />*/}
    </div>
  );
};