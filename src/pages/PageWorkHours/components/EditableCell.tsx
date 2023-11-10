import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import type {
  TypeWorkDay,
  TypeEditingDayState,
  TransformedWorkHour,
} from '../../../types';

interface EditableCellProps {
  dayData: TypeWorkDay;
  record: TransformedWorkHour;
  dateFormat: string;
  setOriginalHours: (hours: number) => void;
  setEditingDay: (editingDay: TypeEditingDayState | null) => void;
  handleDayChange: (date: string, employeeId: number, newValue: string) => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  dayData,
  record,
  dateFormat,
  setOriginalHours,
  setEditingDay,
  handleDayChange,
}) => {
  const [editingValue, setEditingValue] = useState(dayData?.hours);

  useEffect(() => {
    // Обновляем состояние editingValue каждый раз, когда изменяется dayData.hours
    setEditingValue(dayData?.hours);
  }, [dayData?.hours]);

  return (
    <Input
      placeholder={'00ч'}
      value={editingValue ? `${editingValue}` : ''}
      onFocus={() => {
        setOriginalHours(dayData?.hours ?? 0);
        setEditingDay({
          id: dayData?.id,
          workDate: dateFormat,
          hours: dayData?.hours ?? 0,
          employee: record.employee.id,
        });
      }}
      onChange={e => setEditingValue(parseInt(e.target.value, 10))}
      onBlur={() => {
        const employeeId = record.employee.id ?? 0;
        if (!isNaN(editingValue) && editingValue !== dayData?.hours) {
          handleDayChange(dateFormat, employeeId, String(editingValue));
        }
      }}
    />
  );
};
