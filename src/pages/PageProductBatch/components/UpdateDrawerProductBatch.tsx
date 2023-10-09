import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeProductBatchFormValue, UpdateDrawerProps } from '../../../types';
import { getProductBatchById } from '../../../services';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { FormProductBatch } from './FormProductBatch';

export const UpdateDrawerProductBatch: React.FC<
  UpdateDrawerProps<TypeProductBatchFormValue>
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

  // Функция для получения данных в дравер
  const handleGetProductBatch = useCallback((): void => {
    if (selectedItemId) {
      getProductBatchById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            product: data?.product?.id === 0 ? '' : data?.product?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetProductBatch();
    }
  }, [isOpen, selectedItemId, handleGetProductBatch]);

  return (
    <Drawer
      title="Редактирование партии товаров"
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
      <FormProductBatch
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeSelect}
        onClearProduct={onClearSelect}
        onSearchProduct={onSearchSelect}
      />
    </Drawer>
  );
};
