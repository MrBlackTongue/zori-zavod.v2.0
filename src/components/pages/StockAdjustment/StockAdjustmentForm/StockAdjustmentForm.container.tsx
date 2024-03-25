import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import { StockAdjustmentFormView } from './StockAdjustmentForm.view';
import { useParams } from 'react-router-dom';
import {
  createStockAdjustment,
  getStockAdjustmentById,
  updateStockAdjustment,
} from '../../../../api';
import dayjs from 'dayjs';

export const StockAdjustmentFormContainer = () => {
  const [form] = Form.useForm();
  const { id: rawId } = useParams<string>();

  // Приведение rawId к числу или установка в undefined
  const itemId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = itemId === undefined;

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

  const onBlurHandler = async (field: any) => {
    const values = await form.validateFields();

    // Выполнение действий в зависимости от того, в каком режиме мы находимся (создание или редактирование)
    const formattedData = {
      ...values,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
    };

    if (isCreateMode) {
      // Если мы в режиме создания, выполняем запрос на создание
      if (field === 'title') {
        createStockAdjustment(formattedData)
          .then(() => {})
          .catch(error => {
            console.error('Ошибка при создании корректировки:', error);
          });
      }
    } else {
      // Если мы в режиме редактирования, выполняем запрос на обновление
      updateStockAdjustment({ ...formattedData, id: itemId })
        .then(() => {})
        .catch(error => {
          console.error('Ошибка при обновлении корректировки:', error);
        });
    }
  };

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

  return <StockAdjustmentFormView form={form} onBlur={onBlurHandler} />;
};
