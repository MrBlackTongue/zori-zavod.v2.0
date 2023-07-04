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
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100vh',
      top: '0',
      left: '0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'left',
      padding: '30px',
      zIndex: 9999,
      backgroundColor: '#ffffff'
    }} className={'container'}>
      <div style={{ marginLeft: '100px' }} className={'container'}>
        <img src="/logo.png" alt="Logo" style={{ height: '170px', marginTop: '-63px', marginLeft: '20px' }} />
      </div>
      <div className={'container'}>
        <Title level={1} className={'landing-form'}>Здарова заебал</Title>
        <p className={'landing-form'}>Купи наше приложение для ровных пацанов и отведай этих тёплых, мягких французских булок </p>
        <Space>
          <Button type="primary" onClick={handleStartWork} className={'landing-form-button'}>начать работу</Button>
        </Space>
      </div>
      <div>
        <img src="/Analyse.png" alt="Analyse"
             style={{ height: '300px', marginTop: '70px', marginRight: '60px' }}
        />
      </div>
    </div>
  );
};
