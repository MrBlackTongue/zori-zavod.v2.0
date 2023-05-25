import React, {useState, useEffect} from "react";
import {Button, Drawer, Form, Input, InputNumber, Select, Space} from "antd";
import {EditDrawerProps, TypeMeterType, TypeUnit} from "../../../types";
import {getMeterTypeById, getAllUnit} from "../../../services";

const {Option} = Select;

export const EditDrawerMeterType: React.FC<EditDrawerProps<TypeMeterType>> = ({
                                                                                isOpen,
                                                                                selectedItemId,
                                                                                closeDrawer,
                                                                                updateItem,
                                                                              }) => {
  const [form] = Form.useForm();

  // Все единицы измерения, выбранная единица измерения, единица измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();
  const [selectedUnit, setSelectedUnit] = useState<TypeUnit>();

  // Изменить выбранную единицу измерения
  const onChangeUnit = (values: string, option: any): TypeUnit => {
    const unit: TypeUnit = {
      id: option.id,
      name: values,
    };
    form.setFieldsValue({
      unit: unit
    });
    setSelectedUnit(unit)
    return unit
  };

  // Функция подтверждения редактирования
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateItem(values);
        closeDrawer();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        return;
      });
  }

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      getMeterTypeById(selectedItemId).then((meterType) => {
        form.setFieldsValue(meterType)
        setSelectedUnit(meterType?.unit)
      })
    } else {
      form.resetFields();
      setSelectedUnit(undefined);
    }
  }, [isOpen, selectedItemId]);

  return (
    <Drawer
      title="Редактирование типа счетчика"
      width={700}
      open={isOpen}
      onClose={closeDrawer}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Отмена</Button>
          <Button onClick={handleOk} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{required: true, message: 'введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Цена"
          name="cost"
          rules={[
            {required: true, message: "введите цену"},
            {type: 'number', min: 0.1, message: 'цена должна быть больше 0,1'}
          ]}
        >
          <InputNumber
            style={{width: "100%"}}
            min={0.01}
            formatter={(value) => `${value}`.replace('.', ',')}
            parser={(displayValue: string | undefined): number => {
              if (displayValue === undefined) {
                return 0;
              }
              return parseFloat(displayValue.replace(',', '.'));
            }}
          />
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
              {allUnit && allUnit.length > 0 ?
                allUnit.map(unit => (
                  <Option id={unit.id} key={unit.id} value={unit.name}>
                    {unit.name}
                  </Option>
                )) : null}
            </Select>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  )
}