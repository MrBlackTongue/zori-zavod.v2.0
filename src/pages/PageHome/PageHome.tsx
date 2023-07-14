import React from 'react';
import {Typography, Button, Space, Card, Row, Col} from 'antd';
import {useNavigate} from 'react-router-dom';
import '../PageHome/PageHome.css';

const {Title} = Typography;


export const PageHome = () => {
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
          <Title className='title-style-1'>Увеличте продуктивность вашего производства</Title>
          <p className='text-style-1'>
            Новый инструмент менеджмента помогает в планировании, коммуникации и управлении процессами
          </p>
          <Space>
            <Button type="primary" size={'large'} className='start-button' onClick={handleStartWork}>Начать
              работу</Button>
          </Space>
        </div>
        <div className='container-jumbotron'>
          <img src="/Analyse.png" alt="Analyse" className='img-main'/>
        </div>
      </div>
      <div className='containerBlock2'>
        <div className='containerText2'>
          <Title className='title-style-2'>Кому выгодно?</Title>
        </div>
        <div className='container-card'>
          <div className='card-style'>
            <img alt="conveyor" src="/conveyor.png" className='card-image'/>
            <p className='card-title'>Производствам</p>
          </div>
          <div className='card-style'>
            <img alt="onlineShopping" src="/onlineShopping.png" className='card-image'/>
            <p className='card-title'>Онлайн магазинам</p>
          </div>
          <div className='card-style'>
            <img alt="store" src="/store.png" className='card-image'/>
            <p className='card-title'>Розничной торговле</p>
          </div>
          <div className='card-style'>
            <img alt="warehouse" src="/warehouse.png" className='card-image'/>
            <p className='card-title'>Оптовой торговле</p>
          </div>
        </div>
      </div>
      <div className='containerBlock3'>
        <div className='container-jumbotron'>
          <img src="/info.png" alt="info" className='img-main'/>
        </div>
        <div className='container-text'>
          <Title className='title-style-1'>Управление задачами</Title>
          <p className='text-style-1'>
            Используйте листы задач, расписание команды и календарь.
            Добавляйте файлы, комментарии и делитесь своими разработками с командой.
          </p>
        </div>
      </div>
      <div className='containerBlock3'>
        <div className='container-text'>
          <Title className='title-style-1'>Управление временем</Title>
          <p className='text-style-1'>
            Следите за задачами, над которыми вы ежедневно работаете и анализируйте,
            сколько времени вы потратили на каждый проект.
            Вы можете использовать автоматический таймер или управлять им вручную.
          </p>
        </div>
        <div className='container-jumbotron'>
          <img src="/info2.png" alt="info2" className='img-main'/>
        </div>
      </div>
      <div className='containerBlock3'>
        <div className='container-jumbotron'>
          <img src="/info3.png" alt="info3" className='img-main'/>
        </div>
        <div className='container-text'>
          <Title className='title-style-1'>Коммуникация команды</Title>
          <p className='text-style-1'>
            Онлайн-дискуссии и комментарии позволят вашей команде
            коммуницировать и быть в курсе всех обновлений и новостей проекта.
          </p>
        </div>
      </div>
      <div className='containerBlock4'>
        <div className='containerText2'>
          <Title level={2}>Мы поможем вам работать более эффективно</Title>
        </div>
        <p className='text-style-3'>
          Мы предлагаем вашей команде полный сет инструментов для создания лучших проектных решений
        </p>
        <div className='card-grid'>
          {/*<div className='card-style-2'>*/}
            <Row gutter={[30, 30]} justify="center" align="top">
              <Col span={7}>
                <Card title={<div style={{whiteSpace: 'normal'}}>Работайте на любом устройстве</div>} bordered={false}
                      className='card-style-2'>
                  Интерфейс Gerda адаптивный.
                  Теперь вы можете быть в курсе всех новостей по текущим проектам
                  вне зависимости от вашего местоположения.
                </Card>
              </Col>
              <Col span={7}>
                <Card title={<div style={{whiteSpace: 'normal'}}>Используйте понятный интерфейс</div>} bordered={false}
                      className='card-style-2'>
                  Мы разработали интуитивный и простой интерфейс,
                  к которому можно легко привыкнуть за минимальное количество времени.
                </Card>
              </Col>
              <Col span={7}>
                <Card title={<div style={{whiteSpace: 'normal'}}>Держите документы в порядке</div>} bordered={false}
                      className='card-style-2'>
                  Вы можете загружать документы и файлы в проекты,
                  борды и дискуссии и делиться ими с коллегами.
                  Также Gerda может служить архивом для файлов вашего проекта.
                </Card>
              </Col>
          {/*  </Row>*/}
          {/*</div>*/}
          {/*<div className='card-grid'>*/}
            {/*<div>*/}
            {/*  <Row gutter={30} justify="center">*/}
                <Col span={7}>
                  <Card title={<div style={{whiteSpace: 'normal'}}>Работайте в любой точке планеты</div>}
                        bordered={false} className='card-style-2'>
                    Ваша команда работает по всему миру?
                    Сохраняйте связь с коллегами вне зависимости от места положения и коммуницируйте синхронно,
                    не упуская деталей проекта.
                  </Card>
                </Col>
                <Col span={7}>
                  <Card title={<div style={{whiteSpace: 'normal'}}>Получайте ежемесячные отчеты</div>} bordered={false}
                        className='card-style-2'>
                    Регулярные отчеты состоят из всех необходимых вам деталей и информации по проекту.
                    Вы можете их использовать для анализа своей продуктивности и делиться ими с коллегами.
                  </Card>
                </Col>
                <Col span={7}>
                  <Card title={<div style={{whiteSpace: 'normal'}}>Используйте интеграции</div>} bordered={false}
                        className='card-style-2'>
                    Интегрируйте ваши проекты с инструментами Google и другими популярными сервисами.
                    Вы также можете подключить множество сервисов с помощью Zapier или API.
                  </Card>
                </Col>
              </Row>
            {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
