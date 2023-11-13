import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLanding } from '../../components/pages/PageLanding/PageLanding';
import { PageLogin } from '../../components/pages/PageLogin/PageLogin';
import { PageRate } from '../../components/pages/PageRate/PageRate';
import App from '../../App';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLanding />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/rate" element={<PageRate />} />
      <Route path="/*" element={<App />} />
    </Routes>
  );
};
