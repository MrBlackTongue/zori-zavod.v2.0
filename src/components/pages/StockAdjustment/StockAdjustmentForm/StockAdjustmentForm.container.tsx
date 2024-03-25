import React, { useCallback, useEffect } from 'react';
import { TypeStockAdjustment } from '../../../../types';
import { Form } from 'antd';
import { StockAdjustmentFormView } from './StockAdjustmentForm.view';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createStockAdjustment,
  getStockAdjustmentById,
  updateStockAdjustment,
} from '../../../../api';
import dayjs from 'dayjs';

export const StockAdjustmentFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: rawId } = useParams<string>();

  // Приведение rawId к числу или установка в undefined
  const itemId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = itemId === undefined;

  const title = isCreateMode
    ? 'Добавление новой корректировки'
    : 'Редактирование корректировки';

  // Функция для создания или обновления
  const handleSubmit = async (values: TypeStockAdjustment) => {
    try {
      const formattedData = {
        ...values,
        date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      };
      if (isCreateMode) {
        await createStockAdjustment(formattedData);
      } else {
        await updateStockAdjustment({ ...formattedData, id: itemId });
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
        const data = await getStockAdjustmentById(itemId);
        if (data) {
          const formattedData = {
            ...data,
            date: data.date ? dayjs(data.date) : null,
          };
          form.setFieldsValue(formattedData);
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
    <StockAdjustmentFormView
      form={form}
      title={title}
      onFinish={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
