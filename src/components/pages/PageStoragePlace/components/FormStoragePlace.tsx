import React from 'react';
import { Form, Input } from 'antd';
import { FormStoragePlaceProps } from '../../../../types';

export const FormStoragePlace: React.FC<FormStoragePlaceProps> = ({ form }) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 30 }}>
      <Form.Item
        label="Название"
        name="title"
        rules={[{ required: true, message: 'введите название' }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
