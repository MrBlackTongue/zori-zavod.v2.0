import React, {useState} from 'react';
import {Typography, Space, Button, FloatButton} from 'antd';
import {SyncOutlined, PlusOutlined,} from '@ant-design/icons';
import '../../App.css'
import {
  postNewProductionArea,
  putChangeProductionArea,
  deleteProductionAreaById,
} from "../../services";
import {TypeProductionArea} from "../../types";
import {TableProductionArea} from "./components/TableProductionArea";
import {AddModalProductionArea} from "./components/AddModalProductionArea";
import {EditDrawerProductionArea} from "./components/EditDrawerProductionArea";

const {Title} = Typography;

export const PageProductionArea: React.FC = () => {

  // Обновление таблицы, выбран тип производства по id
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedProductionAreaById, setSelectedProductionAreaById] = useState<number>();

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Добавить запись в таблицу
  const handleAddProductionArea = (values: { [key: string]: any }): void => {
    const productionArea: TypeProductionArea = {
      title: values.title,
      description: values.description,
    };
    setIsModalOpen(false)
    postNewProductionArea(productionArea)
    setUpdateTable(prevState => !prevState)
  };

  // Открыть дравер
  const openDrawer = (productionAreaId: number) => {
    setSelectedProductionAreaById(productionAreaId)
    setIsDrawerOpen(true);
  };

  // Обновить запись в таблице
  const handleUpdateProductionArea = (values: { [key: string]: any }): void => {
    const productionArea: TypeProductionArea = {
      id: selectedProductionAreaById,
      title: values.title,
      description: values.description,
    };
    setIsDrawerOpen(false)
    putChangeProductionArea(productionArea)
    setUpdateTable(prevState => !prevState)
  };

  // Удалить запись из таблицы
  const handleDeleteProductionArea = (id: number) => {
    deleteProductionAreaById(id).catch((error) => console.error(error));
    setUpdateTable(prevState => !prevState)
  };

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Тип производства</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(prevState => !prevState)}
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
      <TableProductionArea
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
        onDelete={handleDeleteProductionArea}
      />
      <AddModalProductionArea
        isOpen={isModalOpen}
        addItem={handleAddProductionArea}
        onCancel={() => setIsModalOpen(false)}
      />
      <EditDrawerProductionArea
        isOpen={isDrawerOpen}
        selectedItemId={selectedProductionAreaById}
        updateItem={handleUpdateProductionArea}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}