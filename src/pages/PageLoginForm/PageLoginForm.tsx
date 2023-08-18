import React, {useCallback, useState} from 'react';
import {LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import {loginUser, registrationUser} from "../../services";
import {useNavigate} from "react-router-dom";
import './/PageLoginForm.css';
import {TypeUserProfile} from "../../types";
import {CreateModalRegistrationUser} from "../PageLanding/components/CreateModalRegistrationUser";

export const PageLoginForm: React.FC = () => {

  const [form] = Form.useForm();

  const navigate = useNavigate();

  // Открыть закрыть модальное окно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Создать нового пользователя
  const handleCreateNewUser = (values: TypeUserProfile): void => {
    const user: TypeUserProfile = {
      username: 'admin',
      password: values.password,
      email: values.email,
      phone: values.phone,
      firstname: values.firstname,
    }
    setIsModalOpen(false)
    void registrationUser(user)
  }

  // Скрыть показать пароль
  const iconRender = useCallback(
    (visible: boolean) => visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>, []
  );

  // Авторизация пользователя
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values)
        loginUser(values)
          .then(response => {
            if (response?.jwt) {
              navigate('/employee');
            }
          })
          .catch((error) => console.error("Ошибка при авторизации: ", error));
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  return (
    <div className='login-form-container'>
      <div className='login-header'>
        <img src="/images/header_logo.png" alt="Logo" className='logo'/>
      </div>
      <Form
        form={form}
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item>
          <div className='title'>Вход</div>
        </Form.Item>

        <Form.Item
          name="login"
          rules={[{required: true, message: 'введите ваш логин'}]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="input-prefix-icon"/>}
            placeholder="Логин"
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
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="link"
            htmlType="submit"
            className="login-form-button"
            onClick={() => setIsModalOpen(true)}
          >
            Зарегестрироваться
          </Button>
        </Form.Item>
      </Form>
      <div className='login-footer'>
        <p className='login-footer-text-one'>Телефон: +7 (968) 614-15-72</p>
        <p className='login-footer-text-two'>Связаться с нами:</p>
        <a href="https://t.me/AlAlon369" target='_blank' rel="noopener noreferrer">
          <img alt="icon-telegram" src="/images/footer_icon_telegram.png" className="login-logo-telegram"/>
        </a>
        <p className='login-footer-text-three'>© Zolotenkov 2022-2023</p>
      </div>
      <CreateModalRegistrationUser
        isOpen={isModalOpen}
        createItem={handleCreateNewUser}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}