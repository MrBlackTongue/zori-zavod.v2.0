import React, { useCallback, useEffect } from 'react';
import { TypeWriteOff } from '../../../../types';
import { Form } from 'antd';
import { WriteOffFormView } from './WriteOffForm.view';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createWriteOff,
  getWriteOffById,
  updateWriteOff,
} from '../../../../api';

export const WriteOffFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: rawId } = useParams<string>();

  // Приведение rawId к числу или установка в undefined
  const itemId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = itemId === undefined;

  const title = isCreateMode
    ? 'Добавление нового списания'
    : 'Редактирование списания';

  // Функция для создания или обновления
  const handleSubmit = async (values: TypeWriteOff) => {
    try {
      if (isCreateMode) {
        await createWriteOff(values);
      } else {
        await updateWriteOff({ ...values, id: itemId });
      }
      navigate(-1);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };
  // Функция для отмены создания и возврата на предыдущую страницу
  const handleCancel = () => {
    navigate(-1);
  };

  // Получить данные для редактирования
  const handleGetData = useCallback(async () => {
    if (!isCreateMode && itemId) {
      try {
        const data = await getWriteOffById(itemId);
        if (data) {
          form.setFieldsValue(data);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
  }, [itemId, form, isCreateMode]);

  // Загрузка данных при редактировании
  useEffect(() => {
    (async () => {
      if (!isCreateMode) {
        try {
          await handleGetData();
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    })();
  }, [handleGetData, isCreateMode]);

  return (
    <WriteOffFormView
      form={form}
      title={title}
      onFinish={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
