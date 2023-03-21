import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditItemProps, OperationTypes, UnitTypes} from "../../types";
import {getOperationById, getAllUnits} from "../../services";

const {Option} = Select;

export const EditDrawerOperation: React.FC<EditItemProps<OperationTypes>> = ({
                                                            isOpen,
                                                            selectedItemId,
                                                            closeDrawer,
                                                            updateItem,
                                                          }) => {
  const [form] = Form.useForm();

  const [units, setUnits] = useState<UnitTypes[]>();
  const [selectedUnit, setSelectedUnit] = useState<UnitTypes>();
  const [unit, setUnit] = useState<UnitTypes>()

  const onChangeUnit = (values: string, option: any): UnitTypes => {
    const unit: UnitTypes = {
      id: option.id,
      name: values,
    };
    form.setFieldsValue({
      unit: unit
    });
    setSelectedUnit(unit)
    return unit
  };

  useEffect(() => {
    getAllUnits().then((units) => {
      setUnits(units);
    });
  }, []);

  useEffect(() => {
    if (selectedItemId) {
      getOperationById(selectedItemId).then((operation) => {
        form.setFieldsValue(operation)
        setSelectedUnit(operation?.unit)
        setUnit(operation?.unit)
      })
    }
  }, [selectedItemId, getOperationById]);

  return (
    <Drawer
      title="Редактирование операции"
      width={700}
      open={isOpen}
      onClose={()=> {
        setSelectedUnit(unit);
        closeDrawer()
      }}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={()=> {
            setSelectedUnit(unit);
            closeDrawer()
          }}>Отмена</Button>
          <Button onClick={() => {
            closeDrawer()
            form
              .validateFields()
              .then((values) => {
                // form.resetFields()
                updateItem(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" form='change-operation' htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        name="change-operation"
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Название операции"
          name="title"
          rules={[{required: true, message: 'Пожалуйста введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Единица измерения"
          name="unit"
        >
          <div>
            <Select
              value={selectedUnit ? selectedUnit.name : undefined}
              onChange={onChangeUnit}
            >
              {units && units.length > 0 ?
                units.map(unit => (
                  <Option id={unit.id} key={unit.id} value={unit.name}>
                    {unit.name}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          label="Норма"
          name="rate"
          rules={[{
            type: 'number',
            message: 'Пожалуйста напишите ставку цифрами больше 1',
            warningOnly: true,
            // pattern: /[1-9]/,
          }]}
        >
          <InputNumber/>
        </Form.Item>
      </Form>
    </Drawer>
  )
}