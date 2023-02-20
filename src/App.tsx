import './App.css';
import React, {useState} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
  PicLeftOutlined,
  FormOutlined,
  TeamOutlined,
  CopyOutlined,
  FunctionOutlined,
  DollarCircleOutlined,
  AccountBookOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import {Routes, Route, Link} from 'react-router-dom';
import Home from "../src/layout/modules/home/home";
import PageEmployees from "./layout/modules/employees/pageEmployees";
import PageOperations from "./layout/modules/operations/pageOperations";
import PageUnits from "./layout/modules/unit/pageUnits";
import PageOutputs from "./layout/modules/output/pageOutputs";
import PageProducts from "./layout/modules/product/pageProducts";

const {Header, Sider, Content} = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width={240} theme="light">
          {/*<div className="logo" />*/}
          <Header style={{padding: 0, background: colorBgContainer}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Menu
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
            ]}
          >
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{padding: 0, background: colorBgContainer}}>
            {/*<Title level={3}></Title>*/}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: '8px',
            }}
          >
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/employees' element={<PageEmployees/>}/>
              <Route path='/operations' element={<PageOperations/>}/>
              <Route path='/products' element={<PageProducts/>}/>
              <Route path='/outputs' element={<PageOutputs/>}/>
              <Route path='/units' element={<PageUnits/>}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
