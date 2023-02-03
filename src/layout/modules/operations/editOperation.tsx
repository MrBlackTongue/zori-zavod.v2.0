import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import {EditOperationProps} from "../../../types/operationType";
import {getOperationById} from "../../../requests/operationsRequests";
import {UnitType} from "../../../types/unitType";
import {getAllUnits} from "../../../requests/unitsRequests";

const {Option} = Select;

export const EditOperation: React.FC<EditOperationProps> = ({
                                                            isOpen,
                                                            selectedOperationId,
                                                            closeDrawer,
                                                            updateOperation,
                                                          }) => {
  const [form] = Form.useForm();

  const [units, setUnits] = useState<UnitType[]>();
  const [selectedUnit, setSelectedUnit] = useState<UnitType>();

  const onChangeUnit = (values: string, option: any): UnitType => {
    const unit: UnitType = {
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
    if (selectedOperationId) {
      getOperationById(selectedOperationId).then((operation) => {
        form.setFieldsValue(operation)
        setSelectedUnit(operation?.unit)
        console.log('operation', operation)
      })
    }
  }, [selectedOperationId, getOperationById]);

  return (
    <Drawer
      title="Редактирование операции"
      width={700}
      open={isOpen}
      onClose={()=> {
        setSelectedUnit(undefined);
        closeDrawer()
      }}
      bodyStyle={{paddingBottom: 80}}
      extra={
        <Space>
          <Button onClick={()=> {
            setSelectedUnit(undefined);
            closeDrawer()
          }}>Отмена</Button>
          <Button onClick={() => {
            closeDrawer()
            form
              .validateFields()
              .then((values) => {
                // form.resetFields()
                updateOperation(values);
                setSelectedUnit(undefined);
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          }} type="primary" form='change-worker' htmlType="submit">
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
          {/*<Input />*/}
          <div>
            <Select
              value={selectedUnit ? selectedUnit.name : undefined}
              // value={operation ? operation.unit.name : undefined}
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
        <Form.Item
          name='id'>
        </Form.Item>
      </Form>
    </Drawer>
  )
}