import React from 'react';
import {Form, InputNumber, Modal} from 'antd';
import {CreateModalProps, Payment} from "../../../types";
import {useFormHandler} from "../../../hooks";

export const ReplenishBalanceModal: React.FC<CreateModalProps<Payment>> = ({
                                                                             isOpen,
                                                                             createItem,
                                                                             onCancel,
                                                                           }) => {
  const [form] = Form.useForm();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  return (
    <Modal
      title="Новый платёж"
      okText={"Продолжить"}
      cancelText={"Отмена"}
      width={530}
      centered
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <Form
        form={form}
        style={{height: '120px', marginTop: '30px'}}
      >
        <Form.Item
          name="sum"
          initialValue={500}
          rules={[{required: true, message: 'введите сумму пополнения'}]}
        >
          <InputNumber
            min={1}
            size="large"
            step={100}
            placeholder="Сумма пополнения в рублях"
            style={{width: '100%'}}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};