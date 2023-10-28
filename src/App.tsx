import React from 'react';
import './App.css';
import { Layout, Space, theme } from 'antd';
import { MenuMain } from './components/MenuMain/MenuMain';
import { ContentRoutes } from './components/ContentRoutes/ContentRoutes';
import { MenuUser } from './components/MenuUser/MenuUser';

function App() {
  const { Header, Content, Footer } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          // padding: '20px 30px ',
          justifyContent: 'space-between',
          alignContent: 'center',
          background: colorBgContainer,
          height: 75,
        }}>
        {/*<Space className="space-logo" style={{ flexGrow: 1, height: '100%' }}>*/}
        <a href="/" rel="noopener noreferrer" className="logo-container">
          <img
            src="/images/header_logo.png"
            alt="Logo"
            className="logo-header"
          />
          <p className="logo-beta">beta</p>
        </a>
        <MenuMain />
        {/*</Space>*/}
        <Space>
          <MenuUser />
        </Space>
      </Header>
      <Content className="context-style">
        <ContentRoutes />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <p>Email: svetlana@zolotenkov.ru</p>
        <p>© Zolotenkov 2022-2023</p>
      </Footer>
    </Layout>
  );
}

export default App;
