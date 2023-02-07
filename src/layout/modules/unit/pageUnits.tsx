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
import '../../../App.css'
import './pageUnits.css';
import {
  postNewUnit,
  putChangeUnit,
} from "../../../requests/unitsRequests";
import {UnitType} from "../../../types/unitType";
import {AddUnit} from "./addUnit";
import {UnitsTable} from "./unitsTable";
import {EditUnit} from "./editUnit";

const {Title} = Typography;

const PageUnits: React.FC = () => {

  const [form] = Form.useForm();

  // Обновить лоудер, обновить тект кнопки "Обновить" todo: сделать анимационную кнопку обновления
  const [loading] = useState(false);
  const [updateButton] = useState('Обновить')

  // Ед измерения в таблице, обновить таблицу
  const [updateTable, setUpdateTable] = useState(false);

  // Создать новую единицу измерения
  const [unit] = useState<UnitType | null>(null);

  // Открыть закрыть модальное окно, дравер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открыть ед измерения по id
  const [selectedUnitId, setSelectedUnitId] = useState<number | undefined>();

  const addUnit = (values: { [key: string]: any }): UnitType => {
    const unit: UnitType = {
      name: values.name,
      id: values.number,
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
      id: values.id,
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
            icon={<SyncOutlined spin={loading}/>}
            onClick={() => setUpdateTable(!updateTable)}
            className='greenButton'>
            {updateButton}
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
      <UnitsTable
        updateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddUnit
        isOpen={isModalOpen}
        addUnit={addUnit}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditUnit
        isOpen={isDrawerOpen}
        selectedUnitId={selectedUnitId}
        updateUnit={updateUnit}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default PageUnits;