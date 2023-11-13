import React from 'react';
import { Form, Input } from 'antd';
import { FormUnitProps } from '../../../../types';

export const FormUnit: React.FC<FormUnitProps> = ({ form }) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: 'введите имя' }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
