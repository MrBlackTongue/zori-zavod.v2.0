import React, {useCallback, useState} from 'react';
import './App.css';
import {Layout} from 'antd';
import {MenuMain} from './components/molecules/MenuMain/MenuMain';
import {MenuUser} from './components/molecules/MenuUser/MenuUser';
import {TabsComponent} from './components/molecules/TabsComponent/TabsComponent';
import {ContentRoutes} from './routes/ContentRoutes/ContentRoutes';
import {useLocation} from 'react-router-dom';
import {menuKeyToRoutes} from './components/molecules/TabsComponent/menuKeyToRoutes'; // Извлекаем все пути из menuKeyToRoutes

// Извлекаем все пути из menuKeyToRoutes
const allPathsToShowTabs = Object.values(menuKeyToRoutes)
  .flat()
  .map(routeInfo => routeInfo.route.props.path);

function App() {
  const { Header, Content, Footer } = Layout;
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('');

  const location = useLocation();

  // Проверка, нужно ли показывать TabsComponent на текущей странице
  const shouldShowTabs = allPathsToShowTabs.includes(location.pathname);

  const memoizedSetSelectedMenuKey = useCallback((key: string) => {
    setSelectedMenuKey(key);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="app-header">
        <a href="/" rel="noopener noreferrer" className="logo-container">
          <img
            src="/src/assets/images/header_logo_dark_montserrat.png"
            alt="beta"
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
        {shouldShowTabs && <TabsComponent selectedMenuKey={selectedMenuKey} />}
        <ContentRoutes />
      </Content>
      <Footer className="app-footer">
        Email: svetlana@zolotenkov.ru
        <p>© Zolotenkov 2022-2023</p>
      </Footer>
    </Layout>
  );
}

export default App;
