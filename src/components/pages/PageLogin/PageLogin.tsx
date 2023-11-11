import React, { useCallback } from 'react';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { EMPLOYEES, loginUser } from '../../../services';
import { useNavigate } from 'react-router-dom';
import './PageLogin.css';
import { RegistrationModal } from '../../molecules/RegistrationModal/RegistrationModal';
import { useRegistration } from '../../../hooks';
import headerLogoLightMontserrat from 'assets/images/header_logo_light_montserrat.png';

export const PageLogin: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Хук состояние модального окна и регистрация нового пользователя
  const { isModalOpen, setIsModalOpen, handleCreateNewUser } =
    useRegistration();

  // Скрыть показать пароль
  const iconRender = useCallback(
    (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />),
    [],
  );

  // Авторизация пользователя
  const onFinish = () => {
    form
      .validateFields()
      .then(values => {
        loginUser(values)
          .then(response => {
            if (response?.jwt) {
              navigate(`${EMPLOYEES}`);
            }
          })
          .catch(error => console.error('Ошибка при авторизации: ', error));
      })
      .catch(error => {
        console.log('Validate Failed:', error);
      });
  };

  return (
    <div className="login-form-container">
      <div className="login-header">
        <a href="/" rel="noopener noreferrer">
          <img src={headerLogoLightMontserrat} alt="logo" className="logo" />
        </a>
      </div>
      <Form form={form} className="login-form" onFinish={onFinish}>
        <Form.Item>
          <div className="title">Вход</div>
        </Form.Item>
        <Form.Item
          name="login"
          rules={[{ required: true, message: 'введите ваш логин' }]}>
          <Input
            size="large"
            prefix={<UserOutlined className="input-prefix-icon" />}
            placeholder="Логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'введите ваш пароль' }]}>
          <Input.Password
            size="large"
            prefix={<LockOutlined className="input-prefix-icon" />}
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
            className="login-form-button">
            Войти
          </Button>
        </Form.Item>
        <div className="login-form-item">
          <Form.Item>
            {/*// Когда добавим ссылку в href, удалить исключение!*/}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" rel="noopener noreferrer" className="forget-button">
              Забыли пароль?
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="link"
              className="login-form-button"
              onClick={() => setIsModalOpen(true)}>
              Регистрация
            </Button>
          </Form.Item>
        </div>
        <div className="registration-text-offer">
          Используя сервис Zolotenkov, вы принимаете условия
          <a href="/oferta.pdf" target="_blank" rel="noopener noreferrer">
            {' '}
            договора-оферты
          </a>
        </div>
      </Form>
      <div className="footer flex column center-row center-column">
        <p className="footer-text-one">Связаться с нами:</p>
        <p className="footer-text-two">Email: svetlana@zolotenkov.ru</p>
        <p className="footer-text-three">© Zolotenkov 2022-2023</p>
      </div>
      <RegistrationModal
        isOpen={isModalOpen}
        createItem={handleCreateNewUser}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
