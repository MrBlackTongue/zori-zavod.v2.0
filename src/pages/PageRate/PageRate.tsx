import React from 'react';
import { Button, Space, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import './/PageRate.css';
import { MenuOutlined } from '@ant-design/icons';
import { CreateModalRegistrationUser } from '../PageLanding/components/CreateModalRegistrationUser';
import { useRegistration } from '../../hooks';

export const PageRate = () => {
  const navigate = useNavigate();

  // Хук состояние модального окна и регистрация нового пользователя
  const { isModalOpen, setIsModalOpen, handleCreateNewUser } =
    useRegistration();

  // Переход на другую страницу по адресу
  const handleLogin = () => {
    navigate('/login');
  };

  const handleRate = () => {
    navigate('/rate');
  };

  // Выпадающее меню
  const items: MenuProps['items'] = [
    {
      label: (
        <Button type="default" onClick={handleRate} className="dropdown-item">
          Тарифы
        </Button>
      ),
      key: '1',
    },
    {
      label: (
        <Button type="default" onClick={handleLogin} className="dropdown-item">
          Войти
        </Button>
      ),
      key: '2',
    },
    {
      label: (
        <Button
          type="default"
          onClick={() => setIsModalOpen(true)}
          className="dropdown-item">
          Регистрация
        </Button>
      ),
      key: '3',
    },
  ];

  return (
    <div className="page-rate rate-flex rate-column rate-center-column">
      <div className="rate-header rate-flex rate-row rate-center-row">
        <a href="/" rel="noopener noreferrer">
          <img src="/images/header_logo.png" alt="Logo" className="logo" />
        </a>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          className="rate-dropdown-button-menu">
          <Space>
            <Button type="primary">
              <MenuOutlined />
            </Button>
          </Space>
        </Dropdown>
        <Space>
          <Button
            type="default"
            className="button-login rate-text-bold"
            onClick={handleLogin}>
            Войти
          </Button>
          <Button
            type="primary"
            className="button-registration rate-text-bold"
            onClick={() => setIsModalOpen(true)}>
            Регистрация
          </Button>
        </Space>
      </div>
      <div className="rate-block rate-flex rate-row rate-center-row">
        <div className="rate-text-block rate-flex  rate-column">
          <div className="rate-title">Пробный период на 14 дней</div>
          <div className="rate-text">
            Пользуйтесь всем функционалом нашего приложения{' '}
            <span className="rate-text-bold">
              бесплатно в течение 14 дней.{' '}
            </span>
            После пробного периода подписка составит
            <span className="rate-text-bold"> 2990 рублей в месяц. </span>
            Не упустите шанс оптимизировать ваш бизнес!
          </div>
          <div className="rate-flex rate-column">
            <Button
              type="primary"
              className="button-buy"
              onClick={() => setIsModalOpen(true)}>
              14 дней бесплатно
            </Button>
            <div className="mini-text rate-center-text">
              Далее 2990 ₽ в месяц
            </div>
          </div>
        </div>
        <img
          src="/images/rate_image.png"
          alt="rate"
          className="rate-jumbotron rate-flex rate-column"
        />
      </div>
      <div className="rate-footer rate-flex rate-column rate-center-column">
        <div className="footer-group rate-flex rate-row rate-center-row ">
          <div className="rate-footer-block2 rate-flex rate-column ">
            <p className="rate-footer-text-two">Лазарь Олег Михайлович</p>
            <p className="rate-footer-text-two">ИНН: 143521547685</p>
          </div>
          <div className="rate-footer-block rate-flex rate-column">
            <p className="rate-footer-text-two">Email: support@zolotenkov.ru</p>
            <p className="rate-footer-text-two">Телефон: +7 (968) 614-15-72</p>
          </div>
          <div className="rate-footer-text-three rate-flex rate-column rate-center-column">
            <p className="rate-footer-text-two">Связаться с нами:</p>
            <a
              href="https://t.me/AlAlon369"
              target="_blank"
              rel="noopener noreferrer">
              <img
                alt="icon-telegram"
                src="/images/footer_icon_telegram.png"
                className="rate-footer-telegram"
              />
            </a>
          </div>
        </div>
        <div className="rate-footer-block rate-flex rate-column">
          <p className="rate-footer-text-three">© Zolotenkov 2022-2023</p>
        </div>
      </div>
      <CreateModalRegistrationUser
        isOpen={isModalOpen}
        createItem={handleCreateNewUser}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
