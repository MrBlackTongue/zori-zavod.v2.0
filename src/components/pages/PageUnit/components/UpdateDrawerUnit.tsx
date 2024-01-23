import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeUnitFormValue, UpdateDrawerProps } from '../../../../types';
import { getUnitById } from '../../../../api';
import { useFormHandler } from '../../../../hooks';
import { FormUnit } from './FormUnit';

export const UpdateDrawerUnit: React.FC<
  UpdateDrawerProps<TypeUnitFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Функция для получения данных
  const handleGetUnit = useCallback((): void => {
    if (selectedItemId) {
      getUnitById(selectedItemId)
        .then(data => {
          form.setFieldsValue({ ...data });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetUnit();
    }
  }, [isOpen, selectedItemId, handleGetUnit, form]);

  return (
    <Drawer
      title="Редактирование единицы измерения"
      width={600}
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
      <FormUnit form={form} />
    </Drawer>
  );
};
