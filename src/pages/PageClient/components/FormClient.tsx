import React from 'react';
import {Form, Input} from "antd";
import {FormClientProps} from "../../../types";

export const FormClient: React.FC<FormClientProps> = ({
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
        name="title"
        rules={[{required: true, message: 'введите имя'}]}
      >
        <Input/>
      </Form.Item>
    </Form>
  );
}