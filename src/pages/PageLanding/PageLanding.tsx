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
    <div className='container-all'>
      <div className='container-header'>
        <img src="/logo.png" alt="Logo" className='logo-style'/>
        <Space>
          <Button type="dashed" onClick={handleStartWork}>Войти</Button>
          <Button type="primary">Зарегистрироваться</Button>
        </Space>
      </div>
      <div className='container-block'>
        <div className='container-text'>
          <Title className='title-style-1'>Производство, склад, ERP в облаке</Title>
          <p className='text-style-1'>
            Все что нужно — в одном месте: учет операций, закупки, склад, клиенты, отгрузки и отчеты.
          </p>
          <Space>
            <Button type="primary" className='start-button' onClick={handleStartWork}>
              Начать работу
            </Button>
          </Space>
        </div>
        <img src="/Analyse.png" alt="Analyse" className='container-jumbotron'/>
      </div>
      <div className='container-Block-2'>
        <Title className='title-style-2'>Идеально подойдёт всем малым производственным предприятиям</Title>
        <div className='container-Text-2'>
          <p>
            Zolotenkov равноценно полезен всем,
            кто управляет производством. Никаких сложных настроек или загадочных процедур.
            15 минут - и у вас есть ваша собственная,
            персонализированная ERP-система для производственной деятельности.
            Она управляет рабочим процессом и функционирует онлайн.
          </p>
          {/*<div className='card-style'>*/}
          {/*  <img alt="conveyor" src="/conveyor.png" className='card-image'/>*/}
          {/*  <p className='card-title'>Производствам</p>*/}
          {/*</div>*/}
          {/*<div className='card-style'>*/}
          {/*  <img alt="onlineShopping" src="/onlineShopping.png" className='card-image'/>*/}
          {/*  <p className='card-title'>Онлайн магазинам</p>*/}
          {/*</div>*/}
          {/*<div className='card-style'>*/}
          {/*  <img alt="store" src="/store.png" className='card-image'/>*/}
          {/*  <p className='card-title'>Розничной торговле</p>*/}
          {/*</div>*/}
          {/*<div className='card-style'>*/}
          {/*  <img alt="warehouse" src="/warehouse.png" className='card-image'/>*/}
          {/*  <p className='card-title'>Оптовой торговле</p>*/}
          {/*</div>*/}
        </div>
      </div>
      <div className='container-Block-3'>
        <img src="/info.png" alt="info" className='container-jumbotron'/>
        <div className='container-text'>
          <Title className='title-style-1'>Учёт операций</Title>
          <p className='text-style-1'>
            Отслеживайте операции, результаты,
            время выполнения и затраченные ресурсы - все в одной мощной и простой в использовании системе.
            Повышайте эффективность и контролируйте производственные процессы.
          </p>
        </div>
      </div>
      <div className='container-Block-3'>
        <div className='container-text'>
          <Title className='title-style-1'>Управление закупками</Title>
          <p className='text-style-1'>
           Контролируйте все ваши заказы: от количества и цены до даты поставки.
            Мы также предлагаем функционал для приемки товаров,
            помогающий вам без проблем учитывать все закупленные товары.
          </p>
        </div>
        <img src="/info2.png" alt="info2" className='container-jumbotron'/>
      </div>
      <div className='container-Block-3'>
        <img src="/info3.png" alt="info3" className='container-jumbotron'/>
        <div className='container-text'>
          <Title className='title-style-1'>Ведение склада</Title>
          <p className='text-style-1'>
            Легко создавайте товары и добавлять их на склад,
            учитывайте количество товаров и списывайте их со склада.
            Благодаря интеграции с производственными операциями,
            отгрузками и приемками товаров,
            вы всегда будете в курсе актуального баланса на вашем складе.
          </p>
        </div>
      </div>
      <div className='container-Block-4'>
        <Title level={2} className='container-Text-2'>Мы поможем вам работать более эффективно</Title>
        <p className='text-style-3'>
          Мы предлагаем вашей команде полный сет инструментов для создания лучших проектных решений
        </p>
        <div className='card-grid'>
          <Row gutter={[30, 30]} justify="center" align="top">
            {/*<Col span={7}>*/}
            {/*  <Card bordered={false} className='card-style-2'>*/}
            {/*    <img alt="smartphone" src="/smartphone.png" className="card-image-2"/>*/}
            {/*    <div className='card-title-2'>Работайте на любом устройстве</div>*/}
            {/*    Интерфейс Gerda адаптивный.*/}
            {/*    Теперь вы можете быть в курсе всех новостей по текущим проектам*/}
            {/*    вне зависимости от вашего местоположения.*/}
            {/*  </Card>*/}
            {/*</Col>*/}
            <Col span={7}>
              <Card bordered={false} className='card-style-2'>
                <img alt="tap" src="/tap.png" className="card-image-2"/>
                <div className='card-title-2'>Используйте понятный интерфейс</div>
                Мы разработали интуитивный и простой интерфейс,
                к которому можно легко привыкнуть за минимальное количество времени.
              </Card>
            </Col>
            {/*<Col span={7}>*/}
            {/*  <Card bordered={false} className='card-style-2'>*/}
            {/*    <img alt="file" src="/file.png" className="card-image-2"/>*/}
            {/*    <div className='card-title-2'>Держите документы впорядке</div>*/}
            {/*    Вы можете загружать документы и файлы в проекты,*/}
            {/*    борды и дискуссии и делиться ими с коллегами.*/}
            {/*    Также Gerda может служить архивом для файлов вашего проекта.*/}
            {/*  </Card>*/}
            {/*</Col>*/}
            <Col span={7}>
              <Card bordered={false} className='card-style-2'>
                <img alt="international" src="/international.png" className="card-image-2"/>
                <div className='card-title-2'>Работайте в любой точке планеты</div>
                Ваша команда работает по всему миру?
                Сохраняйте связь с коллегами вне зависимости от места положения и коммуницируйте синхронно,
                не упуская деталей проекта.
              </Card>
            </Col>
            <Col span={7}>
              <Card bordered={false} className='card-style-2'>
                <img alt="file2" src="/file2.png" className="card-image-2"/>
                <div className='card-title-2'>Получайте ежемесячные отчёты</div>
                Регулярные отчеты состоят из всех необходимых вам деталей и информации по проекту.
                Вы можете их использовать для анализа своей продуктивности и делиться ими с коллегами.
              </Card>
            </Col>
            {/*<Col span={7}>*/}
            {/*  <Card bordered={false} className='card-style-2'>*/}
            {/*    <img alt="management" src="/management.png" className="card-image-2"/>*/}
            {/*    <div className='card-title-2'>Используйте интеграции</div>*/}
            {/*    Интегрируйте ваши проекты с инструментами Google и другими популярными сервисами.*/}
            {/*    Вы также можете подключить множество сервисов с помощью Zapier или API.*/}
            {/*  </Card>*/}
            {/*</Col>*/}
          </Row>
        </div>
      </div>
      <div className='container-block5'>
        <img alt="Retail-Business" src="/Retail-Business.png" className="container-image-free"/>
        <div className='container-block-column'>
          <Title level={1} className='container-Text-2'>Попробуйте Zolotenkov учёт прямо сейчас!</Title>
          <Space>
            <Button type="primary" className='start-button' onClick={handleStartWork}>Бесплатная версия</Button>
          </Space>
        </div>
        <img alt="empresarial" src="/empresarial.png" className="container-image-free"/>
      </div>
      <div className='container-footer'>
        <p className='text-footer'>Телефон: +7 (968) 614-15-72</p>
        <p className='text-footer2'>Связаться с нами:</p>
        <a href="https://t.me/AlAlon369" rel="noopener noreferrer">
            <img alt="icon-telegram" src="/icon-telegram.png" className="telegram-logo"/>
        </a>
        <p className='text-footer3'>© Zolotenkov 2022</p>
      </div>
    </div>
  );
};
