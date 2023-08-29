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
      <div className='rate-header flex row center-row'>
        <img src="/images/header_logo.png" alt="Logo" className='logo'/>
        <Dropdown menu={{items}} trigger={['click']} className='rate-dropdown-button-menu'>
          <Space>
            <Button type="primary">
              <MenuOutlined/>
            </Button>
          </Space>
        </Dropdown>
        <Space>
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
      <div className='rate-block flex row center-row'>
        <div className='rate-text-block flex  column'>
          <div className='rate-title'>Пробный период на 14 дней</div>
          <div className='rate-text'>
            Пользуйтесь всем функционалом нашего приложения <span
            className='text-bold'>бесплатно в течение 14 дней. </span>
            После пробного периода подписка составит<span className='text-bold'> 2990 рублей в месяц. </span>
            Не упустите шанс оптимизировать ваш бизнес!
          </div>
          <div className='flex column'>
            <Button type="primary" className='button-buy' onClick={() => setIsModalOpen(true)}>
              14 дней бесплатно
            </Button>
            <div className='mini-text center-text'>Далее 2990 ₽ в месяц</div>
          </div>
        </div>
        <img src="/images/rate_image2.png" alt="rate"
             className='rate-jumbotron flex column'/>
      </div>
      <div className='rate-footer flex column center-column'>
        <div className='footer-group flex row center-row '>
          <div className='rate-footer-block2 flex column '>
            <p className='rate-footer-text-two'>Лазарь Олег Михайлович</p>
            <p className='rate-footer-text-two'>ИНН: 7710140679</p>
          </div>
          <div className='rate-footer-block flex column'>
            <p className='rate-footer-text-two'>Email: support@zolotenkov.ru</p>
            <p className='rate-footer-text-two'>Телефон: +7 (968) 614-15-72</p>
          </div>
          <div className='rate-footer-text-three flex column center-column'>
            <p className='rate-footer-text-two'>Связаться с нами:</p>
            <a href="https://t.me/AlAlon369" target='_blank' rel="noopener noreferrer">
              <img alt="icon-telegram" src="/images/footer_icon_telegram.png" className="rate-footer-telegram"/>
            </a>
          </div>
        </div>
        <div className='rate-footer-block flex column'>
        <p className='rate-footer-text-three'>© Zolotenkov 2022-2023</p>
        </div>
      </div>
      <CreateModalRegistrationUser
        isOpen={isModalOpen}
        createItem={handleCreateNewUser}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}