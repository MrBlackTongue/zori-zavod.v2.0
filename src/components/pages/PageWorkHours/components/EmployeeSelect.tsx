import React from 'react';
import { Select } from 'antd';
import type { TransformedWorkHour, TypeEmployee } from '../../../../types';

interface EditableSelectProps {
  employees: TypeEmployee[]; // Изменим название свойства на `employees`, чтобы было понятно, что это массив
  editingEmployee: number | null;
  handleEmployeeChange: (employeeId: number) => void;
  record: TransformedWorkHour;
}

export const EmployeeSelect: React.FC<EditableSelectProps> = ({
  employees,
  editingEmployee,
  handleEmployeeChange,
  record,
}) => {
  const showSelect = !record.employee;
  // Отображаем Select, если сотрудник не выбран или если редактируем именно эту ячейку
  if (showSelect) {
    return (
      <Select
        defaultValue={record.employee?.id ? String(record.employee.id) : null}
        style={{ width: 200 }}
        onChange={value => handleEmployeeChange(Number(value))}
        placeholder="Выберите сотрудника">
        {employees.map(e => (
          <Select.Option key={e.id} value={String(e.id)}>
            {`${e.lastName} ${e.firstName}`}
          </Select.Option>
        ))}
      </Select>
    );
  }

  // Дополнительная проверка для обеспечения безопасности типов
  if (!record.employee || typeof record.employee.id !== 'number') {
    return <span style={{ color: 'lightgray' }}>Сотрудник не выбран</span>;
  }

  // console.log('record', record);
  // Если сотрудник уже выбран и ячейка не редактируется, отображаем имя сотрудника
  return (
    <span>
      {record.employee.lastName} {record.employee.firstName}
    </span>
  );
};
