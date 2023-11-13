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

  // Обработчик фокусировки
  const handleFocus = () => {
    setOriginalHours(dayData?.hours ?? 0);
    setEditingDay({
      id: dayData?.id,
      workDate: dateFormat,
      hours: dayData?.hours ?? 0,
      employee: record.employee.id,
    });
  };

  // Обработчик изменения
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(parseInt(e.target.value, 10));
  };

  // Обработчик потери фокуса
  const handleBlur = () => {
    const employeeId = record.employee.id ?? 0;
    if (!isNaN(editingValue) && editingValue !== dayData?.hours) {
      handleDayChange(dateFormat, employeeId, String(editingValue));
    }
  };

  // Обработчик нажатия клавиши Enter
  const handlePressEnter = () => {
    const employeeId = record.employee.id ?? 0;
    if (!isNaN(editingValue) && editingValue !== dayData?.hours) {
      handleDayChange(dateFormat, employeeId, String(editingValue));
      // Можете также вызвать функцию, чтобы закончить редактирование, если есть такая
      // setEditingDay(null); // Если вы хотите сбросить состояние редактирования
    }
  };

  return (
    <Input
      placeholder={'00ч'}
      value={editingValue ? `${editingValue}` : ''}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      onPressEnter={handlePressEnter}
    />
  );
};
