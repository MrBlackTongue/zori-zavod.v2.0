import React, { useCallback, useEffect } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { TypeProductGroupFormValue, UpdateDrawerProps } from '../../../types';
import { getProductGroupById } from '../../../services';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { FormProductGroup } from './FormProductGroup';

export const UpdateDrawerProductGroup: React.FC<
  UpdateDrawerProps<TypeProductGroupFormValue>
> = ({ isOpen, selectedItemId, updateItem, onCancel }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allProductGroup } = useFetchAllData({ depsProductGroup: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    updateItem,
    onCancel,
  );

  // Хук для управления полем productGroup
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'productGroup',
  );

  // Функция для получения данных в дравер
  const handleGetParent = useCallback((): void => {
    if (selectedItemId) {
      getProductGroupById(selectedItemId)
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
      title={`Редактирование группы товаров`}
      width={680}
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
      <FormProductGroup
        form={form}
        allProductGroup={allProductGroup}
        onChangeProductGroup={onChangeSelect}
        onClearProductGroup={onClearSelect}
        onSearchProductGroup={onSearchSelect}
      />
    </Drawer>
  );
};
