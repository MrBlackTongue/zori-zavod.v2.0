import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons/lib/icons';
import type { MenuProps } from 'antd/es/menu';
// @ts-ignore
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Сотрудники', '1', <PieChartOutlined />),
  getItem('Типы операций', '2', <DesktopOutlined />),
  getItem('Учет операций', '3', <ContainerOutlined />),
  getItem('Отчет по операциям', '4', <MailOutlined />),
  getItem('Отчет по выпускам', '5', <AppstoreOutlined />,),
  getItem('Продукты', '6', <AppstoreOutlined />,),
  getItem('Выпуск продукции', '7', <AppstoreOutlined />,),
  getItem('Типы расходов', '8', <AppstoreOutlined />,),
  getItem('Расходы по выпускам', '9', <AppstoreOutlined />,),
  getItem('Расходы по операциям', '10', <AppstoreOutlined />,),
  getItem('Единицы измерения', '11', <AppstoreOutlined />,),
];

const MainMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default MainMenu;