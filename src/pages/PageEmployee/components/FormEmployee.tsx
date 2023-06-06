import React from 'react';
import {Checkbox, Form, Input, InputNumber} from "antd";
import {FormEmployeeProps,} from "../../../types";

export const FormEmployee: React.FC<FormEmployeeProps> = ({
                                                            form,
                                                          }) => {
  return (
    <Form
      form={form}
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}
      style={{marginTop: 30}}
    >
      <Form.Item
        label="Имя"
        name="firstName"
        rules={[{required: true, message: 'введите имя'}]}
      >
        <Input placeholder='Иван'/>
      </Form.Item>
      <Form.Item
        label="Фамилия"
        name="lastName"
        rules={[{required: true, message: 'введите фамилию'}]}
      >
        <Input placeholder='Иванов'/>
      </Form.Item>
      <Form.Item
        label="Телефон"
        name="phone"
      >
        <Input placeholder='+7 999 999 99 99'/>
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
        <InputNumber placeholder='100' style={{width: '100%'}} min={0}/>
      </Form.Item>
      <Form.Item
        name="hired"
        valuePropName="checked"
        wrapperCol={{offset: 8, span: 16}}>
        <Checkbox>Нанят</Checkbox>
      </Form.Item>
    </Form>
  );
}