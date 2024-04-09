import React, { useCallback, useState } from 'react';
import './App.css';
import { Layout } from 'antd';
import { MainMenu } from './components/molecules/MainMenu/MainMenu';
import { UserMenu } from './components/molecules/UserMenu/UserMenu';
import { NavigationTabs } from './components/molecules/NavigationTabs/NavigationTabs';
import { ContentRoutes } from './routes/ContentRoutes/ContentRoutes';
import { useLocation } from 'react-router-dom';
import { menuKeyToRoutes } from './components/molecules/NavigationTabs/menuKeyToRoutes';
import headerLogoDarkMontserrat from 'assets/images/header_logo_dark_montserrat.png';
import { WORK_HOURS } from './api';

// Извлекаем все пути из menuKeyToRoutes
const allPathsToShowTabs = Object.values(menuKeyToRoutes)
  .flat()
  .map(routeInfo => routeInfo.route.props.path);

function App() {
  const { Header, Content, Footer } = Layout;
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('');

  const location = useLocation();

  // Проверка, нужно ли показывать NavigationTabs на текущей странице
  const shouldShowTabs = allPathsToShowTabs.includes(location.pathname);

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
        {shouldShowTabs && <NavigationTabs selectedMenuKey={selectedMenuKey} />}
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
