import React from 'react';
import { Form, Input } from 'antd';
import { FormProps, TypeClientFormValue } from '../../../../types';
import FormActions from '../../../atoms/FormActions/FormActions';

export const ClientFormView: React.FC<FormProps<TypeClientFormValue>> = ({
  form,
  title,
  onFinish,
  onCancel,
}) => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        style={{ marginTop: 30 }}
        onFinish={onFinish}>
        <Form.Item
          label="Имя"
          name="title"
          rules={[{ required: true, message: 'введите имя' }]}>
          <Input />
        </Form.Item>
        <FormActions onCancel={onCancel} />
      </Form>
    </div>
  );
};
