import React, {useCallback} from 'react';
import {LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {Button, Form, Input, Typography} from 'antd';
import {loginUser} from "../../services";
import {useNavigate} from "react-router-dom";
import {TypeProfile} from "../../types";

export const PageLoginForm: React.FC<TypeProfile> = () => {

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
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
        // backgroundColor: 'rgba(0,0,0,0.6)' // прозрачный серый фон
      }}>
      <Form
        form={form}
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item>
          <Title style={{textAlign: 'center'}}>Здравствуйте!</Title>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{required: true, message: 'введите вашу почту'}]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="input-prefix-icon"/>}
            placeholder="Почта"
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
      </Form>
    </div>
  );
}