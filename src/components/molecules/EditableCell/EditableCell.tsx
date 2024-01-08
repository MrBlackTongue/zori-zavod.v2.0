import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputRef } from 'antd';
import '../../pages/WorkHours/components/TableWorkHour.css';
import { EditableContext } from '../EditableRow/EditableRow';
import { useWorkHoursContext } from '../../../contexts/WorkHoursContext';

interface EditableCellProps<T> {
  rowData: T;
  children: React.ReactNode;
  dataIndex: string;
  formattedHours: any;
  cellId: number | null | undefined;
  recordId: number | undefined;
  editable: boolean; // Добавляем editable (если необходимо)
}

export const EditableCell = <T,>({
  rowData,
  recordId,
  children,
  dataIndex,
  formattedHours,
  cellId,
  editable,
  ...restProps
}: EditableCellProps<T>) => {
  const {
    editingId,
    handleUpdateRecord,
    handleCreateNewRecord,
    handleEditStart,
  } = useWorkHoursContext();

  const [editing, setEditing] = useState(false);
  const [originalValue, setOriginalValue] = useState<number | null>(null);
  const inputRef = useRef<InputRef>(null);
  const context = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  if (!context) {
    // обработка случая, когда контекст не предоставлен
    return null;
  }
  const { form } = context;

  const toggleEdit = () => {
    setEditing(!editing);
    if (!editing) {
      form.setFieldsValue({ [dataIndex]: formattedHours });
      setOriginalValue(formattedHours);
      handleEditStart(dataIndex, rowData);
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
      // @ts-ignore
      handleCreateNewRecord(rowData, newValue, recordId ?? editingId);
    } else {
      // @ts-ignore
      handleUpdateRecord(rowData, newValue, recordId ?? editingId);
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
