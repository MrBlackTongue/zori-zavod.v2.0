import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import {
  TypeProductionTypeFormValue,
  UpdateDrawerProps,
} from '../../../../types';
import { getProductionTypeById } from '../../../../api';
import { FormProductionType } from './FormProductionType';
import { useFormHandler } from '../../../../hooks';

export const UpdateDrawerProductionType: React.FC<
  UpdateDrawerProps<TypeProductionTypeFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Функция для получения информации выбранной записи и установления значений полей формы
  const handleGetProductionType = useCallback((): void => {
    if (selectedItemId) {
      getProductionTypeById(selectedItemId)
        .then(data => {
          form.setFieldsValue({ ...data });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetProductionType();
    }
  }, [isOpen, selectedItemId, handleGetProductionType]);

  return (
    <Drawer
      title="Редактирование типа производства"
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
      <FormProductionType form={form} />
    </Drawer>
  );
};
