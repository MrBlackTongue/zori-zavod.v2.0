import React, {useCallback} from 'react';
import {
  LockOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import {Button, Form, Input, Modal} from 'antd';
import '../../../App.css'
import {CreateModalProps, TypeUserProfile} from "../../../types";
import {useFormHandler} from "../../../hooks";

export const CreateModalRegistrationUser: React.FC<CreateModalProps<TypeUserProfile>> = ({
                                                                                           isOpen,
                                                                                           createItem,
                                                                                           onCancel,
                                                                                         }) => {
  const [form] = Form.useForm();

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
        onFinish={handleSubmit}
      >
        <Form.Item>
          <div className='registration-title'>Регистрация</div>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            // {
            //   type: 'email',
            //   message: 'введите верный Email адрес',
            // },
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
          <div className='registration-login'>
            <a href="/employee" className='registration-login-text'>У меня уже есть аккаунт</a>
          </div>
          <div className='registration-text-offer'>
            Регистрируясь в сервисе Zolotenkov, вы принимаете условия
            <a href="/oferta.pdf" target="_blank" rel="noopener noreferrer"> договора-оферты</a>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}