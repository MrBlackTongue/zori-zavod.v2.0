import React from 'react';
import {LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {Button, Form, Input, Typography} from 'antd';
import {loginUser} from "../../services";
import {LoginFormProps} from "../../types";

export const PageLoginForm: React.FC<LoginFormProps> = ({
                                                          onLogin,
                                                        }) => {

  const {Title} = Typography;
  const [form] = Form.useForm();

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        loginUser(values).then(response => {
          if (response && response.jwt) {
            onLogin('Authenticated');
          }
        })
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  return (
    <Form
      form={form}
      className="login-form"
      // initialValues={{remember: true}}
      onFinish={onFinish}
    >
      <Form.Item>
        <Title>Здравствуйте!</Title>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{required: true, message: 'введите ваш логин'}]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Логин"/>
      </Form.Item>
      <Form.Item
        name="password"
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
      {/*<Form.Item>*/}
      {/*<Form.Item name="remember" valuePropName="checked" noStyle>*/}
      {/*  <Checkbox>Запомнить</Checkbox>*/}
      {/*</Form.Item>*/}
      {/*</Form.Item>*/}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
        {/*<a href="">Регистрация</a>*/}
      </Form.Item>
      <Form.Item>
        {/*<a className="login-form-forgot" href="">*/}
        {/*  Забыли пароль*/}
        {/*</a>*/}
      </Form.Item>
    </Form>
  );
}