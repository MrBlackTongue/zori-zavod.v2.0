import React, { useCallback, useEffect } from 'react';
import { TypeMaterial } from '../../../../types';
import {
  createMaterial,
  getMaterialById,
  updateMaterial,
} from '../../../../api';
import { MaterialFormView } from './MaterialForm.view';
import { Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

export const MaterialFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: rawId } = useParams<string>();

  // Приведение rawId к числу или установка в undefined
  const itemId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = itemId === undefined;

  const title = isCreateMode
    ? 'Добавление нового материала'
    : 'Редактирование материала';

  // Функция для создания или обновления
  const handleSubmit = async (values: TypeMaterial) => {
    try {
      if (isCreateMode) {
        await createMaterial(values);
      } else {
        await updateMaterial({ ...values, id: itemId });
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
        const data = await getMaterialById(itemId);
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
    <MaterialFormView
      form={form}
      title={title}
      onFinish={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
