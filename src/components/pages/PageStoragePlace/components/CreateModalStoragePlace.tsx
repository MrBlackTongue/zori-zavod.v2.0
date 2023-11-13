import React from 'react';
import { CreateModalProps, TypeStoragePlaceFormValue } from '../../../../types';
import { Form, Modal } from 'antd';
import { useFormHandler } from '../../../../hooks';
import { FormStoragePlace } from './FormStoragePlace';

export const CreateModalStoragePlace: React.FC<
  CreateModalProps<TypeStoragePlaceFormValue>
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
      title={`Добавление нового места хранения`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <FormStoragePlace form={form} />
    </Modal>
  );
};
