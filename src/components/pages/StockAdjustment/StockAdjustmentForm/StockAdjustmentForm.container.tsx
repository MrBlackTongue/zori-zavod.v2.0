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
import dayjs, { ConfigType } from 'dayjs';
import { TypeStockAdjustment } from '../../../../types';
import { useSaving } from '../../../../contexts/SavingContext';

export const StockAdjustmentFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setIsSaving } = useSaving();

  // Преобразование id из пути в число
  const { id: rawId } = useParams<{ id?: string }>();
  const itemId = rawId ? parseInt(rawId, 10) : undefined;

  const [initialFormData, setInitialFormData] = useState<TypeStockAdjustment>();
  const initialValues: TypeStockAdjustment = {
    date: dayjs(),
  };

  // Получить данные для редактирования
  const handleGetData = useCallback(async () => {
    if (itemId) {
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
  }, [itemId, form]);

  // Создать или редактировать
  const onBlurHandler = useCallback(async () => {
    setIsSaving(true);
    await form.validateFields();
    const values = form.getFieldsValue(true);

    const prepareDateForComparison = (date: ConfigType | undefined) =>
      dayjs(date).format('YYYY-MM-DD');

    // Приведение исходных и текущих данных к общему формату для сравнения
    const formattedInitialData = {
      ...initialFormData,
      date: prepareDateForComparison(initialFormData?.date),
    };

    const formattedCurrentData = {
      ...values,
      date: prepareDateForComparison(values.date),
    };

    // Проверка изменений в данных
    const dataHasChanged = (
      ['title', 'reason', 'date'] as (keyof TypeStockAdjustment)[]
    ).some(key => {
      return formattedInitialData[key] !== formattedCurrentData[key];
    });

    if (!dataHasChanged) return;

    // Обработка измененных данных
    if (!itemId) {
      try {
        const response = await createStockAdjustment(formattedCurrentData);
        setInitialFormData(formattedCurrentData);
        navigate(`${STOCK_ADJUSTMENT}/${response.id}`);
      } catch (error) {
        console.error('Ошибка при создании корректировки:', error);
      }
    } else {
      try {
        await updateStockAdjustment(formattedCurrentData);
        setInitialFormData(formattedCurrentData);
      } catch (error) {
        console.error('Ошибка при обновлении корректировки:', error);
      }
    }
    setIsSaving(false);
  }, [form, itemId, initialFormData, navigate]);

  // Функция для возврата на предыдущую страницу
  const handleCancel = () => {
    navigate(`${STOCK_ADJUSTMENTS}`);
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
  }, [handleGetData]);

  return (
    <StockAdjustmentFormView
      form={form}
      onBlur={onBlurHandler}
      onCancel={handleCancel}
      initialValues={initialValues}
    />
  );
};
