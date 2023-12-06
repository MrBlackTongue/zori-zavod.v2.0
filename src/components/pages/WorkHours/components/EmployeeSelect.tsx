import React from 'react';
import { Select } from 'antd';

interface EmployeeSelectProps {
  options: { id: number | undefined; name: string }[]; // Простой и универсальный тип для опций
  onChange: (value: number) => void; // Функция для обработки изменений
  defaultValue?: number; // Начальное значение может быть необязательным
}

export const EmployeeSelect: React.FC<EmployeeSelectProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <Select
      defaultValue={defaultValue ? String(defaultValue) : undefined}
      style={{ width: 200 }}
      onChange={value => onChange(Number(value))}
      placeholder="Выберите сотрудника">
      {options.map(option => (
        <Select.Option key={option.id} value={String(option.id)}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};
