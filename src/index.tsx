import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/styles/globals.css';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';
import 'dayjs/locale/ru';
import { AppRoutes } from './routes/AppRoutes/AppRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ru_RU}>
        <AppRoutes />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
