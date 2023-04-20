import React, {useState, useEffect} from 'react';
import {
  Typography,
  Space,
  Button,
  Form, FloatButton,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../App.css'
import {postNewUnit, putChangeUnit} from "../../services";
import {TypeUnit} from "../../types";
import {TableUnit} from "./components/TableUnit";
import {AddModalUnit} from "./components/AddModalUnit";
import {EditDrawerUnit} from "./components/EditDrawerUnit";

const {Title} = Typography;

export const PageUnit: React.FC = () => {

  const [form] = Form.useForm();

  // Обновление таблицы
  const [updateTable, setUpdateTable] = useState(false);

  // Единица измерения
  const [unit] = useState<TypeUnit | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Выбрана единица измерения по id
  const [selectedUnitId, setSelectedUnitId] = useState<number>();

  // Добавить новую единицу измерения
  const addUnit = (values: { [key: string]: any }): TypeUnit => {
    const unit: TypeUnit = {
      name: values.name,
    };
    setIsModalOpen(false)
    postNewUnit(unit)
    setUpdateTable(!updateTable)
    return unit;
  };

  // Открыть дравер
  const openDrawer = (unitId: number) => {
    setSelectedUnitId(unitId)
    setIsDrawerOpen(true);
  };

  // Обновить единицу измерения
  const updateUnit = (values: { [key: string]: any }): TypeUnit => {
    const unit: TypeUnit = {
      name: values.name,
      id: selectedUnitId,
    };
    setIsDrawerOpen(false)
    putChangeUnit(unit)
    setUpdateTable(!updateTable)
    return unit
  };

  useEffect(() => {
    if (unit) {
      form.setFieldsValue(unit);
    }
  }, [unit, form]);

  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Единицы измерения</Title>
        <Space>
          <Button
            type="dashed"
            icon={<SyncOutlined/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            Обновить
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Добавить
          </Button>
        </Space>
      </div>
      <FloatButton.BackTop />
      <TableUnit
        isUpdateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalUnit
        isOpen={isModalOpen}
        addItem={addUnit}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerUnit
        isOpen={isDrawerOpen}
        selectedItemId={selectedUnitId}
        updateItem={updateUnit}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};