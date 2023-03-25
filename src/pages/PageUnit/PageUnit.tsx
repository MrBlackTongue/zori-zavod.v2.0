import React, {useState, useEffect} from 'react';
import {
  Typography,
  Space,
  Button,
  Form,
} from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../App.css'
import {postNewUnit, putChangeUnit} from "../../services";
import {UnitType} from "../../types/_index";
import {TableUnit} from "./components/TableUnit";
import {AddModalUnit} from "./components/AddModalUnit";
import {EditDrawerUnit} from "./components/EditDrawerUnit";

const {Title} = Typography;

export const PageUnit: React.FC = () => {

  const [form] = Form.useForm();

  // Ед измерения в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новую единицу измерения
  const [unit] = useState<UnitType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть ед измерения по id
  const [selectedUnitId, setSelectedUnitId] = useState<number>();

  const addUnit = (values: { [key: string]: any }): UnitType => {
    const unit: UnitType = {
      name: values.name,
    };
    setIsModalOpen(false)
    postNewUnit(unit)
    setUpdateTable(!updateTable)
    return unit;
  };

  useEffect(() => {
    if (unit) {
      form.setFieldsValue(unit);
    }
  }, [unit, form]);

  // Drawer
  const openDrawer = (unitId: number) => {
    setSelectedUnitId(unitId)
    setIsDrawerOpen(true);
  };

  const updateUnit = (values: { [key: string]: any }): UnitType => {
    const unit: UnitType = {
      name: values.name,
      id: selectedUnitId,
    };
    setIsDrawerOpen(false)
    putChangeUnit(unit)
    setUpdateTable(!updateTable)
    return unit
  };

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