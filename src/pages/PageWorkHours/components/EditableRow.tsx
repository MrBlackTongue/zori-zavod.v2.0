import React from 'react';
import { EditableRowProps } from '../../../types';
import { Form } from 'antd';

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <tr {...props} />
    </Form>
  );
};
