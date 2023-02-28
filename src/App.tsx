import './App.css';
import React, {useState} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, theme} from 'antd';
import {Routes, Route} from 'react-router-dom';
import Home from "../src/layout/modules/home/home";
import PageEmployees from "./layout/modules/employees/pageEmployees";
import PageOperations from "./layout/modules/operations/pageOperations";
import PageUnits from "./layout/modules/unit/pageUnits";
import PageOutputs from "./layout/modules/output/pageOutputs";
import PageProducts from "./layout/modules/product/pageProducts";
import MenuMain from "./layout/modules/menuMain/menuMain";

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
          <MenuMain/>
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
