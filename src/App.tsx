import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './App.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, theme} from 'antd';
import {MenuMain} from "./components/MenuMain/MenuMain";
import {AppRoutes} from "./components/AppRoutes/AppRoutes";
import {PageLoginForm} from "./pages/PageLoginForm/PageLoginForm";

const {Header, Sider, Content} = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  useEffect(() => {
    if (location.pathname === '/operation-accounting') {
      setCollapsed(true);
    } else {
      setCollapsed(false)
    }
  }, [location]);

  if (!isLoggedIn) {
    return (
      <div className="login-form-container">
        <PageLoginForm onLogin={() => setIsLoggedIn(true)}/>
      </div>
    )
  }

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
        <Layout className="site-layout" style={{minHeight: '100vh', height: '100vh', overflow: 'auto'}}>
          <Header style={{padding: 0, background: colorBgContainer}}>
            {/*<Title level={3}></Title>*/}
          </Header>
          <Content className='context-style'>
            <AppRoutes/>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;