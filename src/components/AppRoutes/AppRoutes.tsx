import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLanding } from '../../modules/PageLanding/PageLanding';
import { PageLogin } from '../../modules/PageLogin/PageLogin';
import { PageRate } from '../../modules/PageRate/PageRate';
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
