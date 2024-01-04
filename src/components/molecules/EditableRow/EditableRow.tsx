import React from 'react';
import { Form } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface EditableRowContextType {
  form: FormInstance;
  index: number;
}

export const EditableContext =
  React.createContext<EditableRowContextType | null>(null);

interface EditableRowProps {
  index: number;

  [key: string]: any; // Это позволяет передавать другие свойства
}

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={{ form, index }}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
