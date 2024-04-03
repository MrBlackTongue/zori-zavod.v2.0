import React, { useRef, useState } from 'react';
import type { GetRef } from 'antd';
import { InputNumber } from 'antd';

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
  const [value, setValue] = useState<number | null>(
    record[dataIndex] as number,
  );
  const inputRef = useRef<InputRef>(null);

  // Функция для переключения режима редактирования
  const toggleEdit = () => {
    setEditing(!editing);
    setValue(record[dataIndex] as number);
  };

  // Функция для сохранения изменений
  const onSave = () => {
    toggleEdit();
    handleSave({ ...record, [dataIndex]: value });
  };

  // Функция для выделения текста при фокусировке на InputNumber
  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  // Функция для обработки изменений значения InputNumber
  const onChange = (newValue: number | null) => {
    setValue(newValue);
  };

  if (editing) {
    return (
      <InputNumber
        autoFocus
        ref={inputRef}
        value={value}
        onChange={onChange}
        onBlur={onSave}
        onPressEnter={onSave}
        onFocus={onFocus}
      />
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
