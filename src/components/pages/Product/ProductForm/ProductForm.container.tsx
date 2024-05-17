import React, { useCallback, useEffect, useState } from 'react';
import { TypeProduct } from '../../../../types';
import { Form } from 'antd';
import { ProductFormView } from './ProductForm.view';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createProduct,
  getProductById,
  ITEMS,
  PRODUCT,
  PRODUCTS,
  updateProduct,
} from '../../../../api';
import { useLoadingAndSaving } from '../../../../contexts/LoadingAndSavingContext';
import { LoadingSpinner } from '../../../atoms/LoadingSpinner/LoadingSpinner';

export const ProductFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoading, setIsLoading, setIsSaving } = useLoadingAndSaving();

  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;

  const [initialFormData, setInitialFormData] = useState<TypeProduct | null>(
    null,
  );

  // Получить данные для редактирования
  const handleGetData = useCallback(async () => {
    if (itemId) {
      setIsLoading(true);
      try {
        const data = await getProductById(itemId);
        if (data) {
          form.setFieldsValue(data);
          setInitialFormData(data);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [itemId, form, setIsLoading]);

  // Сравнение данных формы
  const hasDataChanged = (
    initialData: TypeProduct | null,
    currentData: TypeProduct,
  ) => {
    if (initialData === null) {
      return false;
    }

    return (
      initialData.title !== currentData.title ||
      initialData.category?.id !== currentData.category?.id ||
      initialData.unit?.id !== currentData.unit?.id
    );
  };

  // Обработка создания нового товара
  const createItem = useCallback(
    async (data: TypeProduct) => {
      try {
        const response = await createProduct(data);
        setInitialFormData(data);
        navigate(`${ITEMS}${PRODUCT}/${response.data.id}`);
      } catch (error) {
        console.error('Ошибка при создании товара:', error);
      }
    },
    [navigate],
  );

  // Обработка обновления существующего товара
  const updateItem = useCallback(async (data: TypeProduct) => {
    try {
      await updateProduct(data);
      setInitialFormData(data);
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
    }
  }, []);

  // Создать или редактировать
  const onBlurHandler = useCallback(async () => {
    try {
      await form.validateFields(['title']);
      const values = form.getFieldsValue(true);

      if (!hasDataChanged(initialFormData, values)) {
        return;
      }

      setIsSaving(true);
      if (!itemId) {
        await createItem(values);
      } else {
        await updateItem({ ...values, id: itemId });
      }
    } catch (error) {
      console.error('Ошибка валидации:', error);
    } finally {
      setIsSaving(false);
    }
  }, [form, itemId, initialFormData, createItem, setIsSaving, updateItem]);

  // Функция для возврата на предыдущую страницу
  const handleCancel = () => {
    navigate(`${ITEMS}${PRODUCTS}`);
  };

  // Загрузка данных при редактировании
  useEffect(() => {
    (async () => {
      if (itemId) {
        try {
          await handleGetData();
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProductFormView
          form={form}
          onBlur={onBlurHandler}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};
