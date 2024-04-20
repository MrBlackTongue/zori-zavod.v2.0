import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import {
  TypeEstimatedPriceFormValue,
  UpdateDrawerProps,
} from '../../../../types';
import { getEstimatedPriceById } from '../../../../api';
import dayjs from 'dayjs';
import {
  useFetchAllData,
  useFormHandler,
  useFormSelect,
} from '../../../../hooks';
import { FormEstimatedPrice } from './FormEstimatedPrice';

export const UpdateDrawerEstimatedPrice: React.FC<
  UpdateDrawerProps<TypeEstimatedPriceFormValue>
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

  // Функция для получения данных о расчетной цене по id и обновления формы
  const handleGetEstimatedPrice = useCallback((): void => {
    if (selectedItemId) {
      getEstimatedPriceById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            date: dayjs(data?.date),
            item: data?.item?.id === 0 ? '' : data?.item?.id,
            price: data?.price ?? false,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetEstimatedPrice();
    }
  }, [isOpen, selectedItemId, handleGetEstimatedPrice]);

  return (
    <Drawer
      title="Редактирование расчетной цены"
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
      <FormEstimatedPrice
        form={form}
        allItem={allProduct}
        onChangeItem={onChangeSelect}
        onClearItem={onClearSelect}
        onSearchItem={onSearchSelect}
      />
    </Drawer>
  );
};
