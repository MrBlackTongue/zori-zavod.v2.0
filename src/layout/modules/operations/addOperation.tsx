import React, {useEffect, useState} from "react";
import {AddOperationProps} from "../../../types/operationType";
import {Form, Input, InputNumber, Modal, Select} from "antd";
import {UnitType} from "../../../types/unitType";
import {getAllUnits} from "../../../requests/unitsRequests";

const {Option} = Select;

export const AddOperation: React.FC<AddOperationProps> = ({
                                                            isOpen,
                                                            addOperation,
                                                            onCancel,
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
    console.log('values', values)
    console.log('selectedUnit.name', selectedUnit?.name)
    return unit
  };

  useEffect(() => {
    getAllUnits().then((units) => {
      setUnits(units);
    });
  }, []);

  return (
    <Modal
      title={`Добавление новой операции`}
      open={isOpen}
      onCancel={()=> {
        setSelectedUnit(undefined);
        onCancel()
      }}
      width={700}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            setSelectedUnit(undefined);
            addOperation(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="add-new-operation"
        initialValues={{
          modifier: 'public'
        }}
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
    </Modal>
  )
}