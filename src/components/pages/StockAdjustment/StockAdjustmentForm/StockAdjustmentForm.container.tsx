import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { StockAdjustmentFormView } from './StockAdjustmentForm.view';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createStockAdjustment,
  getStockAdjustmentById,
  STOCK,
  STOCK_ADJUSTMENT,
  STOCK_ADJUSTMENTS,
  updateStockAdjustment,
} from '../../../../api';
import dayjs, { ConfigType } from 'dayjs';
import { TypeStockAdjustment } from '../../../../types';
import { useLoadingAndSaving } from '../../../../contexts/LoadingAndSavingContext';
import { LoadingSpinner } from '../../../atoms/LoadingSpinner/LoadingSpinner';

export const StockAdjustmentFormContainer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoading, setIsLoading, setIsSaving } = useLoadingAndSaving();

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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
  }, [itemId, form, setIsLoading]);

  // Преобразование даты
  const formatDate = (date: ConfigType | undefined) =>
    dayjs(date).format('YYYY-MM-DD');

  // Сравнение данных формы
  const hasDataChanged = (
    initialData: TypeStockAdjustment | undefined,
    currentData: TypeStockAdjustment,
  ) => {
    if (!initialData) return true;

    return (['title', 'reason', 'date'] as (keyof TypeStockAdjustment)[]).some(
      key => initialData[key] !== currentData[key],
    );
  };

  // Обработка создания новой корректировки
  const createItem = useCallback(
    async (data: TypeStockAdjustment) => {
      try {
        const response = await createStockAdjustment(data);
        setInitialFormData(data);
        navigate(`${STOCK}${STOCK_ADJUSTMENT}/${response.data.id}`);
      } catch (error) {
        console.error('Ошибка при создании корректировки:', error);
      }
    },
    [navigate],
  );

  // Обработка обновления существующей корректировки
  const updateItem = useCallback(async (data: TypeStockAdjustment) => {
    try {
      await updateStockAdjustment(data);
      setInitialFormData(data);
    } catch (error) {
      console.error('Ошибка при обновлении корректировки:', error);
    }
  }, []);

  // Создать или редактировать
  const onBlurHandler = useCallback(async () => {
    try {
      await form.validateFields(['title']);
      const values = form.getFieldsValue(true);

      const currentData = {
        ...values,
        date: formatDate(values.date),
      };

      if (!hasDataChanged(initialFormData, currentData)) {
        return;
      }

      setIsSaving(true);
      if (!itemId) {
        await createItem(currentData);
      } else {
        await updateItem({ ...currentData, id: itemId });
      }
    } catch (error) {
      console.error('Ошибка валидации:', error);
    } finally {
      setIsSaving(false);
    }
  }, [form, itemId, initialFormData, createItem, setIsSaving, updateItem]);

  // Функция для возврата на предыдущую страницу
  const handleCancel = () => {
    navigate(`${STOCK}${STOCK_ADJUSTMENTS}`);
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
        <StockAdjustmentFormView
          form={form}
          onBlur={onBlurHandler}
          onCancel={handleCancel}
          initialValues={initialValues}
        />
      )}
    </>
  );
};
