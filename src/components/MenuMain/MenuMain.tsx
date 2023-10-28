import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './MenuMain.css';
import {
  CalendarOutlined,
  ContactsOutlined,
  LogoutOutlined,
  RightOutlined,
  SolutionOutlined,
  TeamOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import {
  ACCEPTANCE,
  BATCH,
  CLIENT,
  COST_PRICE,
  EMPLOYEE,
  ESTIMATED_PRICE,
  HISTORY,
  METER,
  METER_RECORD,
  METER_TYPE,
  OPERATION,
  OPERATION_ACCOUNTING,
  OUTPUT,
  PRODUCT,
  PRODUCT_GROUP,
  PRODUCT_MOVEMENT,
  PRODUCTION_TYPE,
  PURCHASE,
  REPORT,
  SHIPMENT,
  STOCK,
  STORAGE_PLACE,
  UNIT,
  WRITE_OFF,
} from '../../services';

const ITEMS = [
  {
    label: (
      <div className="menu-item-container">
        <TeamOutlined className="menu-item-icon" style={{ fontSize: '22px' }} />
        <Link to={EMPLOYEE} className="menu-item-link">
          Сотрудники
        </Link>
      </div>
    ),
    key: `${EMPLOYEE}`,
  },
  {
    label: 'Операции',
    key: '01',
    icon: <RightOutlined />,
    children: [
      {
        label: <Link to={OPERATION_ACCOUNTING}>Учет операций</Link>,
        key: `${OPERATION_ACCOUNTING}`,
      },
      {
        label: <Link to={OPERATION}>Типы операций</Link>,
        key: `${OPERATION}`,
      },
      {
        label: <Link to={PRODUCTION_TYPE}>Типы производства</Link>,
        key: `${PRODUCTION_TYPE}`,
      },
    ],
  },
  {
    label: 'Отчеты',
    key: '02',
    icon: <RightOutlined />,
    children: [
      {
        label: <Link to={`${REPORT}${OPERATION}`}>По операциям</Link>,
        key: `${REPORT}${OPERATION}`,
      },
      {
        label: <Link to={`${REPORT}${OUTPUT}`}>По выпускам</Link>,
        key: `${REPORT}${OUTPUT}`,
      },
      {
        label: <Link to={`${REPORT}${PRODUCT}`}>По товарам</Link>,
        key: `${REPORT}${PRODUCT}`,
      },
      {
        label: <Link to={`${REPORT}${EMPLOYEE}`}>По сотрудникам</Link>,
        key: `${REPORT}${EMPLOYEE}`,
      },
      {
        label: <Link to={`${REPORT}${COST_PRICE}`}>По себестоимости</Link>,
        key: `${REPORT}${COST_PRICE}`,
      },
    ],
  },
  {
    label: 'Товары',
    key: '03',
    icon: <RightOutlined />,
    children: [
      {
        label: <Link to={PRODUCT}>Товары</Link>,
        key: `${PRODUCT}`,
      },
      {
        label: <Link to={PRODUCT_GROUP}>Группы товаров</Link>,
        key: `${PRODUCT_GROUP}`,
      },
    ],
  },
  {
    label: 'Счетчики',
    key: '04',
    icon: <RightOutlined />,
    children: [
      {
        label: <Link to={METER_RECORD}>Записи счетчиков</Link>,
        key: `${METER_RECORD}`,
      },
      {
        label: <Link to={METER}>Счетчики</Link>,
        key: `${METER}`,
      },
      {
        label: <Link to={METER_TYPE}>Типы счетчиков</Link>,
        key: `${METER_TYPE}`,
      },
    ],
  },
  {
    label: <Link to={CLIENT}>Клиенты</Link>,
    key: `${CLIENT}`,
    icon: <SolutionOutlined />,
  },
  {
    label: 'Склад',
    key: '05',
    icon: <RightOutlined />,
    children: [
      {
        label: <Link to={STOCK}>Остатки</Link>,
        key: `${STOCK}`,
      },
      {
        label: <Link to={WRITE_OFF}>Списание</Link>,
        key: `${WRITE_OFF}`,
      },
      {
        label: <Link to={STORAGE_PLACE}>Место хранения</Link>,
        key: `${STORAGE_PLACE}`,
      },
    ],
  },
  {
    label: <Link to={SHIPMENT}>Отгрузки</Link>,
    key: `${SHIPMENT}`,
    icon: <ContactsOutlined />,
  },
  {
    label: 'Закупки',
    key: '06',
    icon: <RightOutlined />,
    children: [
      {
        label: <Link to={PURCHASE}>Заказы на закупки</Link>,
        key: `${PURCHASE}`,
      },
      {
        label: <Link to={`${PRODUCT}${BATCH}`}>Партии товаров</Link>,
        key: `${PRODUCT}${BATCH}`,
      },
      {
        label: <Link to={ACCEPTANCE}>Приемка товаров</Link>,
        key: `${ACCEPTANCE}`,
      },
    ],
  },
  {
    label: 'Себестоимость',
    key: '07',
    icon: <RightOutlined />,
    children: [
      {
        label: <Link to={ESTIMATED_PRICE}>Расчетные цены</Link>,
        key: `${ESTIMATED_PRICE}`,
      },
    ],
  },
  {
    label: <Link to={`${PRODUCT_MOVEMENT}${HISTORY}`}>История товаров</Link>,
    key: `${PRODUCT_MOVEMENT}${HISTORY}`,
    icon: <CalendarOutlined />,
  },
  {
    label: <Link to={OUTPUT}>Выпуски продукции</Link>,
    key: `${OUTPUT}`,
    icon: <LogoutOutlined />,
  },
  {
    label: <Link to={UNIT}>Единицы измерения</Link>,
    key: `${UNIT}`,
    icon: <TranslationOutlined />,
  },
];

export const MenuMain: React.FC = () => {
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={ITEMS}
      style={{ height: '100%' }}
    />
  );
};
