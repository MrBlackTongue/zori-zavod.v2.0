import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputRef } from 'antd';
import '../../pages/WorkHours/components/TableWorkHour.css';
import { EditableContext } from '../EditableRow/EditableRow';
import { useWorkHoursContext } from '../../../contexts/WorkHoursContext';

interface EditableCellProps<T> {
  rowData: T;
  editingId: number | null;
  onEditStart: (args: T) => void;
  handleUpdateRecord: (rowData: T, newValue: string) => void;
  handleCreateNewRecord: (rowData: T, newValue: string) => void;
  children: React.ReactNode; // Добавляем children
  editable: boolean; // Добавляем editable (если необходимо)
  dataIndex: string; // Добавляем dataIndex (если необходимо)
  formatValue?: (value: any) => string; // Функция для форматирования значения
  initialValue?: any; // Исходное значение для редактирования
  formattedHours: string;
  cellId: number | null | undefined;
  isEditableCondition?: (rowData: T) => boolean;
}

export const EditableCell = <T,>({
  rowData,
  editingId,
  onEditStart,
  handleUpdateRecord,
  handleCreateNewRecord,
  children,
  dataIndex,
  editable,
  formatValue = value => value.toString(),
  isEditableCondition = () => true, // По умолчанию всегда редактируема
  initialValue,
  formattedHours,
  cellId,
  ...restProps
}: EditableCellProps<T>) => {
  const {} = useWorkHoursContext();

  const [editing, setEditing] = useState(false);
  const [originalValue, setOriginalValue] = useState<number | null>(null);
  const inputRef = useRef<InputRef>(null);
  const context = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const isEditable = editable && isEditableCondition(rowData);

  if (!context) {
    // обработка случая, когда контекст не предоставлен
    return null;
  }
  const { form } = context;

  const toggleEdit = () => {
    setEditing(!editing);
    if (!editing) {
      form.setFieldsValue({ [dataIndex]: formatValue(initialValue) });
      setOriginalValue(initialValue);
      onEditStart(rowData);
    }
  };

  const save = async () => {
    const values = await form.validateFields();
    toggleEdit();
    const newValue = values[dataIndex];
    if (newValue === originalValue) {
      return;
    }
    if (cellId === null) {
      handleCreateNewRecord(rowData, newValue);
    } else {
      handleUpdateRecord(rowData, newValue);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0, width: 80 }} name={dataIndex}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        onClick={toggleEdit}
        onKeyDown={e => e.key === 'Enter' && toggleEdit()}
        tabIndex={0} // Добавляем tabIndex, чтобы элемент стал фокусируемым
        aria-pressed={editing} // Для индикации состояния для вспомогательных технологий
      >
        {formattedHours || <span style={{ color: 'lightgray' }}>чч:мм</span>}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
