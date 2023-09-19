import React from 'react';
import {Form, InputNumber, Modal} from 'antd';
import {CreateModalProps, Payment} from "../../../types";
import {useFormHandler} from "../../../hooks";

export const CreateModalAccount: React.FC<CreateModalProps<Payment>> = ({
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
        style={{ height: '120px', marginTop: '30px' }}
      >
        <Form.Item
          name="sum"
          rules={[{required: true, message: 'введите сумму пополнения'}]}
        >
          <InputNumber
            min={1}
            size="large"
            placeholder="Сумма пополнения"
            style={{width: '100%'}}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};