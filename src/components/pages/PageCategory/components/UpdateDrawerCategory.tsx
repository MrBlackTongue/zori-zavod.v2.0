import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeCategoryFormValue, UpdateDrawerProps } from '../../../../types';
import { getCategoryById } from '../../../../api';
import {
  useFetchAllData,
  useFormHandler,
  useFormSelect,
} from '../../../../hooks';
import { FormCategory } from './FormCategory';

export const UpdateDrawerCategory: React.FC<
  UpdateDrawerProps<TypeCategoryFormValue>
> = ({ isOpen, selectedItemId, updateItem, onCancel }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allCategory } = useFetchAllData({ depsCategory: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем category
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'category',
  );

  // Функция для получения данных в drawer
  const handleGetParent = useCallback((): void => {
    if (selectedItemId) {
      getCategoryById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            parent: data?.parent?.id === 0 ? '' : data?.parent?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetParent();
    }
  }, [isOpen, selectedItemId, handleGetParent]);

  return (
    <Drawer
      title={`Редактирование категории`}
      width={760}
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
      <FormCategory
        form={form}
        allCategory={allCategory}
        onChangeCategory={onChangeSelect}
        onClearCategory={onClearSelect}
        onSearchCategory={onSearchSelect}
      />
    </Drawer>
  );
};
