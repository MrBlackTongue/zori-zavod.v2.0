import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeStoragePlaceFormValue, UpdateDrawerProps } from '../../../types';
import { getStoragePlaceById } from '../../../services';
import { useFormHandler } from '../../../hooks';
import { FormStoragePlace } from './FormStoragePlace';

export const UpdateDrawerStoragePlace: React.FC<
  UpdateDrawerProps<TypeStoragePlaceFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Функция для получения данных
  const handleGetStoragePlace = useCallback((): void => {
    if (selectedItemId) {
      getStoragePlaceById(selectedItemId)
        .then(data => {
          form.setFieldsValue({ ...data });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetStoragePlace();
    }
  }, [isOpen, selectedItemId, handleGetStoragePlace, form]);

  return (
    <Drawer
      title="Редактирование места хранения"
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
      <FormStoragePlace form={form} />
    </Drawer>
  );
};
