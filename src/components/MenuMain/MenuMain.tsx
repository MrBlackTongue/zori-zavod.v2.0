import React, {useState} from 'react';
import {Menu} from 'antd';
import {Link, useLocation} from "react-router-dom";
import {
  ScheduleOutlined,
  ProjectOutlined,
  DatabaseOutlined,
  AppstoreAddOutlined,
  FormOutlined,
  TranslationOutlined,
  BulbOutlined,
  TeamOutlined,
  RightOutlined,
  SnippetsOutlined,
  CalendarOutlined,
  LogoutOutlined,
  SolutionOutlined,
  OrderedListOutlined,
  SlidersOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  BookOutlined,
  ContactsOutlined,
  ControlOutlined,
  ClusterOutlined,
  ReconciliationOutlined,
  TableOutlined,
  FundOutlined,
  DownSquareOutlined,
  RetweetOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

export const MenuMain: React.FC = () => {

  const subMenuRoutes = {
    "01": ["/operation-accounting", "/operation", "/production-type"],
    "02": ["/operation-report", "/output-report", "/product-report", "/employee-report", '/cost-report'],
    "03": ["/product", "/product-group"],
    "04": ["/meter-record", "/meter", "/meter-type"],
    "05": ["/purchase", "/product-batch", "/acceptance"],
    "06": ["/stock", "/write-off", "/storage-place"],
    "07": ["/estimated-price"],
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
        onSelect={({key}) => {
          if (!Object.values(subMenuRoutes).flat().includes(key)) {
            setOpenKeys([]);
          }
        }}
      >
        <Menu.Item key="/employee" icon={<TeamOutlined/>}>
          <Link to="/employee">Сотрудники</Link>
        </Menu.Item>

        <Menu.Item key="/work-hours" icon={<TeamOutlined/>}>
          <Link to="/work-hours">Табель учёта рабочего времени</Link>
        </Menu.Item>

        <SubMenu key="01" icon={<RightOutlined/>} title="Операции">
          <Menu.Item key="/operation-accounting" icon={<FormOutlined/>}>
            <Link to="/operation-accounting">Учет операций</Link>
          </Menu.Item>
          <Menu.Item key="/operation" icon={<OrderedListOutlined/>}>
            <Link to="/operation">Типы операций</Link>
          </Menu.Item>
          <Menu.Item key="/production-type" icon={<SlidersOutlined/>}>
            <Link to="/production-type">Типы производства</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="02" icon={<RightOutlined/>} title="Отчеты">
          <Menu.Item key="/operation-report" icon={<ReconciliationOutlined/>}>
            <Link to="/operation-report">По операциям</Link>
          </Menu.Item>
          <Menu.Item key="/output-report" icon={<ProjectOutlined/>}>
            <Link to="/output-report">По выпускам</Link>
          </Menu.Item>
          <Menu.Item key="/product-report" icon={<TableOutlined/>}>
            <Link to="/product-report">По товарам</Link>
          </Menu.Item>
          <Menu.Item key="/employee-report" icon={<SnippetsOutlined/>}>
            <Link to="/employee-report">По сотрудникам</Link>
          </Menu.Item>
          <Menu.Item key="/cost-report" icon={<FundOutlined/>}>
            <Link to="/cost-report">По себестоимости</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="03" icon={<RightOutlined/>} title="Товары">
          <Menu.Item key="/product" icon={<AppstoreOutlined/>}>
            <Link to="/product">Товары</Link>
          </Menu.Item>
          <Menu.Item key="/product-group" icon={<ApartmentOutlined/>}>
            <Link to="/product-group">Группы товаров</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="04" icon={<RightOutlined/>} title="Счетчики">
          <Menu.Item key="/meter-record" icon={<BookOutlined/>}>
            <Link to="/meter-record">Записи счетчиков</Link>
          </Menu.Item>
          <Menu.Item key="/meter" icon={<BulbOutlined/>}>
            <Link to="/meter">Счетчики</Link>
          </Menu.Item>
          <Menu.Item key="/meter-type" icon={<ControlOutlined/>}>
            <Link to="/meter-type">Типы счетчиков</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/client" icon={<SolutionOutlined/>}>
          <Link to="/client">Клиенты</Link>
        </Menu.Item>

        <SubMenu key="06" icon={<RightOutlined/>} title="Склад">
          <Menu.Item key="/stock" icon={<DatabaseOutlined/>}>
            <Link to="/stock">Склад</Link>
          </Menu.Item>
          <Menu.Item key="/write-off" icon={<ArrowDownOutlined/>}>
            <Link to="/write-off">Списание</Link>
          </Menu.Item>
          <Menu.Item key="/storage-place" icon={<DownSquareOutlined/>}>
            <Link to="/storage-place">Место хранения</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/shipment" icon={<ContactsOutlined/>}>
          <Link to="/shipment">Отгрузки</Link>
        </Menu.Item>

        <SubMenu key="05" icon={<RightOutlined/>} title="Закупки">
          <Menu.Item key="/purchase" icon={<AppstoreAddOutlined/>}>
            <Link to="/purchase">Заказы на закупки</Link>
          </Menu.Item>
          <Menu.Item key="/product-batch" icon={<ClusterOutlined/>}>
            <Link to="/product-batch">Партии товаров</Link>
          </Menu.Item>
          <Menu.Item key="/acceptance" icon={<ScheduleOutlined/>}>
            <Link to="/acceptance">Приемка товаров</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="07" icon={<RightOutlined/>} title="Себестоимость">
          <Menu.Item key="/estimated-price" icon={<RetweetOutlined/>}>
            <Link to="/estimated-price">Расчетные цены</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/product-movement-history" icon={<CalendarOutlined/>}>
          <Link to="/product-movement-history">История товаров</Link>
        </Menu.Item>

        <Menu.Item key="/output" icon={<LogoutOutlined/>}>
          <Link to="/output">Выпуски продукции</Link>
        </Menu.Item>

        <Menu.Item key="/unit" icon={<TranslationOutlined/>}>
          <Link to="/unit">Единицы измерения</Link>
        </Menu.Item>

      </Menu>
    </div>
  )
}