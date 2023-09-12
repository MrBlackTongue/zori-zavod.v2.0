import React, {useCallback} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {useNavigate} from "react-router-dom";
import '../../../App.css'
import {CreateModalProps, TypeAccount} from "../../../types";
import {useFormHandler} from "../../../hooks";
export const CreateModalAccount: React.FC<CreateModalProps<TypeAccount>> = ({
                                                                                           isOpen,
                                                                                           createItem,
                                                                                           onCancel,
                                                                                         }) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  return (
    <Modal
      title={`Новый платёж`}
      okText={'Сохранить'}
      cancelText={'Отмена'}
      width={530}
      footer={null}
      centered
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleReset}
    >
      <Form
        form={form}
        // className="registration-form"
        style={{height: '120px', marginTop: '30px'}}
        onFinish={async () => {
          await handleSubmit()
          await navigate('/employee');
        }}
      >
      <Form.Item
        name="sum"
        rules={[{required: true, message: 'введите сумму пополнения'}]}
      >
        <Input
          size="large"
          // prefix={<LockOutlined className="input-prefix-icon"/>}
          placeholder="Сумма пополнения"
        />
        <Button
          type="primary"
          htmlType="submit"
          className="registration-form-button"
        >
          Продолжить
        </Button>
      </Form.Item>
      </Form>
  </Modal>
);
                                                                                         }