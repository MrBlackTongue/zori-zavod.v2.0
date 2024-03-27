import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { StockAdjustmentFormView } from './StockAdjustmentForm.view';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createStockAdjustment,
  getStockAdjustmentById,
  STOCK_ADJUSTMENT,
  STOCK_ADJUSTMENTS,
  updateStockAdjustment,
} from '../../../../api';
import dayjs from 'dayjs';
import { TypeStockAdjustment } from '../../../../types';

export const StockAdjustmentFormContainer = () => {
  const [form] = Form.useForm();
  const { id: rawId } = useParams<string>();

  // Приведение rawId к числу или установка в undefined
  const itemId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = itemId === undefined;

  const navigate = useNavigate();
  const [currentItemId, setCurrentItemId] = useState(itemId);
  const [initialFormData, setInitialFormData] = useState<TypeStockAdjustment>();

  const initialValues: TypeStockAdjustment = {
    date: dayjs(),
  };

  // Получить данные для редактирования
  const handleGetData = useCallback(async () => {
    if (!isCreateMode && itemId) {
      try {
        const data = await getStockAdjustmentById(itemId);
        if (data) {
          const formattedData = {
            ...data,
            date: data.date ? dayjs(data.date) : dayjs(),
          };
          form.setFieldsValue(formattedData);
          setInitialFormData(formattedData);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
  }, [itemId, form, isCreateMode]);

  // Создать или редактировать
  const onBlurHandler = async (field: any) => {
    const values = await form.validateFields();

    // Форматируем дату из формы для сравнения
    const currentFormattedDate = values.date
      ? dayjs(values.date).format('YYYY-MM-DD')
      : dayjs();
    // Форматируем исходную дату для сравнения
    const initialFormattedDate = initialFormData?.date
      ? dayjs(initialFormData.date).format('YYYY-MM-DD')
      : dayjs();

    // Сравниваем даты
    const dateChanged = currentFormattedDate !== initialFormattedDate;

    // Проверяем, изменились ли остальные поля
    const otherFieldsChanged = (
      ['title', 'reason'] as (keyof TypeStockAdjustment)[]
    ).some(field => initialFormData?.[field] !== values[field]);

    const dataHasChanged = dateChanged || otherFieldsChanged;

    const formattedData = {
      ...values,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : dayjs(),
    };

    if (isCreateMode) {
      if (currentItemId === undefined && field === 'title') {
        try {
          const response = await createStockAdjustment(formattedData);
          setCurrentItemId(response.id);
          navigate(`${STOCK_ADJUSTMENT}/${response.id}`);
        } catch (error) {
          console.error('Ошибка при создании корректировки:', error);
        }
      }
    } else if (dataHasChanged) {
      updateStockAdjustment({
        ...formattedData,
        id: itemId,
      })
        .then(() => {})
        .catch(error => {
          console.error('Ошибка при обновлении корректировки:', error);
        });
    }
  };

  // Функция для возврата на предыдущую страницу
  const handleCancel = () => {
    navigate(`${STOCK_ADJUSTMENTS}`);
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

  return (
    <StockAdjustmentFormView
      form={form}
      onBlur={onBlurHandler}
      onCancel={handleCancel}
      initialValues={initialValues}
    />
  );
};
