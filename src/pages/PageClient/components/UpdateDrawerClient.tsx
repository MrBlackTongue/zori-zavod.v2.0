import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeClientFormValue, UpdateDrawerProps } from '../../../types';
import { getClientById } from '../../../services';
import { useFormHandler } from '../../../hooks';
import { FormClient } from './FormClient';

export const UpdateDrawerClient: React.FC<
  UpdateDrawerProps<TypeClientFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Функция для получения данных в drawer
  const handleGetClient = useCallback((): void => {
    if (selectedItemId) {
      getClientById(selectedItemId)
        .then(data => {
          form.setFieldsValue({ ...data });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetClient();
    }
  }, [isOpen, selectedItemId, handleGetClient]);

  return (
    <Drawer
      title="Редактирование клиента"
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
      <FormClient form={form} />
    </Drawer>
  );
};
