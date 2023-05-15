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

const {SubMenu} = Menu;

export const MenuMain: React.FC = () => {
  return (
    <div style={{'height': 'calc(100vh - 10px)', 'overflowY': 'auto'}}>
      <Menu
        theme="light"
        mode="inline">
        <Menu.Item key="1" icon={<TeamOutlined/>}>
          <Link to="/employee">Сотрудники</Link>
        </Menu.Item>

        <SubMenu key="operation" icon={<TrophyOutlined/>} title="Операции">
          <Menu.Item key="2" icon={<UnorderedListOutlined/>}>
            <Link to="/operation-accounting">Учет операций</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UnorderedListOutlined/>}>
            <Link to="/operation">Типы операций</Link>
          </Menu.Item>
          <Menu.Item key="31" icon={<UnorderedListOutlined/>}>
            <Link to="/production-type">Типы производства</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="report" icon={<TrophyOutlined/>} title="Отчеты">
          <Menu.Item key="4" icon={<CopyOutlined/>}>
            <Link to="/operation-report">По операциям</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UnorderedListOutlined/>}>
            <Link to="/output-report">По выпускам</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<DatabaseOutlined/>}>
            <Link to="/product-report">По продуктам</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<UnorderedListOutlined/>}>
            <Link to="/employee-report">По сотрудникам</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="product" icon={<TrophyOutlined/>} title="Товары">
          <Menu.Item key="8" icon={<TrophyOutlined/>}>
            <Link to="/product">Товары</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FormOutlined/>}>
            <Link to="/product-group">Группы товаров</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="meter" icon={<TrophyOutlined/>} title="Счетчики">
          <Menu.Item key="10" icon={<TrophyOutlined/>}>
            <Link to="/meter-record">Записи счетчиков</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<PicLeftOutlined/>}>
            <Link to="/meter">Счетчики</Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<TrophyOutlined/>}>
            <Link to="/meter-type">Типы счетчиков</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="13" icon={<FunctionOutlined/>}>
          <Link to="/client">Клиенты</Link>
        </Menu.Item>
        <Menu.Item key="14" icon={<DollarCircleOutlined/>}>
          <Link to="/stock">Склад</Link>
        </Menu.Item>
        <Menu.Item key="15" icon={<DollarCircleOutlined/>}>
          <Link to="/shipment">Отгрузки</Link>
        </Menu.Item>

        <SubMenu key="purchase" icon={<TrophyOutlined/>} title="Закупки">
          <Menu.Item key="16" icon={<FunctionOutlined/>}>
            <Link to="/purchase">Заказы на закупки</Link>
          </Menu.Item>
          <Menu.Item key="17" icon={<FunctionOutlined/>}>
            <Link to="/product-batch">Партии товаров</Link>
          </Menu.Item>
          <Menu.Item key="18" icon={<AccountBookOutlined/>}>
            <Link to="/acceptance">Приемка товаров</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="movement" icon={<TrophyOutlined/>} title="Движения товаров">
          <Menu.Item key="19" icon={<AccountBookOutlined/>}>
            <Link to="/product-movement">На производстве</Link>
          </Menu.Item>
          <Menu.Item key="20" icon={<UploadOutlined/>}>
            <Link to="/product-movement-history">История</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="21" icon={<AccountBookOutlined/>}>
          <Link to="/output">Выпуски продукции</Link>
        </Menu.Item>
        <Menu.Item key="22" icon={<FunctionOutlined/>}>
          <Link to="/unit">Единицы измерения</Link>
        </Menu.Item>

        <SubMenu key="transformation" icon={<TrophyOutlined/>} title="Трансформации">
          <Menu.Item key="23" icon={<FunctionOutlined/>}>
            <Link to="/transformation-record">Записи трансформаций</Link>
          </Menu.Item>
          <Menu.Item key="24" icon={<FunctionOutlined/>}>
            <Link to="/transformation">Трансформации</Link>
          </Menu.Item>
          <Menu.Item key="25" icon={<FunctionOutlined/>}>
            <Link to="/transformation-step">Шаги трансформаций</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}