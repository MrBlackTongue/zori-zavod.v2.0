import React, { useCallback, useEffect } from 'react';
import { TypeProduct } from '../../../../types';
import { Form } from 'antd';
import { ProductFormView } from './ProductForm.view';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../../../../api';

export const ProductFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: rawId } = useParams<string>();

  // Приведение rawId к числу или установка в undefined
  const itemId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = itemId === undefined;

  const title = isCreateMode
    ? 'Добавление нового продукта'
    : 'Редактирование продукта';

  // Функция для создания или обновления
  const handleSubmit = async (values: TypeProduct) => {
    try {
      if (isCreateMode) {
        await createProduct(values);
      } else {
        await updateProduct({ ...values, id: itemId });
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
        const data = await getProductById(itemId);
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
    <ProductFormView
      form={form}
      title={title}
      onFinish={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
