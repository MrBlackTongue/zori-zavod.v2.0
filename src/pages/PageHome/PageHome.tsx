import React from 'react';
import { Typography, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const { Title } = Typography;

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
      alignItems: 'left',
      padding: '50px',
      zIndex: 9999,
      backgroundColor: '#ffffff'
    }} >
      <div  className={'container1'}>
        <img src="/logo.png" alt="Logo" style={{ height: '170px', marginTop: '-63px', marginLeft: '20px' }} />
      </div>
      <div className={'container2'}>
        <Title style={{fontSize: '46px'}} level={1}>Очень крутое приложение</Title>
        <p style={{fontSize: '16px'}}>настоятельно рекомендую его купить, вот прям серьёзно</p>
        <Space>
          <Button type="primary" onClick={handleStartWork}>начать работу</Button>
        </Space>
        </div>
      <div className={'container-jumbotron'}>
        <img src="/Analyse.png" alt="Analyse"
             style={{ height: '250px'}}
        />
      </div>
      </div>
  );
};
