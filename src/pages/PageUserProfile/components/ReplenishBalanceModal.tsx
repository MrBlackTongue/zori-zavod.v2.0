import React from 'react';
import {Form, InputNumber, Modal, Button} from 'antd';
import {CreateModalProps, TypePayment} from '../../../types';
import {useFormHandler} from '../../../hooks';

export const ReplenishBalanceModal: React.FC<CreateModalProps<TypePayment>> = ({
                                                                                 isOpen,
                                                                                 createItem,
                                                                                 onCancel,
                                                                               }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  const handleAmountSelection = (amount: number | null) => {
    if (amount !== null) {
      form.setFieldsValue({sum: amount});
    }
  };

  return (
    <Modal
      title="Новый платеж"
      okText={'Продолжить'}
      cancelText={'Отмена'}
      width={490}
      centered
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <Form form={form} style={{height: '100px', marginTop: '30px'}}>
        <Form.Item
          name="sum"
          label="Сумма"
          initialValue={500}
          rules={[{required: true, message: 'введите сумму пополнения'}]}
        >
          <InputNumber
            min={1}
            size="large"
            step={100}
            placeholder="Сумма пополнения в рублях"
            formatter={(value) => `${value} ₽`}
            style={{width: '100%'}}
          />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '-15px 0 0 63px',
            width: '380px'
        }}>
          <Button type="default" size="middle" onClick={() => handleAmountSelection(500)}>
            500 ₽
          </Button>
          <Button type="default" size="middle" onClick={() => handleAmountSelection(1000)}>
            1000 ₽
          </Button>
          <Button type="default" size="middle" onClick={() => handleAmountSelection(1500)}>
            1500 ₽
          </Button>
          <Button type="default" size="middle" onClick={() => handleAmountSelection(2990)}>
            2990 ₽
          </Button>
        </div>
      </Form>
    </Modal>
  );
};