import './App.css';
import React, {useState} from 'react';
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
import {Layout, Menu, theme, Typography} from 'antd';
import {Routes, Route} from 'react-router-dom';
import Home from "../src/layout/modules/home/home";
import Employees from "./layout/modules/employees/employees";
import Operation from "../src/layout/modules/operation/operation";
import Unit from "../src/layout/modules/unit/unit";
import {Link} from "react-router-dom";

const {Header, Sider, Content} = Layout;
const {Title} = Typography;


function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width={240} theme="light">
          {/*<div className="logo" />*/}
          <Header style={{padding: 0, background: colorBgContainer}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Menu
            theme="light"
            mode="inline"
            // defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <Link to='/employees'><TeamOutlined/></Link>,
                label: 'Сотрудники',
              },
              {
                key: '2',
                icon: <Link to='/operation'><UnorderedListOutlined/></Link>,
                label: 'Типы операций',
              },
              {
                key: '3',
                icon: <PicLeftOutlined/>,
                label: 'Учет операций',
              },
              {
                key: '4',
                icon: <FormOutlined/>,
                label: 'Отчет по операциям',
              },
              {
                key: '5',
                icon: <CopyOutlined/>,
                label: 'Отчет по выпускам',
              },
              {
                key: '6',
                icon: <UploadOutlined/>,
                label: 'Продукты',
              },
              {
                key: '7',
                icon: <TrophyOutlined/>,
                label: 'Выпуск продукции',
              },
              {
                key: '8',
                icon: <DatabaseOutlined/>,
                label: 'Типы расходов',
              },
              {
                key: '9',
                icon: <DollarCircleOutlined/>,
                label: 'Расходы по выпускам',
              },
              {
                key: '10',
                icon: <AccountBookOutlined/>,
                label: 'Расходы по операциям',
              },
              {
                key: '11',
                icon: <Link to='/unit'><FunctionOutlined/></Link>,
                label: 'Единицы измерения',
              },
            ]}
          >
            <Menu.Item>
              <Link to='/'>Home</Link>
              <TeamOutlined/>
              'Сотрудники'
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{padding: 0, background: colorBgContainer}}>
            {/*<Title level={3}></Title>*/}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: '8px',
            }}
          >
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/employees' element={<Employees/>}/>
              <Route path='/operation' element={<Operation/>}/>
              <Route path='/unit' element={<Unit/>}/>
            </Routes>

          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
