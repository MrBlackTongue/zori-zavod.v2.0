import React, {useState} from 'react';
import './App.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Button, Layout, Space, theme,} from 'antd';
import {MenuMain} from "./components/MenuMain/MenuMain";
import {ContentRoutes} from "./components/ContentRoutes/ContentRoutes";
import {useNavigate} from "react-router-dom";

function App() {
  const {Header, Sider, Content} = Layout;
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {token: {colorBgContainer}} = theme.useToken();

  const handleAccount = () => {
    navigate('/account');
  };

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
          <Header style={{ display: "flex", flexDirection: 'row', padding: '20px 30px ',
            justifyContent: 'space-between',alignContent: 'center' , background: colorBgContainer}}>
            {/*/!*<Title level={3}>Заголовок</Title>*!/ // Для личного кабинета и так далее*/}
              <img src="/images/header_logo.png" alt="Logo" className='logo'/>
              <Space>
            <Button type='default' className='Account-button' onClick={handleAccount}>Личный кабинет</Button>
              </Space>
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