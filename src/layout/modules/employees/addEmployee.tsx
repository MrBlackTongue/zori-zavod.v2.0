import React from "react";
import {AddEmployeeProps} from "../../../types/employeeType";
import {Checkbox, Form, Input, InputNumber, Modal} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";

export const AddEmployee: React.FC<AddEmployeeProps> = ({
                                                                 open,
                                                                 onCreate,
                                                                 onCancel,
                                                               }) => {
  const [form] = Form.useForm();

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({hired: e.target.checked});
  }

  return (
    <Modal
      title={`Добавление нового сотрудника`}
      open={open}
      onCancel={onCancel}
      width={500}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="add-new-employee"
        initialValues={{
          modifier: 'public'
        }}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        style={{marginTop: 30}}
      >
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{required: true, message: 'Пожалуйста введите имя'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{required: true, message: 'Пожалуйста введите фамилию'}]}
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
          name="salaryRate"
          label="Ставка"
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
          name="hired"
          wrapperCol={{offset: 8, span: 16}}>
          <Checkbox onChange={onChangeCheckbox}>Нанят</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
}