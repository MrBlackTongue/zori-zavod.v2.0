import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypePurchaseFormValue, UpdateDrawerProps } from '../../../../types';
import { getPurchaseById } from '../../../../services';
import dayjs from 'dayjs';
import {
  useFetchAllData,
  useFormHandler,
  useFormSelect,
} from '../../../../hooks';
import { FormPurchase } from './FormPurchase';

export const UpdateDrawerPurchase: React.FC<
  UpdateDrawerProps<TypePurchaseFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allProduct } = useFetchAllData({ depsProduct: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем product
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'product',
  );

  // Функция для получения данных о закупке по id и обновления формы
  const handleGetPurchase = useCallback((): void => {
    if (selectedItemId) {
      getPurchaseById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            date: dayjs(data?.date),
            product: data?.product?.id === 0 ? '' : data?.product?.id,
            paid: data?.paid ?? false,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetPurchase();
    }
  }, [isOpen, selectedItemId, handleGetPurchase]);

  return (
    <Drawer
      title="Редактирование закупки"
      width={600}
      open={isOpen}
      onClose={handleReset}
      extra={
        <Space>
          <Button onClick={handleReset}>Отмена</Button>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Space>
      }>
      <FormPurchase
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeSelect}
        onClearProduct={onClearSelect}
        onSearchProduct={onSearchSelect}
      />
    </Drawer>
  );
};
