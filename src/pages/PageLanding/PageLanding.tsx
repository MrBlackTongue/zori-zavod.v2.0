import React from 'react';
import {Typography, Button, Space, Card, Row, Col} from 'antd';
import {useNavigate} from 'react-router-dom';
import './/PageLanding.css';

const {Title} = Typography;

export const PageLanding = () => {
  const navigate = useNavigate();

  const handleStartWork = () => {
    navigate('/login');
  };

  return (
    <div className='page'>
      <div className='header'>
        <img src="/logo2.png" alt="Logo" className='logo'/>
        <Space>
          <Button type="default" className='button-login' onClick={handleStartWork}>Войти</Button>
          <Button type="primary" className='button-register'>Регистрация</Button>
        </Space>
      </div>
      <div className='block'>
        <div className='text-block'>
          <div className='title-primary'>Производство, склад, ERP в облаке</div>
          <p className='text-primary'>
            Все что нужно — в одном месте: учет операций, закупки, склад, клиенты, отгрузки и отчеты.
          </p>
          <Space>
            <Button type="primary" className='button-start' onClick={handleStartWork}>
              Начать работу
            </Button>
          </Space>
        </div>
        <img src="/web-app_manufacturing.png" alt="web-app_manufacturing" className='jumbotron'/>
      </div>
      <div className='block-secondary'>
        <img src="/manufacture_work.png" alt="factoryApp" className='jumbotron-secondary'/>
        <div className='block-column'>
          <Title className='title-secondary' level={2}>Идеально подойдёт малым производственным предприятиям</Title>
          <div className='text-block-secondary'>
            <p>
              Zolotenkov полезен всем,
              кто управляет производством. Никаких сложных настроек или загадочных процедур.
              15 минут - и у вас есть ваша персонализированная ERP-система
              для производственной деятельности.
            </p>
          </div>
        </div>
        <img src="/people_working.png" alt="people_working" className='jumbotron-secondary'/>
      </div>
      <div className='block-group'>
        <div className='block-tertiary'>
          <img src="/accounting.png" alt="accounting" className='jumbotron-tertiary'/>
          <div className='text-block'>
            <Title className='title-primary'>Учёт операций</Title>
            <p className='text-primary'>
              Отслеживайте операции, результаты,
              время выполнения и затраченные ресурсы - все в одной мощной и простой в использовании системе.
              Повышайте эффективность и контролируйте производственные процессы.
            </p>
          </div>
        </div>
        <div className='block-tertiary'>
          <div className='text-block'>
            <Title className='title-primary'>Управление закупками</Title>
            <p className='text-primary'>
              Контролируйте все ваши заказы: от количества и цены до даты поставки.
              Мы также предлагаем функционал для приемки товаров,
              помогающий вам без проблем учитывать все закупленные товары.
            </p>
          </div>
          <img src="/Procurement_management.png" alt="Procurement_management" className='jumbotron-secondary'/>
        </div>
        <div className='block-tertiary'>
          <img src="/warehouse_management.png" alt="warehouse_management" className='jumbotron-secondary'/>
          <div className='text-block'>
            <Title className='title-primary'>Ведение склада</Title>
            <p className='text-primary'>
              Легко создавайте товары и добавляйте их на склад,
              учитывайте количество товаров и списывайте их со склада.
              Благодаря интеграции с производственными операциями,
              отгрузками и приемками товаров,
              вы всегда будете в курсе актуального баланса на вашем складе.
            </p>
          </div>
        </div>
      </div>
      <div className='block-quaternary'>
        <Title level={2} className='title-secondary'>Оптимизируйте ваше производство</Title>
        <p className='text-tertiary'>
          Мы предлагаем вашей команде всестороннее решение для эффективного управления ресурсами
          и контроля над процессами производства.
        </p>
        <div className='card-grid'>
          <Row gutter={[30, 30]} justify="center" align="top">
            <Col span={7}>
              <Card bordered={false} className='card-secondary'>
                <img alt="tap" src="/tap.png" className="card-image-secondary"/>
                <div className='card-title-secondary'>Простота в управлении</div>
                Мы создали доступный и удобный интерфейс,
                обеспечивающий быстрое освоение и комфортную работу с нашей системой учета производственных операций.
              </Card>
            </Col>
            <Col span={7}>
              <Card bordered={false} className='card-secondary'>
                <img alt="earth" src="/international.png" className="card-image-secondary"/>
                <div className='card-title-secondary'>Проводите учет где угодно</div>
                С нашей системой вы сможете управлять производством,
                не зависимо от географии, сохраняя полный контроль над каждой деталью.
              </Card>
            </Col>
            <Col span={7}>
              <Card bordered={false} className='card-secondary'>
                <img alt="file2" src="/file2.png" className="card-image-secondary"/>
                <div className='card-title-secondary'>Отчёты в реальном времени</div>
                Автоматизированные отчеты отображают детали ваших производственных операций.
                Идеальный инструмент для оптимизации процессов и координации команды.
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className='block-quinary'>
        <img alt="meeting" src="/meeting.png" className="image-container"/>
        <div className='block-column'>
          <Title level={1} className='title-tertiary'>Попробуйте Zolotenkov
            прямо сейчас!
          </Title>
          <Space>
            <Button type="primary" className='button-start' onClick={handleStartWork}>Бесплатная версия</Button>
          </Space>
        </div>
        <img alt="transactions" src="/transactions.png" className="image-container"/>
      </div>
      <div className='footer'>
        <p className='footer-text-primary'>Телефон: +7 (968) 614-15-72</p>
        <a href="https:www.flaticon.com/ru/authors/itim2101" className='footer-text-secondary'>
          <Button type={"ghost"}>Иконки от itim2101 - Flaticon</Button>
        </a>
        <p className='footer-text-secondary'>Связаться с нами:</p>
        <a href="https://t.me/AlAlon369" target='_blank' rel="noopener noreferrer">
          <img alt="icon-telegram" src="/icon-telegram.png" className="logo-telegram"/>
        </a>
        <p className='footer-text-tertiary'>© Zolotenkov 2022</p>
      </div>
    </div>
  );
};
