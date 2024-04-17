import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import {
  ALL,
  CLIENTS,
  OPERATION,
  OPERATION_ACCOUNTING,
  PRODUCTS,
  PURCHASES,
  REPORT,
  SHIPMENT,
  WORK_HOURS,
} from '../../../api';
import { menuKeyToRoutes } from '../NavigationTabs/menuKeyToRoutes';

const items = [
  {
    key: '01',
    label: (
      <Link to={`/sell${SHIPMENT}`} className="menu-item-container">
        <ShopOutlined className="menu-item-icon" style={{ fontSize: '24px' }} />
        <div className="menu-item-div">Продажи</div>
      </Link>
    ),
  },
  {
    key: '02',
    label: (
      <Link to={`${OPERATION_ACCOUNTING}`} className="menu-item-container">
        <AppstoreAddOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Создать</div>
      </Link>
    ),
  },
  {
    key: '03',
    label: (
      <Link to={`${PURCHASES}`} className="menu-item-container">
        <ShoppingCartOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Закупки</div>
      </Link>
    ),
  },
  {
    key: '04',
    label: (
      <Link to={`/inventory${ALL}`} className="menu-item-container">
        <AppstoreOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Склад</div>
      </Link>
    ),
  },
  {
    key: '05',
    label: (
      <Link to={`${REPORT}${OPERATION}`} className="menu-item-container">
        <BarChartOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Отчеты</div>
      </Link>
    ),
  },
  {
    key: '06',
    label: (
      <Link to={`${PRODUCTS}`} className="menu-item-container">
        <CarryOutOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Товары</div>
      </Link>
    ),
  },
  {
    key: '07',
    label: (
      <Link to={`${CLIENTS}`} className="menu-item-container">
        <TeamOutlined className="menu-item-icon" style={{ fontSize: '24px' }} />
        <div className="menu-item-div">Контакты</div>
      </Link>
    ),
  },
  {
    key: '08',
    label: (
      <Link to={`${WORK_HOURS}`} className="menu-item-container">
        <ScheduleOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Команда</div>
      </Link>
    ),
  },
];

interface MenuMainProps {
  onMenuKeyChange: (key: string) => void;
  selectedMenuKey: string;
}

// todo: удалить прямые route из главных Tabs и перенести все в дочерние, и уже потом удалить isPathStartsWith и все что с ними связано
// Функция для проверки, начинается ли путь с заданного маршрута
const isPathStartsWith = (path: string, route: string) => {
  return path.startsWith(route);
};

// Функция для проверки, включает ли путь заданный дочерний маршрут
const isPathIncludesChildTab = (path: string, tabInfo: any) => {
  return tabInfo.childTabs?.some((childTab: any) => {
    const childTabPath = `${tabInfo.id}${childTab.id}`;
    return path.includes(childTabPath);
  });
};

// Функция для поиска ключа меню по заданному пути
const findMenuKeyByPath = (path: string) => {
  for (const key of Object.keys(menuKeyToRoutes)) {
    const matchedTabInfo = menuKeyToRoutes[key].find((tabInfo: any) => {
      const routePath = tabInfo.route?.props?.path;
      return routePath && isPathStartsWith(path, routePath);
    });

    const matchedChildTabInfo = menuKeyToRoutes[key].find((tabInfo: any) => {
      return isPathIncludesChildTab(path, tabInfo);
    });

    if (matchedTabInfo || matchedChildTabInfo) {
      return key;
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
    const menuItem = items.find(item => item.key === key);
    const linkPath = menuItem?.label?.props?.to;
    if (linkPath && location.pathname !== linkPath) {
      localStorage.setItem('activeMenuKey', key);
      navigate(linkPath, { replace: true });
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
