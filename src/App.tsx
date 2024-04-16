import React, { useCallback, useState } from 'react';
import './App.css';
import { Layout } from 'antd';
import { MainMenu } from './components/molecules/MainMenu/MainMenu';
import { UserMenu } from './components/molecules/UserMenu/UserMenu';
import { MainTabs } from './components/molecules/NavigationTabs/MainTabs';
import { ContentRoutes } from './routes/ContentRoutes/ContentRoutes';
import headerLogoDarkMontserrat from 'assets/images/header_logo_dark_montserrat.png';
import { WORK_HOURS } from './api';

function App() {
  const { Header, Content, Footer } = Layout;
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('');

  const memoizedSetSelectedMenuKey = useCallback((key: string) => {
    setSelectedMenuKey(key);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="app-header">
        <a
          href={WORK_HOURS}
          rel="noopener noreferrer"
          className="logo-container">
          <img
            src={headerLogoDarkMontserrat}
            alt="beta"
            className="logo-header"
          />
          <p className="logo-beta">beta</p>
        </a>
        <MainMenu
          selectedMenuKey={selectedMenuKey}
          onMenuKeyChange={memoizedSetSelectedMenuKey}
        />
        <UserMenu />
      </Header>
      <Content className="app-content">
        <MainTabs selectedMenuKey={selectedMenuKey} />
        <ContentRoutes />
      </Content>
      <Footer className="app-footer">
        Email: svetlana@zolotenkov.ru
        <p>© Zolotenkov 2022-2024</p>
      </Footer>
    </Layout>
  );
}

export default App;
