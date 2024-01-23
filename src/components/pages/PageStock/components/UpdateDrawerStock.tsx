import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeStockFormValue, UpdateDrawerProps } from '../../../../types';
import { getStockById } from '../../../../api';
import {
  useFetchAllData,
  useFormHandler,
  useFormSelect,
} from '../../../../hooks';
import { FormStock } from './FormStock';

export const UpdateDrawerStock: React.FC<
  UpdateDrawerProps<TypeStockFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allProduct, allStoragePlace } = useFetchAllData({
    depsProduct: isOpen,
    depsStoragePlace: isOpen,
  });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем product
  const {
    onChangeSelect: onChangeProduct,
    onClearSelect: onClearProduct,
    onSearchSelect: onSearchProduct,
  } = useFormSelect(form, 'product');

  // Хук для управления полем storagePlace
  const {
    onChangeSelect: onChangeStoragePlace,
    onClearSelect: onClearStoragePlace,
    onSearchSelect: onSearchStoragePlace,
  } = useFormSelect(form, 'storagePlace');

  // Функция для получения данных
  const handleGetStock = useCallback((): void => {
    if (selectedItemId) {
      getStockById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            product: data?.product?.id === 0 ? '' : data?.product?.id,
            storagePlace:
              data?.storagePlace?.id === 0 ? '' : data?.storagePlace?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetStock();
    }
  }, [isOpen, selectedItemId, handleGetStock]);

  return (
    <Drawer
      title="Редактирование ячейки остатков"
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
      <FormStock
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeProduct}
        onClearProduct={onClearProduct}
        onSearchProduct={onSearchProduct}
        allStoragePlace={allStoragePlace}
        onChangeStoragePlace={onChangeStoragePlace}
        onClearStoragePlace={onClearStoragePlace}
        onSearchStoragePlace={onSearchStoragePlace}
      />
    </Drawer>
  );
};
