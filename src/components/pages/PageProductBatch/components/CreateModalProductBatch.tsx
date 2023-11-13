import React from 'react';
import { CreateModalProps, TypeProductBatchFormValue } from '../../../../types';
import { Form, Modal } from 'antd';
import {
  useFetchAllData,
  useFormHandler,
  useFormSelect,
} from '../../../../hooks';
import { FormProductBatch } from './FormProductBatch';

export const CreateModalProductBatch: React.FC<
  CreateModalProps<TypeProductBatchFormValue>
> = ({ isOpen, createItem, onCancel }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allProduct } = useFetchAllData({ depsProduct: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    createItem,
    onCancel,
  );

  // Хук для управления полем product
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'product',
  );

  return (
    <Modal
      title={`Добавление новой партии товаров`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <FormProductBatch
        form={form}
        allProduct={allProduct}
        onChangeProduct={onChangeSelect}
        onClearProduct={onClearSelect}
        onSearchProduct={onSearchSelect}
      />
    </Modal>
  );
};
