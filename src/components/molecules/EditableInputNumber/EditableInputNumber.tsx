import React, { useEffect, useRef, useState } from 'react';
import type { GetRef } from 'antd';
import { Form, InputNumber } from 'antd';

type InputRef = GetRef<typeof InputNumber>;

interface EditableInputNumberProps<T> {
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof T;
  record: T;
  handleSave: (record: T) => void;
}

export const EditableInputNumber = <T,>({
  editable,
  children,
  dataIndex,
  record,
  handleSave,
}: EditableInputNumberProps<T>) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Ошибка сохранения:', errInfo);
    }
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  if (editable) {
    if (editing) {
      return (
        <Form form={form}>
          <Form.Item style={{ margin: 0 }} name={dataIndex as string}>
            <InputNumber
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
              autoFocus
              onFocus={handleInputFocus}
            />
          </Form.Item>
        </Form>
      );
    }
    return (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};
