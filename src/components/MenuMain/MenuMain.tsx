import React from 'react';
import {Menu} from 'antd';
import {Link} from "react-router-dom";
import {
  AccountBookOutlined,
  CopyOutlined,
  DatabaseOutlined,
  DollarCircleOutlined,
  FormOutlined,
  FunctionOutlined,
  PicLeftOutlined,
  TeamOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
  UploadOutlined
} from "@ant-design/icons";

export const MenuMain: React.FC = () => {
  return <Menu
    theme="light"
    mode="inline"
    items={[
      {
        key: '1',
        icon: <Link to='/employees'><TeamOutlined/></Link>,
        label: 'Сотрудники',
      },
      {
        key: '2',
        icon: <Link to='/operations'><UnorderedListOutlined/></Link>,
        label: 'Типы операций',
      },
      {
        key: '3',
        icon: <PicLeftOutlined/>,
        label: 'Учет операций',
      },
      {
        key: '4',
        icon: <FormOutlined/>,
        label: 'Отчет по операциям',
      },
      {
        key: '5',
        icon: <CopyOutlined/>,
        label: 'Отчет по выпускам',
      },
      {
        key: '6',
        icon: <UploadOutlined/>,
        label: 'Отчет по продуктам',
      },
      {
        key: '7',
        icon: <Link to='/products'><TrophyOutlined/></Link>,
        label: 'Товары',
      },
      {
        key: '8',
        icon: <DatabaseOutlined/>,
        label: 'Группа товаров',
      },
      {
        key: '9',
        icon: <DollarCircleOutlined/>,
        label: 'Склад',
      },
      {
        key: '11',
        icon: <AccountBookOutlined/>,
        label: 'Заказы на закупки',
      },
      {
        key: '12',
        icon: <AccountBookOutlined/>,
        label: 'Партии товаров',
      },
      {
        key: '13',
        icon: <AccountBookOutlined/>,
        label: 'Приемка товаров',
      },
      {
        key: '14',
        icon: <AccountBookOutlined/>,
        label: 'Движение товаров',
      },
      {
        key: '15',
        icon: <AccountBookOutlined/>,
        label: 'История движения товаров',
      },
      {
        key: '16',
        icon: <Link to='/outputs'><AccountBookOutlined/></Link>,
        label: 'Выпуски продукции',
      },
      {
        key: '17',
        icon: <Link to='/units'><FunctionOutlined/></Link>,
        label: 'Единицы измерения',
      },
      {
        key: '18',
        icon: <Link to='/clients'><FunctionOutlined/></Link>,
        label: 'Клиенты',
      },
      {
        key: '19',
        icon: <Link to='/purchases'><FunctionOutlined/></Link>,
        label: 'Закупки',
      },
    ]}
  >
  </Menu>
}