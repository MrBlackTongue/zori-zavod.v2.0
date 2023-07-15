import React, {useCallback} from 'react';
import {
  LockOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import {Button, Form, Input, Typography} from 'antd';
import {registrationUser} from "../../services";
import {useNavigate} from "react-router-dom";
import '../../App.css'
import {TypeProfile} from "../../types";

export const PageRegistration: React.FC<TypeProfile> = () => {

  const {Title} = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const iconRender = useCallback(
    (visible: boolean) => visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>, []
  );

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        registrationUser(values)
          .then(() => {
            navigate('/login');
          })
          .catch((error) => console.error("Ошибка при регистрации: ", error));
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
      <Form
        form={form}
        className="registration-form"
        onFinish={onFinish}
      >
        <Form.Item>
          <Title style={{textAlign: 'center'}}>Регистрация</Title>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'введите верный Email адрес',
            },
            {
              required: true,
              message: 'введите свой Email',
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="input-prefix-icon"/>}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="username"
          // rules={[{required: true, message: 'введите ваш логин'}]}
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

        <Form.Item
          name="phone"
        >
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

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}