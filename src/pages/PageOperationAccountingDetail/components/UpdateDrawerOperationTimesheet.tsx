import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import {
  TypeOperationTimesheetFormValue,
  UpdateDrawerProps,
} from '../../../types';
import { getOperationTimesheetById } from '../../../services';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { FormOperationTimesheet } from './FormOperationTimesheet';

export const UpdateDrawerOperationTimesheet: React.FC<
  UpdateDrawerProps<TypeOperationTimesheetFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allEmployee } = useFetchAllData({ depsEmployee: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем employee
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'employee',
  );

  // Функция для получения данных в дравер
  const handleGetOperationTimesheet = useCallback((): void => {
    if (selectedItemId) {
      getOperationTimesheetById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            employee: data?.employee?.id === 0 ? '' : data?.employee?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetOperationTimesheet();
    }
  }, [isOpen, selectedItemId, handleGetOperationTimesheet]);

  return (
    <Drawer
      title="Редактирование табеля учета рабочего времени"
      width={700}
      open={isOpen}
      onClose={handleReset}
      extra={
        <Space>
          <Button onClick={handleReset}>Отмена</Button>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }>
      <FormOperationTimesheet
        form={form}
        allEmployee={allEmployee}
        onChangeEmployee={onChangeSelect}
        onClearEmployee={onClearSelect}
        onSearchEmployee={onSearchSelect}
      />
    </Drawer>
  );
};
