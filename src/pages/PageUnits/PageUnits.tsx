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
import {UnitType} from "../../types";
import {AddModalUnit, TableUnits, EditDrawerUnit} from "../../components";

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
      <TableUnits
        updateTable={updateTable}
        openDrawer={openDrawer}
      />
      <AddModalUnit
        isOpen={isModalOpen}
        addUnit={addUnit}
        onCancel={() => {
          setIsModalOpen(false)
        }}
      />
      <EditDrawerUnit
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