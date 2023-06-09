import React, {useContext} from 'react';
import {LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {Button, Form, Input, Typography} from 'antd';
import {loginUser} from "../../services";
import {AuthContext} from "../../components/Context/AuthContext";
import {useNavigate, useLocation} from "react-router-dom";

export const PageLoginForm: React.FC = () => {

  const {Title} = Typography;
  const [form] = Form.useForm();

  const {logIn} = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        loginUser(values).then(response => {
          if (response && response.jwt) {
            logIn();
            const from = location.state?.from || '/default-path-after-login';
            navigate(from);
          }
        })
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  return (
    <div className="login-form-container" style={{position: 'fixed', width: '100%', height: '100vh', top: '0', left: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.7)'}}>
      <Form
        form={form}
        className="login-form"
        style={{backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px'}}
        onFinish={onFinish}
      >
        <Form.Item>
          <Title style={{textAlign: 'center'}}>Здравствуйте!</Title>
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