import './App.css';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
  PicLeftOutlined,
  FormOutlined,
  TeamOutlined,
  CopyOutlined,
  FunctionOutlined,
  DollarCircleOutlined,
  AccountBookOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width={240}>
          {/*<div className="logo" />*/}
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <TeamOutlined />,
                label: 'Сотрудники',
              },
              {
                key: '2',
                icon: <UnorderedListOutlined />,
                label: 'Типы операций',
              },
              {
                key: '3',
                icon:  <PicLeftOutlined />,
                label: 'Учет операций',
              },
              {
                key: '4',
                icon: <FormOutlined />,
                label: 'Отчет по операциям',
              },
              {
                key: '5',
                icon:  <CopyOutlined />,
                label: 'Отчет по выпускам',
              },
              {
                key: '6',
                icon: <UploadOutlined />,
                label: 'Продукты',
              },
              {
                key: '7',
                icon:  <TrophyOutlined />,
                label: 'Выпуск продукции',
              },
              {
                key: '8',
                icon:  <DatabaseOutlined />,
                label: 'Типы расходов',
              },
              {
                key: '9',
                icon:  <DollarCircleOutlined />,
                label: 'Расходы по выпускам',
              },
              {
                key: '10',
                icon:  <AccountBookOutlined />,
                label: 'Расходы по операциям',
              },
              {
                key: '11',
                icon:  <FunctionOutlined />,
                label: 'Единицы измерения',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
             Это Зори Завод!
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
