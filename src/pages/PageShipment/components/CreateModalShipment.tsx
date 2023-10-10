import React from 'react';
import { CreateModalProps, TypeShipmentFormValue } from '../../../types';
import { Form, Modal } from 'antd';
import { useFetchAllData, useFormHandler, useFormSelect } from '../../../hooks';
import { FormShipment } from './FormShipment';

export const CreateModalShipment: React.FC<
  CreateModalProps<TypeShipmentFormValue>
> = ({ isOpen, createItem, onCancel }) => {
  const [form] = Form.useForm();

  // Хук для получения данных
  const { allClient } = useFetchAllData({ depsClient: isOpen });

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    createItem,
    onCancel,
  );

  // Хук для управления полем client
  const { onChangeSelect, onClearSelect, onSearchSelect } = useFormSelect(
    form,
    'client',
  );

  return (
    <Modal
      title={`Добавление новой отгрузки`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={500}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <FormShipment
        form={form}
        allClient={allClient}
        onChangeClient={onChangeSelect}
        onClearClient={onClearSelect}
        onSearchClient={onSearchSelect}
      />
    </Modal>
  );
};
