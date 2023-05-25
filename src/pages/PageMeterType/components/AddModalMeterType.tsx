import React, {useState, useEffect} from "react";
import {Form, Input, InputNumber, Modal, Select} from "antd";
import {AddModalProps, TypeMeterType, TypeUnit} from "../../../types";
import {getAllUnit} from "../../../services";

const {Option} = Select;

export const AddModalMeterType: React.FC<AddModalProps<TypeMeterType>> = ({
                                                                            isOpen,
                                                                            addItem,
                                                                            onCancel,
                                                                          }) => {
  const [form] = Form.useForm();

  // Все единицы измерения
  const [allUnit, setAllUnit] = useState<TypeUnit[]>();

  // Изменить выбранную единицу измерения
  const onChangeUnit = (values: string, option: any): TypeUnit => {
    const unit: TypeUnit = {
      id: option.id,
      name: values,
    };
    form.setFieldsValue({
      unit: unit
    });
    return unit
  };

  // Функция подтверждения добавления
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        return;
      });
  };

  // Функция для сброса формы при закрытии модального окна
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    getAllUnit().then((allUnit) => {
      setAllUnit(allUnit);
    });
  }, []);

  return (
    <Modal
      title={`Добавление нового типа счетчика`}
      open={isOpen}
      onCancel={handleCancel}
      width={700}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={{modifier: 'public'}}
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
          rules={[{required: true, message: 'выберите единицу измерения'}]}
        >
          <div>
            <Select
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
    </Modal>
  )
}