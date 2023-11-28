import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FormViewProps, TypeApiResponse } from '../../../types';

interface GeneralFormContainerProps<T> {
  createFunction: (values: T) => Promise<TypeApiResponse>;
  updateFunction: (values: T) => Promise<TypeApiResponse>;
  getByIdFunction: (id: number) => Promise<T | undefined>;
  FormViewComponent: React.ComponentType<FormViewProps<T>>;
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
      if (isCreateMode) {
        await createFunction(values);
      } else {
        await updateFunction({ ...values, id: itemId } as T);
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
        const data = await getByIdFunction(itemId);
        form.setFieldsValue(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
  }, [itemId, form, getByIdFunction, isUpdateMode]);

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
