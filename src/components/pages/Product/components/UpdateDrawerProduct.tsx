import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeProductFormValue, UpdateDrawerProps } from '../../../../types';
import { getProductById } from '../../../../api';
import {
  useFetchAllData,
  useFormHandler,
  useFormSelect,
} from '../../../../hooks';
import { ProductFormView } from './ProductForm.view';

export const UpdateDrawerProduct: React.FC<
  UpdateDrawerProps<TypeProductFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allUnit, allProductGroup } = useFetchAllData({
    depsUnit: isOpen,
    depsProductGroup: isOpen,
  });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем unit
  const {
    onChangeSelect: onChangeUnit,
    onClearSelect: onClearUnit,
    onSearchSelect: onSearchUnit,
  } = useFormSelect(form, 'unit');

  // Хук для управления полем productGroup
  const {
    onChangeSelect: onChangeProductGroup,
    onClearSelect: onClearProductGroup,
    onSearchSelect: onSearchProductGroup,
  } = useFormSelect(form, 'productGroup');

  // Функция для получения данных в drawer
  const handleGetProduct = useCallback((): void => {
    if (selectedItemId) {
      getProductById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            unit: data?.unit?.id === 0 ? '' : data?.unit?.id,
            productGroup:
              data?.productGroup?.id === 0 ? '' : data?.productGroup?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetProduct();
    }
  }, [isOpen, selectedItemId, handleGetProduct]);

  return (
    <Drawer
      title="Редактирование товара"
      width={700}
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
      <ProductFormView
        form={form}
        allUnit={allUnit}
        onChangeUnit={onChangeUnit}
        onClearUnit={onClearUnit}
        onSearchUnit={onSearchUnit}
        allProductGroup={allProductGroup}
        onChangeProductGroup={onChangeProductGroup}
        onClearProductGroup={onClearProductGroup}
        onSearchProductGroup={onSearchProductGroup}
      />
    </Drawer>
  );
};
