import React, {useContext} from 'react';
import {LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {Button, Form, Input, Typography} from 'antd';
import {loginUser} from "../../services";
import {AuthContext} from "../../components/Context/AuthContext";

export const PageLoginForm: React.FC = () => {

  const {Title} = Typography;
  const [form] = Form.useForm();

  const {logIn} = useContext(AuthContext);

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        loginUser(values).then(response => {
          if (response && response.jwt) {
            logIn();
          }
        })
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  return (

    <div className="login-form-container">
      <Form
        form={form}
        className="login-form"
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}