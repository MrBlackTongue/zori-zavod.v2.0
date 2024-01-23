import React from 'react';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import './PageRate.css';
import { MenuOutlined } from '@ant-design/icons';
import { RegistrationModal } from '../../molecules/RegistrationModal/RegistrationModal';
import { useRegistration } from '../../../hooks';
import { checkAuthorization, LOGIN, RATE, WORK_HOURS } from '../../../api';
import headerLogoLightMontserrat from 'assets/images/header_logo_light_montserrat.png';
import rateImage from 'assets/images/rate_image.png';

export const PageRate = () => {
  const navigate = useNavigate();

  // Хук состояние модального окна и регистрация нового пользователя
  const { isModalOpen, setIsModalOpen, handleCreateNewUser } =
    useRegistration();

  const handleRate = () => {
    navigate(`${RATE}`);
  };

  // Переход на другую страницу по адресу
  const handleLogin = () => {
    checkAuthorization()
      .then(isUserAuthorized => {
        navigate(isUserAuthorized ? `${WORK_HOURS}` : `${LOGIN}`);
      })
      .catch(error => {
        console.error('Ошибка при проверке авторизации:', error);
      });
  };

  // Выпадающее меню
  const items: MenuProps['items'] = [
    {
      label: (
        <Button type="default" onClick={handleRate} className="dropdown-item">
          Тариф
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
    <div className="page-rate flex column center-column">
      <div className="rate-header flex row center-row">
        <a href="/" rel="noopener noreferrer">
          <img src={headerLogoLightMontserrat} alt="logo" className="logo" />
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
            className="button-login text-bold"
            onClick={handleLogin}>
            Войти
          </Button>
          <Button
            type="primary"
            className="button-registration text-bold"
            onClick={() => setIsModalOpen(true)}>
            Регистрация
          </Button>
        </Space>
      </div>
      <div className="rate-block flex row center-row">
        <div className="rate-text-block flex column">
          <div className="rate-title">Пробный период на 14 дней</div>
          <div className="rate-text">
            <span className="text-bold">14 дней бесплатно</span>, потом 99
            руб/сут. Оптимизируйте бизнес прямо сейчас!
          </div>
          <div className="flex column">
            <Button
              type="primary"
              className="button-buy"
              onClick={() => setIsModalOpen(true)}>
              Начать работу
            </Button>
          </div>
        </div>
        <img
          src={rateImage}
          alt="rate"
          className="rate-jumbotron flex column"
        />
      </div>
      <div className="rate-footer flex column center-row center-column">
        <p className="rate-footer-text-two">Лазарь Олег Михайлович</p>
        <p className="rate-footer-text-two">ИНН: 143521547685</p>
        <p className="footer-text-one">Связаться с нами:</p>
        <p className="footer-text-two">Email: svetlana@zolotenkov.ru</p>
        <p className="rate-footer-text-three">© Zolotenkov 2022-2023</p>
      </div>
      <RegistrationModal
        isOpen={isModalOpen}
        createItem={handleCreateNewUser}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
