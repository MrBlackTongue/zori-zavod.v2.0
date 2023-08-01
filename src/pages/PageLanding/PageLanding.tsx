import React from 'react';
import { Button, Space, Card, Row, Col} from 'antd';
import {useNavigate} from 'react-router-dom';
import './/PageLanding.css';

export const PageLanding = () => {
  const navigate = useNavigate();

  const handleStartWork = () => {
    navigate('/login');
  };

  return (
    <div className='page'>
      <div className='header flex row center-row'>
        <img src="/logo2.png" alt="Logo" className='logo'/>
        <Space>
          <Button type="default" className='button-login text-bold' onClick={handleStartWork}>Войти</Button>
          <Button type="primary" className='button-register text-bold' onClick={handleStartWork}>Регистрация</Button>
        </Space>
      </div>
      <div className='block flex center-column center-row'>
        <div className='text-block column'>
          <div className='title-primary text-bold'>Производство, склад, ERP в облаке</div>
          <p className='text-primary'>
            Все что нужно — в одном месте: учет операций, закупки, склад, клиенты, отгрузки и отчеты.
          </p>
          <Space>
            <Button type="primary" className='button-start text-bold' onClick={handleStartWork}>
              Начать работу
            </Button>
          </Space>
        </div>
        <img src="/web-app.png" alt="web-app" className='jumbotron flex column center-row center-column'/>
      </div>
      <div className='block-secondary flex row center-row center-column'>
        <img src="/manufacture_work.png" alt="factoryApp" className='jumbotron-secondary center-row center-column'/>
        <div className='block-column flex column center-column center-row'>
          <div className='title-secondary center-text text-bold' >Идеально подойдёт малым производствам</div>
          <div className='text-block-secondary center-text'>
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
      <div className='block-group flex column center-column'>
        <div className='block-tertiary flex row center-row space-around'>
          <img src="/accounting.png" alt="accounting"
               className='jumbotron-tertiary flex column center-row center-column'
          />
          <div className='text-block'>
            <div className='title-group text-bold'>Учёт операций</div>
            <p className='text-primary'>
              Отслеживайте операции, результаты,
              время выполнения и затраченные ресурсы - все в одной мощной и простой в использовании системе.
              Повышайте эффективность и контролируйте производственные процессы.
            </p>
          </div>
        </div>
        <div className='block-tertiary flex row center-row space-around'>
          <div className='text-block'>
            <div className='title-group text-bold'>Управление закупками</div>
            <p className='text-primary'>
              Контролируйте все ваши заказы: от количества и цены до даты поставки.
              Мы также предлагаем функционал для приемки товаров,
              помогающий вам без проблем учитывать все закупленные товары.
            </p>
          </div>
          <img src="/Procurement_management.png" alt="Procurement_management" className='jumbotron-secondary'/>
        </div>
        <div className='block-tertiary flex row center-row space-around'>
          <img src="/warehouse_management.png" alt="warehouse_management" className='jumbotron-secondary'/>
          <div className='text-block'>
            <div className='title-group text-bold'>Ведение склада</div>
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
      <div className='block-quaternary flex column center-column center-row'>
        <div className='title-tertiary center-text text-bold'>Оптимизируйте ваше производство</div>
        <p className='text-tertiary center-text'>
          Мы предлагаем вашей команде всестороннее решение для эффективного управления ресурсами
          и контроля над процессами производства.
        </p>
        <div className='card-grid'>
          <Row gutter={[30, 30]} justify="center" align="top">
            <Col span={7}>
              <Card bordered={false} className='card-secondary'>
                <img alt="tap" src="/tap.png" className="card-image-secondary"/>
                <div className='card-title-secondary text-bold'>Простота в управлении</div>
                Мы создали доступный и удобный интерфейс,
                обеспечивающий быстрое освоение и комфортную работу
                с нашей системой учета производственных операций.
              </Card>
            </Col>
            <Col span={7}>
              <Card bordered={false} className='card-secondary'>
                <img alt="earth" src="/international.png" className="card-image-secondary"/>
                <div className='card-title-secondary text-bold'>Проводите учет где угодно</div>
                С нашей системой вы сможете управлять производством,
                не зависимо от географии, сохраняя полный контроль над каждой деталью.
              </Card>
            </Col>
            <Col span={7}>
              <Card bordered={false} className='card-secondary'>
                <img alt="file2" src="/file2.png" className="card-image-secondary"/>
                <div className='card-title-secondary text-bold'>Отчёты в реальном времени</div>
                Автоматизированные отчеты отображают детали ваших производственных операций.
                Идеальный инструмент для оптимизации процессов и координации команды.
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className='block-quinary flex row center-row space-around'>
        <img alt="meeting" src="/meeting.png" className="image-container"/>
        <div className='block-column flex column center-column center-row'>
          <div className='title-secondary text-bold center-text'>Попробуйте Zolotenkov
            прямо сейчас!
          </div>
          <Space>
            <Button type="primary" className='button-start text-bold' onClick={handleStartWork}>
              Бесплатная версия
            </Button>
          </Space>
        </div>
        <img alt="transactions" src="/transactions.png" className="image-container"/>
      </div>
      <div className='footer flex column center-row center-column'>
        <p className='footer-text-primary'>Телефон: +7 (968) 614-15-72</p>
        <p className='footer-text-secondary'>Связаться с нами:</p>
        <a href="https://t.me/AlAlon369" target='_blank' rel="noopener noreferrer">
          <img alt="icon-telegram" src="/icon-telegram.png" className="logo-telegram"/>
        </a>
        <p className='footer-text-tertiary'>© Zolotenkov 2022-2023</p>
      </div>
    </div>
  );
};