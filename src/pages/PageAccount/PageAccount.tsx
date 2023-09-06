import React, {useState} from 'react';
import {Typography, Space, FloatButton, Button,} from 'antd';
import '../../App.css'

export const PageAccount: React.FC = () => {

  const {Title} = Typography;

  const [balance, setBalance] = useState(0);
  
  const replenishBalance = () => {
    setBalance(prevBalance => prevBalance + 10);
  };


  return (
    <div style={{display: 'grid'}}>
      <div className='centerTitle'>
        <Title level={3}>Личный кабинет</Title>
        <Space>
        </Space>
      </div>
      <p>Текущий баланс: {balance} Руб</p>
      <Button type="primary" onClick={replenishBalance} className='Pay-button'>
        Пополнить баланс
      </Button>
      <FloatButton.BackTop/>
    </div>
  );
}

