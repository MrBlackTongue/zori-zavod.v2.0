import React, {useState} from 'react';
import {Button, Space, Dropdown, MenuProps} from 'antd';
import {useNavigate} from 'react-router-dom';
import './/PageRate.css';
import {MenuOutlined} from "@ant-design/icons";
import {TypeUserProfile} from "../../types";
import {registrationUser} from "../../services";
import {CreateModalRegistrationUser} from "../PageLanding/components/CreateModalRegistrationUser";

export const PageRate = () => {
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

  // Переход на другую страницу по адресу
  const handleLogin = () => {
    navigate('/login');
  };

  // Выпадающее меню
  const items: MenuProps['items'] = [
    {
      label:
        <Button
          type="default"
          onClick={handleLogin}
          className='dropdown-item'
        >
          Войти
        </Button>,
      key: "1",
    },
    {
      label:
        <Button
          type="default"
          onClick={() => setIsModalOpen(true)}
          className='dropdown-item'
        >
          Регистрация
        </Button>,
      key: "2",
    },
    {
      label:
        <Button
          type="default"
          onClick={() => setIsModalOpen(true)}
          className='dropdown-item'
        >
          Тариф
        </Button>,
      key: "2",
    },
  ];

  return (
    <div className='page-rate flex column center-column'>
      <div className='header flex row center-row'>
        <img src="/images/header_logo.png" alt="Logo" className='logo'/>
        <Dropdown menu={{items}} trigger={['click']} className='dropdown-button-menu'>
          <Space>
            <Button type="primary">
              <MenuOutlined/>
            </Button>
          </Space>
        </Dropdown>
        <Space>
          <Button type="link" size="large" className='rate-button'>Тариф</Button>
          <Button type="default" className='button-login text-bold' onClick={handleLogin}>Войти</Button>
          <Button
            type="primary"
            className='button-registration text-bold'
            onClick={() => setIsModalOpen(true)}
          >
            Регистрация
          </Button>
        </Space>
      </div>
      <div className='rate-text-block flex  column  center-row'>
      <div className='rate-title'>Пробный период на 14 дней</div>
      <div className='rate-text'>
        Мы уверены в эффективности нашего приложения и хотим, чтобы вы лично убедились в этом.
        Поэтому предоставляем <span className='text-bold'>бесплатный доступ к полному функционалу на 14 дней. </span>
        Используйте все возможности,
        оцените удобство и преимущества работы с нашим приложением.
      </div>
        <div className='rate-title'>Подписка после пробного периода</div>
        <div className='rate-text'>
          После завершения пробного периода вы сможете
          продолжить пользоваться нашим приложением за <span className='text-bold'>2990 рублей в месяц. </span>
          Мы предлагаем высокое качество, надежность и постоянные обновления,
          чтобы вы получали максимальную отдачу от инвестиций в ваш бизнес.
        </div>
        <Button  type="primary" className='button-buy'>14 дней бесплатно</Button>
        <div>Далее 2990 ₽ в месяц</div>
      </div>
      <div className='rate-footer flex column center-row center-column'>
        <p className='rate-footer-text-one'>Телефон: +7 (968) 614-15-72</p>
        <p className='rate-footer-text-two'>Связаться с нами:</p>
        <a href="https://t.me/AlAlon369" target='_blank' rel="noopener noreferrer">
          <img alt="icon-telegram" src="/images/footer_icon_telegram.png" className="logo-telegram"/>
        </a>
        <p className='rate-footer-text-three'>© Zolotenkov 2022-2023</p>
      </div>
      <CreateModalRegistrationUser
        isOpen={isModalOpen}
        createItem={handleCreateNewUser}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}