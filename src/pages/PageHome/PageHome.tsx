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
          {/*<div className='button-registration'>*/}
          <Button type="primary">Зарегистрироваться</Button>
          {/*</div>*/}
          {/*<div className='button-login'>*/}
          <Button type="dashed" onClick={handleStartWork}>Войти</Button>
          {/*</div>*/}
        </Space>
      </div>
      <div className='container-block'>
        <div className='container-text'>
          <Title className='title-style-1'>Увеличте продуктивность вашего производства</Title>
          <p className='text-style-1'>
            Новый инструмент менеджмента помогает в планировании, коммуникации и управлении процессами
          </p>
          <Space>
            <Button type="primary" size={'large'} className='start-button' onClick={handleStartWork}>Начать работу</Button>
          </Space>
        </div>
        <div className='container-jumbotron'>
          <img src="/Analyse.png" alt="Analyse" className='img-main'/>
        </div>
      </div>
      <div className='containerBlock2'>
        <div className='containerText2'>
          <Title className='title-style-2'>Кому выгодно?</Title>
          <p className='text-style-2'>производствам, всяким бизнесам и в целом ровным пацанам и пацанессам</p>
        </div>
      </div>
    </div>
  );
};
