import React from "react";
import {AddModalProps, TypeEmployee} from "../../../types";
import {Checkbox, Form, Input, InputNumber, Modal} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";

export const AddModalEmployee: React.FC<AddModalProps<TypeEmployee>> = ({
                                                                          isOpen,
                                                                          addItem,
                                                                          onCancel,
                                                                        }) => {
  const [form] = Form.useForm();

  // Изменить состояние чекбокса
  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({hired: e.target.checked});
  }

  // Функция подтверждения добавления
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addItem(values);
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  }

  return (
    <Modal
      title={`Добавление нового сотрудника`}
      open={isOpen}
      onCancel={onCancel}
      width={500}
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
          label="Имя"
          name="firstName"
          rules={[{required: true, message: 'введите имя'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{required: true, message: 'введите фамилию'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Ставка"
          name="salaryRate"
          rules={[{
            type: 'number',
            message: 'напишите ставку цифрами больше 1',
            warningOnly: true,
          }]}
        >
          <InputNumber style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
          name="hired"
          wrapperCol={{offset: 8, span: 16}}>
          <Checkbox onChange={onChangeCheckbox}>Нанят</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
}