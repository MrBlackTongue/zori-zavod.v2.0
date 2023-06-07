import React, {useState} from 'react';
import {Menu} from 'antd';
import {Link, useLocation} from "react-router-dom";
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

  const subMenuRoutes = {
    "01": ["/operation-accounting", "/operation", "/production-type"],
    "02": ["/operation-report", "/output-report", "/product-report", "/employee-report"],
    "03": ["/product", "/product-group"],
    "04": ["/meter-record", "/meter", "/meter-type"],
    "05": ["/purchase", "/product-batch", "/acceptance"],
    "06": ["/product-movement", "/product-movement-history"],
    "07": ["/transformation-record", "/transformation", "/transformation-step"],
  };

  const findSubMenuKey = (pathname: any) => {
    for (const [key, routes] of Object.entries(subMenuRoutes)) {
      if (routes.includes(pathname)) {
        return key;
      }
    }
    return "";
  };

  const {SubMenu} = Menu;
  const location = useLocation();
  const defaultOpenKeys = findSubMenuKey(location.pathname);
  const [openKeys, setOpenKeys] = useState([defaultOpenKeys]);

  // Функция-обработчик изменения openKeys
  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (Object.keys(subMenuRoutes).indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div style={{'height': 'calc(100vh - 100px)', 'overflowY': 'auto'}}>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Menu.Item key="/employee" icon={<TeamOutlined/>}>
          <Link to="/employee">Сотрудники</Link>
        </Menu.Item>

        <SubMenu key="01" icon={<TrophyOutlined/>} title="Операции">
          <Menu.Item key="/operation-accounting" icon={<UnorderedListOutlined/>}>
            <Link to="/operation-accounting">Учет операций</Link>
          </Menu.Item>
          <Menu.Item key="/operation" icon={<UnorderedListOutlined/>}>
            <Link to="/operation">Типы операций</Link>
          </Menu.Item>
          <Menu.Item key="/production-type" icon={<UnorderedListOutlined/>}>
            <Link to="/production-type">Типы производства</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="02" icon={<TrophyOutlined/>} title="Отчеты">
          <Menu.Item key="/operation-report" icon={<CopyOutlined/>}>
            <Link to="/operation-report">По операциям</Link>
          </Menu.Item>
          <Menu.Item key="/output-report" icon={<UnorderedListOutlined/>}>
            <Link to="/output-report">По выпускам</Link>
          </Menu.Item>
          <Menu.Item key="/product-report" icon={<DatabaseOutlined/>}>
            <Link to="/product-report">По продуктам</Link>
          </Menu.Item>
          <Menu.Item key="/employee-report" icon={<UnorderedListOutlined/>}>
            <Link to="/employee-report">По сотрудникам</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="03" icon={<TrophyOutlined/>} title="Товары">
          <Menu.Item key="/product" icon={<TrophyOutlined/>}>
            <Link to="/product">Товары</Link>
          </Menu.Item>
          <Menu.Item key="/product-group" icon={<FormOutlined/>}>
            <Link to="/product-group">Группы товаров</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="04" icon={<TrophyOutlined/>} title="Счетчики">
          <Menu.Item key="/meter-record" icon={<TrophyOutlined/>}>
            <Link to="/meter-record">Записи счетчиков</Link>
          </Menu.Item>
          <Menu.Item key="/meter" icon={<PicLeftOutlined/>}>
            <Link to="/meter">Счетчики</Link>
          </Menu.Item>
          <Menu.Item key="/meter-type" icon={<TrophyOutlined/>}>
            <Link to="/meter-type">Типы счетчиков</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="client" icon={<FunctionOutlined/>}>
          <Link to="/client">Клиенты</Link>
        </Menu.Item>
        <Menu.Item key="/stock" icon={<DollarCircleOutlined/>}>
          <Link to="/stock">Склад</Link>
        </Menu.Item>
        <Menu.Item key="/shipment" icon={<DollarCircleOutlined/>}>
          <Link to="/shipment">Отгрузки</Link>
        </Menu.Item>

        <SubMenu key="05" icon={<TrophyOutlined/>} title="Закупки">
          <Menu.Item key="/purchase" icon={<FunctionOutlined/>}>
            <Link to="/purchase">Заказы на закупки</Link>
          </Menu.Item>
          <Menu.Item key="/product-batch" icon={<FunctionOutlined/>}>
            <Link to="/product-batch">Партии товаров</Link>
          </Menu.Item>
          <Menu.Item key="/acceptance" icon={<AccountBookOutlined/>}>
            <Link to="/acceptance">Приемка товаров</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="06" icon={<TrophyOutlined/>} title="Движение товаров">
          <Menu.Item key="/product-movement" icon={<AccountBookOutlined/>}>
            <Link to="/product-movement">На производстве</Link>
          </Menu.Item>
          <Menu.Item key="/product-movement-history" icon={<UploadOutlined/>}>
            <Link to="/product-movement-history">История</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/output" icon={<AccountBookOutlined/>}>
          <Link to="/output">Выпуски продукции</Link>
        </Menu.Item>
        <Menu.Item key="/unit" icon={<FunctionOutlined/>}>
          <Link to="/unit">Единицы измерения</Link>
        </Menu.Item>

        <SubMenu key="07" icon={<TrophyOutlined/>} title="Трансформации">
          <Menu.Item key="/transformation-record" icon={<FunctionOutlined/>}>
            <Link to="/transformation-record">Записи трансформаций</Link>
          </Menu.Item>
          <Menu.Item key="/transformation" icon={<FunctionOutlined/>}>
            <Link to="/transformation">Трансформации</Link>
          </Menu.Item>
          <Menu.Item key="/transformation-step" icon={<FunctionOutlined/>}>
            <Link to="/transformation-step">Шаги трансформаций</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}