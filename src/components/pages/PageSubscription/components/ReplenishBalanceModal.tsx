import React from 'react';
import { Button, Form, InputNumber, Modal } from 'antd';
import { CreateModalProps, TypePaymentFormValue } from '../../../../types';
import { useFormHandler } from '../../../../hooks';

export const ReplenishBalanceModal: React.FC<
  CreateModalProps<TypePaymentFormValue>
> = ({ isOpen, createItem, onCancel }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const { handleSubmit, handleReset } = useFormHandler(
    form,
    createItem,
    onCancel,
  );

  const amounts = [500, 1000, 1500, 3000];

  const handleAmountSelection = (amount: number) => {
    form.setFieldsValue({ amount: amount });
  };

  return (
    <Modal
      title="Пополнить баланс"
      okText={'Продолжить'}
      cancelText={'Отмена'}
      width={490}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}>
      <Form form={form} style={{ height: '100px', marginTop: '30px' }}>
        <Form.Item
          name="amount"
          label="Сумма"
          initialValue={500}
          rules={[{ required: true, message: 'введите сумму пополнения' }]}>
          <InputNumber
            min={10}
            step={100}
            size="large"
            placeholder="Сумма пополнения в рублях"
            addonAfter={'₽'}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '-15px 0 0 63px',
            width: '380px',
          }}>
          {amounts.map(amount => (
            <Button
              key={amount}
              type="dashed"
              size="middle"
              onClick={() => handleAmountSelection(amount)}>
              {`${amount} ₽`}
            </Button>
          ))}
        </div>
      </Form>
    </Modal>
  );
};
