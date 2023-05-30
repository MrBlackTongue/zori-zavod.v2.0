import React from 'react';
import {LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {LoginFormProps} from "../../types";

export const PageLoginForm: React.FC<LoginFormProps> = ({
                                                          onLogin,
                                                        }) => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // TODO: реализуйте авторизацию и вызовите onLogin, если она успешна
    onLogin();
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{remember: true}}
      onFinish={onFinish}
    >
      <Form.Item
        name="Логин"
        rules={[{required: true, message: 'введите ваш логин'}]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Логин"/>
      </Form.Item>
      <Form.Item
        name="Пароль"
        rules={[{required: true, message: 'введите ваш пароль'}]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon"/>}
          type="password"
          placeholder="Пароль"
          visibilityToggle
          iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомнить</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/*<a href="">Регистрация</a>*/}
      </Form.Item>
      <Form.Item>

        <a className="login-form-forgot" href="">
          Забыли пароль
        </a>
      </Form.Item>

    </Form>
  );
};