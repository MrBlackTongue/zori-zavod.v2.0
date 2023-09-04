import React, {useCallback} from 'react';
import {
  LockOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import {Button, Form, Input, Typography, Modal} from 'antd';
import {useNavigate} from "react-router-dom";
import '../../../App.css'
import {CreateModalProps, TypeUserProfile} from "../../../types";
import {useFormHandler} from "../../../hooks";

export const CreateModalRegistrationUser: React.FC<CreateModalProps<TypeUserProfile>> = ({
                                                                                           isOpen,
                                                                                           createItem,
                                                                                           onCancel,
                                                                                         }) => {
  const {Title} = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);

  // Скрыть показать пароль
  const iconRender = useCallback(
    (visible: boolean) => visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>, []
  );

  return (
    <Modal
      width={530}
      footer={null}
      centered
      open={isOpen}
      onCancel={handleReset}
      maskStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
    >
      <Form
        form={form}
        className="registration-form"
        onFinish={() => {
          handleSubmit()
          navigate('/login');
        }}
      >
        <Form.Item>
          <Title level={1} className='registration-title'>Регистрация</Title>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {required: true, message: 'введите свой Email',},]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="input-prefix-icon"/>}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item name="firstname">
          <Input
            size="large"
            prefix={<UserOutlined className="input-prefix-icon"/>}
            placeholder="Ваше имя"
          />
        </Form.Item>

        <Form.Item name="phone">
          <Input
            size="large"
            prefix={<PhoneOutlined className="input-prefix-icon"/>}
            placeholder="Телефон"
            style={{width: '100%'}}
            maxLength={11}
            onKeyPress={(e) => {
              if (!/\d/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{required: true, message: 'введите ваш пароль'}]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="input-prefix-icon"/>}
            type="password"
            placeholder="Пароль"
            visibilityToggle
            iconRender={iconRender}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="registration-form-button"
          >
            Зарегистрироваться
          </Button>
          <div className='registration-text-offer'>
            Регистрируясь в сервисе Zolotenkov, вы принимаете условия
            <a href="/оферта.pdf" target="_blank" rel="noopener noreferrer"> договора-оферты</a>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}