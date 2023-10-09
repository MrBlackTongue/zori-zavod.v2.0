import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeOperationFormValue, UpdateDrawerProps } from '../../../types';
import { getOperationById } from '../../../services';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { FormOperation } from './FormOperation';

export const UpdateDrawerOperation: React.FC<
  UpdateDrawerProps<TypeOperationFormValue>
> = ({ isOpen, selectedItemId, onCancel, updateItem }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allUnit } = useFetchAllData({ depsUnit: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем unit
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'unit',
  );

  // Функция для получения данных в дравер
  const handleGetOperation = useCallback((): void => {
    if (selectedItemId) {
      getOperationById(selectedItemId)
        .then(data => {
          form.setFieldsValue({
            ...data,
            unit: data?.unit?.id === 0 ? '' : data?.unit?.id,
          });
        })
        .catch(error => console.error('Ошибка при получении данных: ', error));
    }
  }, [selectedItemId, form]);

  useEffect(() => {
    if (isOpen && selectedItemId) {
      handleGetOperation();
    }
  }, [isOpen, selectedItemId, handleGetOperation]);

  return (
    <Drawer
      title="Редактирование операции"
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
      <FormOperation
        form={form}
        allUnit={allUnit}
        onChangeUnit={onChangeSelect}
        onClearUnit={onClearSelect}
        onSearchUnit={onSearchSelect}
      />
    </Drawer>
  );
};
