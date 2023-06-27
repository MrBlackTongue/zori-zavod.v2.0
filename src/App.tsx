import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './App.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, theme} from 'antd';
import {MenuMain} from "./components/MenuMain/MenuMain";
import {ContentRoutes} from "./components/ContentRoutes/ContentRoutes";

const {Header, Sider, Content} = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {token: {colorBgContainer}} = theme.useToken();


  useEffect(() => {
    if (location.pathname === '/operation-accounting') {
      setCollapsed(true);
    } else {
      setCollapsed(false)
    }
  }, [location]);

  return (
    <div>
      <Layout>
        <Sider
          style={{position: 'fixed', height: '100vh', zIndex: 1}}
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          theme="light"
        >
          {/*<div className="logo" />*/}
          <Header style={{padding: 0, background: colorBgContainer}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <MenuMain/>
        </Sider>
        <Layout className="site-layout" style={{marginLeft: collapsed ? 80 : 240}}>
          <Header style={{padding: 0, background: colorBgContainer}}>
            {/*<Title level={3}></Title>*/}
          </Header>
          <Content className='context-style'>
            <ContentRoutes/>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;