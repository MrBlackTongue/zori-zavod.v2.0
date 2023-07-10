import React from 'react';
import {Typography, Button, Space} from 'antd';
import {useNavigate} from 'react-router-dom';
import '../../App.css';

const {Title} = Typography;

export const PageHome = () => {
  const navigate = useNavigate();

  const handleStartWork = () => {
    navigate('/login');
  };

  return (
    <div className={'container-all'}
         style={{
           position: 'fixed',
           width: '100%',
           height: '100vh',
           top: '0',
           left: '0',
           display: 'flex',
           justifyContent: 'center',
           // alignItems: 'left',
           padding: '50px',
           zIndex: 9999,
           backgroundColor: '#ffffff'
         }}>
      <div className={'container1'}>
        <div className={'containerLogo'}>
          <img src="/logo.png" alt="Logo"
               style={{height: '170px'}}
          />
        </div>
        <div className={'ButtonRegistration'}>
          <Button type="primary">Зарегестрироваться</Button>
        </div>
        <div className={'containerButton'}>
          <Button type="dashed" onClick={handleStartWork}>Войти</Button>
        </div>
      </div>
      <div className={'containerBlock'}>
        <div className={'containerText'}>
          <Title style={{fontSize: '36px'}} level={1}>Очень крутое приложение</Title>
          <p style={{fontSize: '16px'}}>для учёта вашего успешного успеха</p>
          <Space>
            <Button type="primary" onClick={handleStartWork}>начать работу</Button>
          </Space>
        </div>
        <div className={'container-jumbotron'}>
          <img src="/Analyse.png" alt="Analyse"
               style={{height: '40vh'}}
          />
        </div>
      </div>
      <div className={'containerBlock2'}>
        <div className={'containerText2'}>
          <Title level={1} style={{fontSize: '52px'}}>Кому выгодно?</Title>
          <p style={{fontSize: '24px'}}>производствам, всяким бизнесам и в целом ровным пацанам</p>
        </div>
      </div>
    </div>
  );
};
