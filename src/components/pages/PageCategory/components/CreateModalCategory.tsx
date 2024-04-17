import React from 'react';
import { Form, Modal } from 'antd';
import { CreateModalProps, TypeCategoryFormValue } from '../../../../types';
import {
  useFetchAllData,
  useFormHandler,
  useFormSelect,
} from '../../../../hooks';
import { FormCategory } from './FormCategory';

export const CreateModalCategory: React.FC<
  CreateModalProps<TypeCategoryFormValue>
> = ({ isOpen, createItem, onCancel }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allCategory } = useFetchAllData({ depsCategory: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    createItem,
    onCancel,
  );

  // Хук для управления полем category
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'category',
  );

  return (
    <Modal
      title="Добавление новой категории"
      okText="Сохранить"
      cancelText="Отмена"
      width={760}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <FormCategory
        form={form}
        allCategory={allCategory}
        onChangeCategory={onChangeSelect}
        onClearCategory={onClearSelect}
        onSearchCategory={onSearchSelect}
      />
    </Modal>
  );
};
