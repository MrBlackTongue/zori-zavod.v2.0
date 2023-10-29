import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './MenuMain.css';
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
  ACCEPTANCE,
  BATCH,
  CLIENT,
  COST_PRICE,
  EMPLOYEE,
  ESTIMATED_PRICE,
  HISTORY,
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

const items = [
  {
    label: (
      <div className="menu-item-container">
        <ShopOutlined className="menu-item-icon" style={{ fontSize: '24px' }} />
        <div className="menu-item-div">Продажи</div>
      </div>
    ),
    key: '01',
    children: [
      {
        label: <Link to={SHIPMENT}>Отгрузки</Link>,
        key: `${SHIPMENT}`,
      },
    ],
  },
  {
    label: (
      <div className="menu-item-container">
        <AppstoreAddOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Создать</div>
      </div>
    ),
    key: '02',
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
      {
        label: <Link to={OUTPUT}>Выпуски продукции</Link>,
        key: `${OUTPUT}`,
      },
    ],
  },
  {
    label: (
      <div className="menu-item-container">
        <ShoppingCartOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Покупки</div>
      </div>
    ),
    key: '03',
    children: [
      {
        label: <Link to={PURCHASE}>Закупки</Link>,
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
    label: (
      <div className="menu-item-container">
        <AppstoreOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Склад</div>
      </div>
    ),
    key: '04',
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
      {
        label: (
          <Link to={`${PRODUCT_MOVEMENT}${HISTORY}`}>История товаров</Link>
        ),
        key: `${PRODUCT_MOVEMENT}${HISTORY}`,
      },
    ],
  },
  {
    label: (
      <div className="menu-item-container">
        <BarChartOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Отчеты</div>
      </div>
    ),
    key: '05',
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
    label: (
      <div className="menu-item-container">
        <CarryOutOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Товары</div>
      </div>
    ),
    key: '06',
    children: [
      {
        label: <Link to={PRODUCT}>Товары</Link>,
        key: `${PRODUCT}`,
      },
      {
        label: <Link to={PRODUCT_GROUP}>Группы товаров</Link>,
        key: `${PRODUCT_GROUP}`,
      },
      {
        label: <Link to={ESTIMATED_PRICE}>Расчетные цены</Link>,
        key: `${ESTIMATED_PRICE}`,
      },
      {
        label: <Link to={UNIT}>Единицы измерения</Link>,
        key: `${UNIT}`,
      },
    ],
  },
  {
    label: (
      <div className="menu-item-container">
        <TeamOutlined className="menu-item-icon" style={{ fontSize: '24px' }} />
        <div className="menu-item-div">Контакты</div>
      </div>
    ),
    key: '07',
    children: [
      {
        label: <Link to={CLIENT}>Клиенты</Link>,
        key: `${CLIENT}`,
      },
    ],
  },
  {
    label: (
      <div className="menu-item-container">
        <ScheduleOutlined
          className="menu-item-icon"
          style={{ fontSize: '24px' }}
        />
        <div className="menu-item-div">Сотрудники</div>
      </div>
    ),
    key: '08',
    children: [
      {
        label: <Link to={EMPLOYEE}>Сотрудники</Link>,
        key: `${EMPLOYEE}`,
      },
    ],
  },
];

export const MenuMain: React.FC = () => {
  const location = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
};
