import React from 'react';
import './App.css';
import { Layout, theme } from 'antd';
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
      <Header className="app-header" style={{ background: colorBgContainer }}>
        <a href="/" rel="noopener noreferrer" className="logo-container">
          <img
            src="/images/header_logo.png"
            alt="Logo"
            className="logo-header"
          />
          <p className="logo-beta">beta</p>
        </a>
        <MenuMain />
        <MenuUser />
      </Header>
      <Content className="app-content">
        <ContentRoutes />
      </Content>
      <Footer className="app-footer">
        <p>Email: svetlana@zolotenkov.ru</p>
        <p>© Zolotenkov 2022-2023</p>
      </Footer>
    </Layout>
  );
}

export default App;
