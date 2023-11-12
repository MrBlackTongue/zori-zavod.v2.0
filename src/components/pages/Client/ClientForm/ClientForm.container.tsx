import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { TypeClient } from '../../../../types';
import {
  createClient,
  getClientById,
  updateClient,
} from '../../../../services';
import { ClientFormView } from './ClientForm.view';
import { useNavigate, useParams } from 'react-router-dom';

export const ClientFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: rawId } = useParams<string>();

  const [title, setTitle] = useState('');

  // Приведение rawId к числу или установка в undefined
  const itemId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = itemId === undefined;
  const isUpdateMode = itemId !== undefined;

  // Функция для создания или обновления
  const handleSubmit = async (values: TypeClient) => {
    if (isCreateMode) {
      await createClient(values);
    } else {
      await updateClient({ ...values, id: itemId });
    }
    navigate(-1);
  };

  // Функция для отмены создания и возврата на предыдущую страницу
  const handleCancel = () => {
    navigate(-1);
  };

  // Получение данных для редактирования
  const handleGetClient = useCallback(async () => {
    if (isUpdateMode && itemId) {
      try {
        const data = await getClientById(itemId);
        form.setFieldsValue(data);
      } catch (error) {
        console.error('Ошибка при получении данных сотрудника:', error);
      }
    }
  }, [itemId, form, isUpdateMode]);

  // Загрузка данных при редактировании
  useEffect(() => {
    (async () => {
      if (isUpdateMode) {
        try {
          await handleGetClient();
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    })();
  }, [handleGetClient, isUpdateMode]);

  useEffect(() => {
    setTitle(isCreateMode ? 'Добавление клиента' : 'Редактирование клиента');
  }, [isCreateMode, rawId]);

  return (
    <ClientFormView
      form={form}
      title={title}
      onFinish={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
