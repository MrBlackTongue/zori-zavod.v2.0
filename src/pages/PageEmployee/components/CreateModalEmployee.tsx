import React from 'react';
import { CreateModalProps, TypeEmployeeFormValue } from '../../../types';
import { Form, Modal } from 'antd';
import { useFormHandler } from '../../../hooks';
import { FormEmployee } from './FormEmployee';

export const CreateModalEmployee: React.FC<
  CreateModalProps<TypeEmployeeFormValue>
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
      title={`Добавление нового сотрудника`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <FormEmployee form={form} />
    </Modal>
  );
};
