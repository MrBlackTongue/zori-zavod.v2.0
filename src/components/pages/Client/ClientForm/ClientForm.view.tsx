import React from 'react';
import { Form, Input } from 'antd';
import { FormViewProps, TypeClient } from '../../../../types';
import FormActions from '../../../atoms/FormActions/FormActions';

export const ClientFormView: React.FC<FormViewProps<TypeClient>> = ({
  form,
  title,
  onFinish,
  onCancel,
}) => {
  return (
    <div className="form-style">
      <h2 className="center-text">{title}</h2>
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
