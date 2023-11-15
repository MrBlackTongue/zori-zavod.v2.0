import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputRef } from 'antd';
import {
  TransformedWorkHour,
  TypeEditingDayState,
  TypeWorkDay,
} from '../../../../types';
import { EditableContext } from './EditableRow';

interface EditableCellProps {
  dayData: TypeWorkDay;
  record: TransformedWorkHour;
  dateFormat: string;
  setOriginalHours: (hours: number) => void;
  setEditingDay: (editingDay: TypeEditingDayState | null) => void;
  handleSave: (date: string, employeeId: number, newValue: string) => void;
  children: React.ReactNode; // Добавляем children
  title: string; // Добавляем title
  editable: boolean; // Добавляем editable (если необходимо)
  dataIndex: string; // Добавляем dataIndex (если необходимо)
}

// interface EditableCellProps {
//   title: React.ReactNode;
//   editable: boolean;
//   children: React.ReactNode;
//   dataIndex: keyof Item;
//   record: TypeWorkDay;
//   handleSave: (record: Item) => void;
// }

export const EditableCell: React.FC<EditableCellProps> = ({
  dayData,
  record,
  dateFormat,
  setOriginalHours,
  setEditingDay,
  // handleDayChange,
  handleSave,
  children,
  dataIndex,
  // title,
  // editable,
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

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue(dayData?.hours);
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();

      const date = Object.keys(values)[0];
      const newHoursRaw = values[date];
      const newHours =
        newHoursRaw !== undefined ? parseInt(newHoursRaw, 10) : 0;

      if (!isNaN(newHours)) {
        const employeeId = record.employee?.id; // Используйте оператор ?. для защиты от undefined

        if (employeeId !== undefined) {
          handleSave(date, employeeId, newHours.toString());
        } else {
          console.error('Employee ID is undefined');
        }
      } else {
        console.error('New hours is undefined or not a number');
      }
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editing) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
