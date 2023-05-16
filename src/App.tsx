// import './App.css';
// import React, {useState} from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
// } from '@ant-design/icons';
// import {Layout, theme} from 'antd';
// import {MenuMain} from "./components/MenuMain/MenuMain";
// import {AppRoutes} from "./components/AppRoutes/AppRoutes";
//
// const {Header, Sider, Content} = Layout;
//
// function App() {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: {colorBgContainer},
//   } = theme.useToken();
//
//   return (
//     <div>
//       <Layout>
//         <Sider trigger={null} collapsible collapsed={collapsed} width={240} theme="light">
//           {/*<div className="logo" />*/}
//           <Header style={{padding: 0, background: colorBgContainer}}>
//             {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//               className: 'trigger',
//               onClick: () => setCollapsed(!collapsed),
//             })}
//           </Header>
//           <MenuMain/>
//         </Sider>
//         <Layout className="site-layout" style={{ minHeight: '100vh', height: '100vh', overflow: 'auto' }}>
//           {/*<Header style={{padding: 0, background: colorBgContainer}}>*/}
//             {/*<Title level={3}></Title>*/}
//           {/*</Header>*/}
//           <Content className='context-style'>
//             <AppRoutes/>
//           </Content>
//         </Layout>
//       </Layout>
//     </div>
//   );
// }
//
// export default App;




import './App.css';
import React, {useState} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, theme} from 'antd';
import {MenuMain} from "./components/MenuMain/MenuMain";
import {AppRoutes} from "./components/AppRoutes/AppRoutes";

const {Header, Sider, Content} = Layout;

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
          <MenuMain/>
        </Sider>
        <Layout className="site-layout" style={{ minHeight: '100vh', height: '100vh', overflow: 'auto' }}>
          <Header style={{padding: 0, background: colorBgContainer}}>
            {/*<Title level={3}></Title>*/}
          </Header>
          <Content className='context-style'>
            <AppRoutes/>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;