import React from 'react';
import {Input, Form} from "antd";
import {FormProductTypeProps} from "../../../types";

export const FormProductionType: React.FC<FormProductTypeProps> = ({
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
        label="Название"
        name="title"
        rules={[{required: true, message: 'введите название'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[{required: true, message: 'введите описание'}]}
      >
        <Input.TextArea/>
      </Form.Item>
    </Form>
  );
}