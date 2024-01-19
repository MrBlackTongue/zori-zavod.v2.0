import React, { useEffect, useMemo, useRef } from 'react';
import { Form } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useWorkHoursContext } from '../../../contexts/WorkHoursContext';

interface EditableRowContextType {
  form: FormInstance;
  index: number;
}

export const EditableContext =
  React.createContext<EditableRowContextType | null>(null);

interface EditableRowProps {
  index: number;

  [key: string]: any; // Это позволяет передавать другие свойства
}

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  const rowRef = useRef<HTMLTableRowElement>(null);
  const { editingId, allData } = useWorkHoursContext();

  // Находим индекс строки с нужным сотрудником
  const highLightRowIndex = allData.findIndex(
    item => item.employee?.id === editingId,
  );

  // Эффект прокручивания экрана до нужной строки
  useEffect(() => {
    if (rowRef.current && highLightRowIndex === rowRef.current.rowIndex - 1) {
      rowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highLightRowIndex, rowRef.current?.rowIndex]);

  const contextValue = useMemo(() => ({ form, index }), [form, index]);

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={contextValue}>
        <tr ref={rowRef} {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
