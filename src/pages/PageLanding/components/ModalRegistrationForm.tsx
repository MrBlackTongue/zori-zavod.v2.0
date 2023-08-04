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
import {CreateModalProps, TypeProfile} from "../../../types";
import {useFormHandler} from "../../../hooks";

export const ModalRegistrationForm: React.FC<CreateModalProps<TypeProfile>> = ({
                                                                                 isOpen,
                                                                                 createItem,
                                                                                 onCancel,
                                                                               }) => {

  const {Title} = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const iconRender = useCallback(
    (visible: boolean) => visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>, []
  );

  // Хук для отправки формы и отмены ввода
  const {handleSubmit, handleReset} = useFormHandler(form, createItem, onCancel);


  return (
    <Modal
      width={530}
      open={isOpen}
      onCancel={handleReset}
      footer={null}
      centered
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
          <Title style={{textAlign: 'center'}}>Регистрация</Title>
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


        <Form.Item
          name="firstname"
          rules={[
            {required: true, message: 'Введите ваше имя',},]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="input-prefix-icon"/>}
            placeholder="Ваше имя"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {required: true, message: 'Введите ваш телефон',},]}
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
        </Form.Item>
      </Form>
    </Modal>
  );
}