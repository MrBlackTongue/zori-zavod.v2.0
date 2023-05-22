import React, {useState, useEffect} from "react";
import {Form, Input, InputNumber, Modal, Select} from "antd";
import {AddModalProps, TypeMeterType, TypeUnit} from "../../../types";
import {getAllUnit} from "../../../services";

const {Option} = Select;

export const AddModalMeterType: React.FC<AddModalProps<TypeMeterType>> = ({isOpen,
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
        const meterType: TypeMeterType = {
          title: values.title,
          cost: values.cost,  // добавьте это поле
          unit: {
            id: values.unit.id,
            name: values.unit.name,
          },
        };
        form.resetFields();
        addItem(meterType);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

  // Функция закрытия модального окна
  const handleClose = () => {
    onCancel()
  };

  useEffect(() => {
    getAllUnit().then((units) => {
      setAllUnit(units);
    });
  }, []);

  return (
    <Modal
      title={`Добавление нового типа счетчика`}
      open={isOpen}
      onCancel={handleClose}
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
          label="Название типа"
          name="title"
          rules={[{required: true, message: 'Введите название'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Цена за ед. изм."
          name="cost"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите цену за ед. изм.!',
            },
          ]}
        >
          <InputNumber style={{width: '100%'}} step={0.01} />
        </Form.Item>
        <Form.Item
          label="Единица измерения"
          name="unit"
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