import React, { useCallback, useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FormViewProps, TypeApiResponse } from '../../../types';

interface GeneralFormContainerProps<T> {
  createFunction: (values: T) => Promise<TypeApiResponse>;
  updateFunction: (values: T) => Promise<TypeApiResponse>;
  getByIdFunction: (id: number) => Promise<T | undefined>;
  FormViewComponent: React.ComponentType<FormViewProps<T>>;
  processData?: (data: T) => T;
  setFormValues?: (form: FormInstance, data: T) => void;
  titleCreate: string;
  titleEdit: string;
}

export const GeneralFormContainer = <T,>({
  createFunction,
  updateFunction,
  getByIdFunction,
  FormViewComponent,
  titleCreate,
  titleEdit,
  processData = data => data,
  setFormValues,
}: GeneralFormContainerProps<T>) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: rawId } = useParams<string>();

  const [title, setTitle] = useState('');

  const itemId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : undefined;
  const isCreateMode = itemId === undefined;
  const isUpdateMode = itemId !== undefined;

  const handleSubmit = async (values: T) => {
    try {
      // Применяем processBeforeSubmit к значениям формы, если она предоставлена
      let processedValues = processData ? processData(values) : values;

      if (isCreateMode) {
        await createFunction(processedValues);
      } else {
        await updateFunction({ ...processedValues, id: itemId });
      }

      navigate(-1);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleGetData = useCallback(async () => {
    if (isUpdateMode && itemId) {
      try {
        let data = await getByIdFunction(itemId);
        if (data) {
          const processedData = processData ? processData(data) : data;
          if (setFormValues) {
            // Используем кастомную функцию для установки значений формы
            setFormValues(form, processedData);
          } else {
            // Устанавливаем значения формы обычным способом
            form.setFieldsValue(processedData);
          }
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
  }, [itemId, form, getByIdFunction, isUpdateMode, processData, setFormValues]);
  useEffect(() => {
    (async () => {
      if (isUpdateMode) {
        try {
          await handleGetData();
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    })();
  }, [isUpdateMode, handleGetData]);

  useEffect(() => {
    setTitle(isCreateMode ? titleCreate : titleEdit);
  }, [isCreateMode, titleCreate, titleEdit]);

  return (
    <FormViewComponent
      form={form}
      title={title}
      onFinish={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
