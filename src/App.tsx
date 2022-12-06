import React from 'react';
import './App.css';
import {Layout} from "antd";
import Menu from "./layout/modules/menu/menu";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content
            <header className="App-header">
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              Learn React
            </header>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
