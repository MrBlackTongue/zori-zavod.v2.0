import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './MainMenu.css';
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  CarryOutOutlined,
  ScheduleOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { menuKeyToRoutes } from '../NavigationTabs/menuKeyToRoutes';

const items = [
  {
    key: '01',
    label: (
      <div className="menu-item-container">
        <ShopOutlined className="menu-item-icon" style={{ fontSize: '24px' }} />
        <div className="menu-item-div">Продажи</div>
      </div>
    ),
  },
  {
    key: '02',
    label: (
      <div className="menu-item-container">
        <AppstoreAddOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Создать</div>
      </div>
    ),
  },
  {
    key: '03',
    label: (
      <div className="menu-item-container">
        <ShoppingCartOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Покупки</div>
      </div>
    ),
  },
  {
    key: '04',
    label: (
      <div className="menu-item-container">
        <AppstoreOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Склад</div>
      </div>
    ),
  },
  {
    key: '05',
    label: (
      <div className="menu-item-container">
        <BarChartOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Отчеты</div>
      </div>
    ),
  },
  {
    key: '06',
    label: (
      <div className="menu-item-container">
        <CarryOutOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Товары</div>
      </div>
    ),
  },
  {
    key: '07',
    label: (
      <div className="menu-item-container">
        <TeamOutlined className="menu-item-icon" style={{ fontSize: '24px' }} />
        <div className="menu-item-div">Контакты</div>
      </div>
    ),
  },
  {
    key: '08',
    label: (
      <div className="menu-item-container">
        <ScheduleOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Команда</div>
      </div>
    ),
  },
];

interface MenuMainProps {
  onMenuKeyChange: (key: string) => void;
  selectedMenuKey: string;
}

// Функция ищет ключ меню соответствующий заданному пути
const findMenuKeyByPath = (path: string) => {
  for (const key of Object.keys(menuKeyToRoutes)) {
    for (const { route } of menuKeyToRoutes[key]) {
      // Если путь начинается с route.props.path, значит это родительский путь
      if (path.startsWith(route.props.path)) {
        return key;
      }
    }
  }
  return null;
};

export const MainMenu: React.FC<MenuMainProps> = ({
  onMenuKeyChange,
  selectedMenuKey,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Функция меняет ключ меню и переходит по новому маршруту
  const handleSelect = ({ key }: { key: string }) => {
    onMenuKeyChange(key);
    const firstRoute = menuKeyToRoutes[key]?.[0]?.route?.props?.path;
    if (firstRoute) {
      localStorage.setItem('activeMenuKey', key);
      navigate(firstRoute);
    }
  };

  // useEffect для обновления activeMenuKey в localStorage
  useEffect(() => {
    const foundMenuKey = findMenuKeyByPath(location.pathname);
    if (foundMenuKey) {
      localStorage.setItem('activeMenuKey', foundMenuKey);
    }
  }, [location.pathname]);

  // useEffect для вызова onMenuKeyChange на основе текущего пути или сохраненного ключа
  useEffect(() => {
    const foundMenuKey = findMenuKeyByPath(location.pathname);
    const savedActiveMenuKey = localStorage.getItem('activeMenuKey');

    if (foundMenuKey) {
      onMenuKeyChange(savedActiveMenuKey ?? foundMenuKey);
    }
  }, [location.pathname, onMenuKeyChange]);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedMenuKey]}
      onSelect={handleSelect}
      items={items}
      style={{ height: '100%', width: '100%' }}
    />
  );
};
