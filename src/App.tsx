import React, {useState} from 'react';
import './App.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, theme,} from 'antd';
import {MenuMain} from "./components/MenuMain/MenuMain";
import {ContentRoutes} from "./components/ContentRoutes/ContentRoutes";

function App() {
  const {Header, Sider, Content} = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const {token: {colorBgContainer}} = theme.useToken();

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
          {/*/!*<div className="logo" />*!/ // Для логотипа на странице*/}
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
            {/*/!*<Title level={3}>Заголовок</Title>*!/ // Для личного кабинета и так далее*/}
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