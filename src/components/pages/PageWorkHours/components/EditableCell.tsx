import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputRef } from 'antd';
import {
  TransformedWorkHour,
  TypeEditingDayState,
  TypeWorkDay,
} from '../../../../types';
import { EditableContext } from './EditableRow';
import { formatMinutesToTime, timeToMinutes } from '../../../../utils';

interface EditableCellProps {
  record: TransformedWorkHour;
  dateFormat: string;
  originalHours: number | null;
  editingEmployee: number | null;
  setOriginalHours: (duration: number | null) => void;
  setEditingDay: (editingDay: TypeEditingDayState | null) => void;
  handleSave: (date: string, employeeId: number, newValue: string) => void;
  children: React.ReactNode; // Добавляем children
  // title: string; // Добавляем title
  editable: boolean; // Добавляем editable (если необходимо)
  dataIndex: string; // Добавляем dataIndex (если необходимо)
  dayData: TypeWorkDay;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  record,
  dateFormat,
  setOriginalHours,
  originalHours,
  setEditingDay,
  editingEmployee,
  handleSave,
  children,
  dataIndex,
  editable,
  dayData,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
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

  // Отформатированные часы
  const formattedHours =
    dayData && dayData.duration !== null
      ? formatMinutesToTime(dayData.duration)
      : '';

  const toggleEdit = () => {
    setEditing(!editing);

    // Если мы переходим в режим редактирования, устанавливаем форматированное время в поле ввода
    if (!editing) {
      const formattedTime =
        dayData && dayData.duration !== null
          ? formatMinutesToTime(dayData.duration)
          : null;
      form.setFieldsValue({ [dataIndex]: formattedTime });
      setOriginalHours(dayData?.duration ?? 0);
      setEditingDay({
        id: dayData.id,
        workDate: dateFormat,
        duration: originalHours ?? 0,
        employee: record.employee?.id,
      });
    }
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();

      const date = Object.keys(values)[0];
      const timeString = values[date]; // получаем строку времени в формате чч:мм
      const newDuration = timeToMinutes(timeString); // преобразуем время в минуты

      if (newDuration !== null && newDuration !== originalHours) {
        const employeeId = record.employee?.id ?? editingEmployee;
        if (employeeId !== undefined && employeeId !== null) {
          handleSave(date, employeeId, newDuration.toString());
        } else {
          console.error('Employee ID is undefined');
        }
      }
      console.log('newDuration:', newDuration);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable && (editingEmployee !== null || record.employee)) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0, width: 80 }} name={dataIndex}>
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          placeholder={dayData && dayData.duration === null ? 'чч:мм' : ''}
        />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {formattedHours || <span style={{ color: 'lightgray' }}>чч:мм</span>}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
