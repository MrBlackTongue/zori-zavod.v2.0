import React, { useEffect, useState } from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { getUserSubscription, logoutUser } from '../../../services';
import { TypeSubscription } from '../../../types';
import './MenuUser.css';

export const MenuUser: React.FC = () => {
  // Информация о подписке
  const [subscriptionInfo, setSubscriptionInfo] = useState<TypeSubscription>();

  const navigate = useNavigate();

  const handleSubscription = () => {
    navigate('/subscription');
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button
          type="default"
          onClick={handleSubscription}
          className="dropdown-item-menu">
          Подписка
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button
          type="default"
          onClick={handleLogout}
          className="dropdown-item-menu">
          <LogoutOutlined />
          Выйти
        </Button>
      ),
    },
  ];

  // Получить информацию о подписке пользователя
  useEffect(() => {
    getUserSubscription()
      .then(data => setSubscriptionInfo(data))
      .catch(error => {
        console.log('Error: ', error);
      });
  }, []);

  return (
    <div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button className="button-menu-user">
          {subscriptionInfo?.customer.email}
          <DownOutlined style={{ fontSize: '14px' }} />
        </Button>
      </Dropdown>
    </div>
  );
};
