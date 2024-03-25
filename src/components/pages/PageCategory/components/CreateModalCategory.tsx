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
  const { allProductGroup } = useFetchAllData({ depsProductGroup: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    createItem,
    onCancel,
  );

  // Хук для управления полем productGroup
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'productGroup',
  );

  return (
    <Modal
      title="Добавление новой группы товаров"
      okText="Сохранить"
      cancelText="Отмена"
      width={680}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <FormCategory
        form={form}
        allProductGroup={allProductGroup}
        onChangeProductGroup={onChangeSelect}
        onClearProductGroup={onClearSelect}
        onSearchProductGroup={onSearchSelect}
      />
    </Modal>
  );
};
