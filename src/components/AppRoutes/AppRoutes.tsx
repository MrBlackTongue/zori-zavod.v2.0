import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {PageLanding} from "../../pages/PageLanding/PageLanding";
import {PageLogin} from "../../pages/PageLogin/PageLogin";
import {PageRate} from "../../pages/PageRate/PageRate";
import App from "../../App";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLanding/>}/>
      <Route path="/login" element={<PageLogin/>}/>
      <Route path="/Rate" element={<PageRate/>}/>
      <Route path="/*" element={<App/>}/>
    </Routes>
  );
};