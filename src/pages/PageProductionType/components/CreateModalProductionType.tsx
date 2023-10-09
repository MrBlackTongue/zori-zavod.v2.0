import React from 'react';
import { CreateModalProps, TypeProductionTypeFormValue } from '../../../types';
import { Form, Modal } from 'antd';
import { useFormHandler } from '../../../hooks';
import { FormProductionType } from './FormProductionType';

export const CreateModalProductionType: React.FC<
  CreateModalProps<TypeProductionTypeFormValue>
> = ({ isOpen, createItem, onCancel }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    createItem,
    onCancel,
  );

  return (
    <Modal
      title={`Добавление нового типа производства`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={550}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <FormProductionType form={form} />
    </Modal>
  );
};
