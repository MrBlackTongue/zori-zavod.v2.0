import React from 'react';
import {
  CreateModalProps,
  TypeEstimatedPriceFormValue,
} from '../../../../types';
import { Form, Modal } from 'antd';
import {
  useFetchAllData,
  useFormHandler,
  useFormSelect,
} from '../../../../hooks';
import { FormEstimatedPrice } from './FormEstimatedPrice';

export const CreateModalEstimatedPrice: React.FC<
  CreateModalProps<TypeEstimatedPriceFormValue>
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
      title={`Добавление новой оценочной стоимости`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={600}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <FormEstimatedPrice
        form={form}
        allItem={allProduct}
        onChangeItem={onChangeSelect}
        onClearItem={onClearSelect}
        onSearchItem={onSearchSelect}
      />
    </Modal>
  );
};
