import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';
import 'dayjs/locale/ru';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ru_RU}>
        <App/>
      </ConfigProvider>;
    </BrowserRouter>
  </React.StrictMode>
);
