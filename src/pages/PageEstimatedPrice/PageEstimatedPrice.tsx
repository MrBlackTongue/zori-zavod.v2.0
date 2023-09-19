import React, { useState } from 'react';
import { Typography, Space, Button, FloatButton } from 'antd';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import '../../App.css';
import { deleteEstimatedPriceById, createEstimatedPrice, updateEstimatedPrice } from '../../services';
import { TypeEstimatedPrice, TypeEstimatedPriceFormValue } from '../../types';
// import { TableEstimatedPrice } from "./components/TableEstimatedPrice";
// import { CreateModalEstimatedPrice } from "./components/CreateModalEstimatedPrice";
// import { UpdateDrawerEstimatedPrice } from "./components/UpdateDrawerEstimatedPrice";
import dayjs from "dayjs";

export const PageEstimatedPrice: React.FC = () => {

  const { Title } = Typography;

  // Обновление таблицы, открыть/закрыть модальное окно, драйвер
  const [isUpdateTable, setIsUpdateTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // id выбраной расчетной цены
  const [selectedEstimatedPriceId, setSelectedEstimatedPriceId] = useState<number>();

  const handleCreateEstimatedPrice = (values: TypeEstimatedPriceFormValue): void => {
    const estimatedPrice: TypeEstimatedPrice = {
      // Здесь ваш код для инициализации estimatedPrice из values
    };
    setIsModalOpen(false);
    void createEstimatedPrice(estimatedPrice);
    setIsUpdateTable(prevState => !prevState);
  };

  const openDrawer = (estimatedPriceId: number): void => {
    setSelectedEstimatedPriceId(estimatedPriceId);
    setIsDrawerOpen(true);
  };

  const handleUpdateEstimatedPrice = (values: TypeEstimatedPriceFormValue): void => {
    const estimatedPrice: TypeEstimatedPrice = {
      id: selectedEstimatedPriceId,
      // Здесь ваш код для инициализации остальных полей
    };
    setIsDrawerOpen(false);
    void updateEstimatedPrice(estimatedPrice);
    setIsUpdateTable(prevState => !prevState);
  };

  const handleDeleteEstimatedPrice = (id: number): void => {
    void deleteEstimatedPriceById(id);
    setIsUpdateTable(prevState => !prevState);
  };

  return (
    <div style={{ display: 'grid' }}>
      <div className="centerTitle">
        <Title level={3}>Расчетные цены</Title>
        <Space>
          <Button
            type="dashed"
            className="greenButton"
            icon={<SyncOutlined />}
            onClick={() => setIsUpdateTable(prevState => !prevState)}
          >
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      {/*<TableEstimatedPrice*/}
      {/*  isUpdateTable={isUpdateTable}*/}
      {/*  openDrawer={openDrawer}*/}
      {/*  onDelete={handleDeleteEstimatedPrice}*/}
      {/*/>*/}
      {/*<CreateModalEstimatedPrice*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  createItem={handleCreateEstimatedPrice}*/}
      {/*  onCancel={() => setIsModalOpen(false)}*/}
      {/*/>*/}
      {/*<UpdateDrawerEstimatedPrice*/}
      {/*  isOpen={isDrawerOpen}*/}
      {/*  selectedItemId={selectedEstimatedPriceId}*/}
      {/*  updateItem={handleUpdateEstimatedPrice}*/}
      {/*  onCancel={() => setIsDrawerOpen(false)}*/}
      {/*/>*/}
    </div>
  );
};