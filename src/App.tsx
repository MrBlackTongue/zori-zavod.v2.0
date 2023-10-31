import React, { useCallback, useState } from 'react';
import './App.css';
import { Layout, theme } from 'antd';
import { MenuMain } from './components/MenuMain/MenuMain';
import { MenuUser } from './components/MenuUser/MenuUser';
import { TabsComponent } from './components/TabsComponent/TabsComponent'; // import { ContentRoutes } from './components/ContentRoutes/ContentRoutes';
import { ContentRoutes } from './components/ContentRoutes/ContentRoutes';
import { useLocation } from 'react-router-dom';

function App() {
  const { Header, Content, Footer } = Layout;
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('');

  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Проверка, есть ли на конце URL цифры
  const isDetailPage = /\/\d+$/.test(location.pathname);

  const memoizedSetSelectedMenuKey = useCallback((key: string) => {
    setSelectedMenuKey(key);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="app-header" style={{ background: colorBgContainer }}>
        <a href="/" rel="noopener noreferrer" className="logo-container">
          <img
            src="/images/header_logo.png"
            alt="Logo"
            className="logo-header"
          />
          <p className="logo-beta">beta</p>
        </a>
        <MenuMain
          selectedMenuKey={selectedMenuKey}
          onMenuKeyChange={memoizedSetSelectedMenuKey}
        />
        <MenuUser />
      </Header>
      <Content className="app-content">
        {!isDetailPage && <TabsComponent selectedMenuKey={selectedMenuKey} />}
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
