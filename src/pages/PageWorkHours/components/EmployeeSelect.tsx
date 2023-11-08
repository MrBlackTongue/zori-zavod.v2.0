import React from 'react';
import { Select } from 'antd';
import type { TransformedWorkHour, TypeEmployee } from '../../../types';

interface EditableSelectProps {
  employees: TypeEmployee[]; // Изменим название свойства на `employees`, чтобы было понятно, что это массив
  editingEmployee: number | null;
  handleEmployeeChange: (employeeId: number) => void;
  record: TransformedWorkHour;
}

export const EmployeeSelect: React.FC<EditableSelectProps> = ({
  employees, // Исправляем название свойства здесь тоже
  editingEmployee,
  handleEmployeeChange,
  record,
}) => {
  // Проверяем, что record и record.employee определены
  if (!record?.employee) {
    // Рендерим запасной UI или возвращаем null, чтобы ничего не рендерить
    return <span>Нет данных о сотруднике</span>;
  }
  // Продолжаем рендеринг, если record.employee.id определен
  if (editingEmployee === record.employee.id) {
    return (
      <Select
        defaultValue={String(record.employee.id)} // Используем `id` сотрудника из `record`
        style={{ width: 200 }}
        onChange={value => handleEmployeeChange(Number(value))}>
        {employees.map(e => (
          <Select.Option key={e.id} value={String(e.id)}>
            {`${e.lastName} ${e.firstName}`}
          </Select.Option>
        ))}
      </Select>
    );
  }

  return (
    <span
      onClick={() => {
        if (typeof record.employee.id === 'number') {
          handleEmployeeChange(record.employee.id);
        } else {
          // Обработайте случай, когда id не определен
          console.error('Employee ID is undefined');
        }
      }}>
      {' '}
      {/* Используем `id` сотрудника из `record` */}
      {`${record.employee.lastName} ${record.employee.firstName}`}
    </span>
  );
};
