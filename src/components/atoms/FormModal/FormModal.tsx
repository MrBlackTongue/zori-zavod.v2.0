import React from 'react';
import { Form, Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

interface FormModalProps<T> extends ModalProps {
  isOpen: boolean;
  onSubmit: (values: T) => void;
  onCancel: () => void;
  renderForm: (form: any) => React.ReactNode;
}

export const FormModal = <T extends object>({
  isOpen,
  onSubmit,
  onCancel,
  renderForm,
  ...modalProps
}: FormModalProps<T>) => {
  const [form] = Form.useForm();

  const handleSubmit = (): void => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values as T);
        form.resetFields();
      })
      .catch(error => {
        console.log('Validate Failed:', error);
      });
  };

  const handleReset = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      {...modalProps}
      open={isOpen}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      onOk={handleSubmit}
      onCancel={handleReset}>
      {renderForm(form)}
    </Modal>
  );
};
