import React from 'react';
import { Button, Card, Col, Dropdown, MenuProps, Row, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ModalRegistration } from '../../molecules/ModalRegistration/ModalRegistration';
import './PageLanding.css';
import { checkAuthorization, EMPLOYEES, LOGIN, RATE } from '../../../services';
import { useRegistration } from '../../../hooks';
import headerLogoLightMontserrat from 'assets/images/header_logo_light_montserrat.png';
import mainImage from 'assets/images/main_image.png';
import imageOne from 'assets/images/image_one.png';
import imageTwo from 'assets/images/image_two.png';
import groupAccounting from 'assets/images/group_accounting.png';
import groupProcurement from 'assets/images/group_procurement.png';
import groupWarehouse from 'assets/images/group_warehouse.png';
import cardTap from 'assets/images/card_tap.png';
import cardInternational from 'assets/images/card_international.png';
import cardDocument from 'assets/images/card_document.png';
import meeting from 'assets/images/meeting.png';
import transactions from 'assets/images/transactions.png';

export const PageLanding = () => {
  const navigate = useNavigate();

  // Хук состояние модального окна и регистрация нового пользователя
  const { isModalOpen, setIsModalOpen, handleCreateNewUser } =
    useRegistration();

  // Переход на другую страницу по адресу
  const handleLogin = () => {
    checkAuthorization()
      .then(isUserAuthorized => {
        navigate(isUserAuthorized ? `${EMPLOYEES}` : `${LOGIN}`);
      })
      .catch(error => {
        console.error('Ошибка при проверке авторизации:', error);
      });
  };

  const handleRate = () => {
    navigate(`${RATE}`);
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
    <div className="page-landing flex column center-column">
      <div className="header flex row center-row">
        <a href="/" rel="noopener noreferrer">
          <img src={headerLogoLightMontserrat} alt="logo" className="logo" />
        </a>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          className="dropdown-button-menu">
          <Space>
            <Button type="primary">
              <MenuOutlined />
            </Button>
          </Space>
        </Dropdown>
        <Space>
          <Button
            type="link"
            size="large"
            className="rate-button"
            onClick={handleRate}>
            Тариф
          </Button>
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
      <div className="block-one flex center-column center-row">
        <div className="text-block column">
          <div className="title-one text-bold">
            Производство, склад, ERP в облаке
          </div>
          <p className="text">
            Все что нужно — в одном месте: производительность труда, закупки,
            склад, клиенты, отгрузки и отчеты
          </p>
          <Space>
            <Button
              type="primary"
              className="button-start text-bold"
              onClick={() => setIsModalOpen(true)}>
              Начать работу
            </Button>
          </Space>
        </div>
        <img
          src={mainImage}
          alt="web-app"
          className="jumbotron-one flex column center-row center-column"
        />
      </div>
      <div className="block-two flex row center-row center-column">
        <img
          src={imageOne}
          alt="factoryApp"
          className="jumbotron-block center-row center-column"
        />
        <div className="block-column flex column center-column center-row">
          <div className="title-mini center-text text-bold">
            Идеально подойдет малым производствам
          </div>
          <div className="text-block-two center-text">
            <p>
              Zolotenkov ERP-система: все необходимое для малого производства в
              одном решении
            </p>
          </div>
        </div>
        <img src={imageTwo} alt="people_working" className="jumbotron-block2" />
      </div>
      <div className="block-three flex column center-column">
        <div className="block-group flex row center-row space-around">
          <img
            src={groupAccounting}
            alt="accounting"
            className="jumbotron-two flex column center-row center-column"
          />
          <div className="text-block-group">
            <div className="title-group text-bold">
              Производительность труда
            </div>
            <p className="text-group">
              Отслеживайте операции и ресурсы. Повышайте эффективность и
              контроль на производстве
            </p>
          </div>
        </div>
        <div className="block-group block-group-two flex row center-row space-around">
          <div className="text-block-group">
            <div className="title-group text-bold">Управление закупками</div>
            <p className="text-group">
              Управляйте заказами от количества до даты поставки и легко
              учитывайте все закупленные товары
            </p>
          </div>
          <img
            src={groupProcurement}
            alt="procurement_management"
            className="jumbotron-two flex column center-row center-column"
          />
        </div>
        <div className="block-group flex row center-row space-around">
          <img
            src={groupWarehouse}
            alt="warehouse_management"
            className="jumbotron-two flex column center-row center-column"
          />
          <div className="text-block-group">
            <div className="title-group text-bold">Ведение склада</div>
            <p className="text-group">
              Создавайте товары, управляйте складом. Интеграция с производством
              для актуального баланса
            </p>
          </div>
        </div>
      </div>
      <div className="block-four flex column center-column center-row">
        <div className="title-two center-text text-bold">
          Оптимизируйте ваше производство
        </div>
        <p className="text-two center-text">
          Всестороннее решение для контроля и управления ресурсами на
          производстве
        </p>
        <div className="card-grid">
          <Row gutter={[30, 30]} justify="center" align="top">
            <Col span={12} xs={24} lg={12}>
              <Card bordered={false} className="card">
                <img alt="tap" src={cardTap} className="card-image" />
                <div className="card-title text-bold">
                  Простота в управлении
                </div>
                Наш интуитивный интерфейс обеспечивает быстрое освоение и
                комфортную работу с системой учета
              </Card>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Card bordered={false} className="card">
                <img
                  alt="earth"
                  src={cardInternational}
                  className="card-image"
                />
                <div className="card-title text-bold">
                  Проводите учет где угодно
                </div>
                С нашей системой управляйте производством из любой точки мира,
                контролируя каждую деталь
              </Card>
            </Col>
            <Col span={12} xs={24} lg={12}>
              <Card bordered={false} className="card">
                <img alt="file2" src={cardDocument} className="card-image" />
                <div className="card-title text-bold">
                  Отчеты в реальном времени
                </div>
                Автоматизированные отчеты для детального анализа производства и
                координации команды
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="block-five flex row center-row space-around">
        <img alt="meeting" src={meeting} className="image-container" />
        <div className="block-column flex column center-column center-row">
          <div className="title-mini text-bold center-text">
            Попробуйте Zolotenkov прямо сейчас!
          </div>
          <Space>
            <Button
              type="primary"
              className="button-start text-bold"
              onClick={() => setIsModalOpen(true)}>
              Бесплатная версия
            </Button>
          </Space>
        </div>
        <img
          alt="transactions"
          src={transactions}
          className="image-container2"
        />
      </div>
      <div className="footer flex column center-row center-column">
        <p className="footer-text-one">Связаться с нами:</p>
        <p className="footer-text-two">Email: svetlana@zolotenkov.ru</p>
        <p className="footer-text-three">© Zolotenkov 2022-2023</p>
      </div>
      <ModalRegistration
        isOpen={isModalOpen}
        createItem={handleCreateNewUser}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
