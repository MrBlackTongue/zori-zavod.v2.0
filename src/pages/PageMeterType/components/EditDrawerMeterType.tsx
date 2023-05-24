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
  const [unit, setUnit] = useState<TypeUnit>()

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

  // Функция закрытия дравера
  const handleClose = () => {
    setSelectedUnit(unit);
    closeDrawer()
  };

  useEffect(() => {
    getAllUnit().then((unit) => {
      setAllUnit(unit);
    });
  }, []);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      getMeterTypeById(selectedItemId).then((meterType) => {
        form.setFieldsValue(meterType)
        setSelectedUnit(meterType?.unit)
        setUnit(meterType?.unit)
      })
    } else {
      form.resetFields();
    }
  }, [isOpen, selectedItemId]);

  return (
    <Drawer
      title="Редактирование счетчика"
      width={700}
      open={isOpen}
      onClose={handleClose}
      extra={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
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
          label="Название типа счетчика"
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
            {
              validator: (_, value) => {
                if (!value || /^\d+(\.\d{1,2})?$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Введите число в правильном формате (например, 12.34)'));
              },
            },
          ]}
        >
          <InputNumber style={{width: "100%"}}/>
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