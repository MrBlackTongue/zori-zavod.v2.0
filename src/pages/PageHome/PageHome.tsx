import React from 'react';
import { Typography, Button, Space} from 'antd';
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
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      backgroundColor: '#ffffff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <Title level={1}>Здарова заебал</Title>
        <p>Купи наше приложение для ровных пацанов</p>
        <Space>
          <Button type="primary" onClick={handleStartWork}>начать работу</Button>
        </Space>
      </div>
    </div>
  );
};
