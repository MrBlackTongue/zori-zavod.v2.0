import React, {useRef, useState} from 'react';
import type {GetRef} from 'antd';
import {Form, InputNumber} from 'antd';

// Тип для ссылки на InputNumber
type InputRef = GetRef<typeof InputNumber>;

interface EditableInputNumberProps<T> {
  children: React.ReactNode;
  dataIndex: keyof T;
  record: T;
  handleSave: (record: T) => void;
}

export const EditableInputNumber = <T,>({
  children,
  dataIndex,
  record,
  handleSave,
}: EditableInputNumberProps<T>) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();

  // Функция для переключения режима редактирования и установки значения поля формы
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  // Функция для сохранения изменений
  const onSave = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Ошибка сохранения:', errInfo);
    }
  };

  // Функция для выделения текста при фокусировке на InputNumber
  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  if (editing) {
    return (
      <Form form={form}>
        <Form.Item style={{ margin: 0 }} name={dataIndex as string}>
          <InputNumber
            autoFocus
            ref={inputRef}
            onBlur={onSave}
            onPressEnter={onSave}
            onFocus={onFocus}
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
};
