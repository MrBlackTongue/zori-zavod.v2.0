import React from 'react';
import {Typography, Button, Space} from 'antd';
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
        {/*<div className='container-logo'>*/}
        <img src="/logo.png" alt="Logo" className='logo-style'/>
        {/*</div>*/}
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
              <img alt="manufacture" src="/manufacture1.png" className='card-image'/>
              <p className='card-title'>производствам</p>
            </div>
          <div className='card-style'>
            <img alt="manufacture" src="/manufacture1.png" className='card-image'/>
            <p className='card-title'>производствам</p>
          </div>
          <div className='card-style'>
            <img alt="manufacture" src="/manufacture1.png" className='card-image'/>
            <p className='card-title'>производствам</p>
          </div>
          <div className='card-style'>
            <img alt="manufacture" src="/manufacture1.png" className='card-image'/>
            <p className='card-title'>производствам</p>
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
    </div>
  );
};
