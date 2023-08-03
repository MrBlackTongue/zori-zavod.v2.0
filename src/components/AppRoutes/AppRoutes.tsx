import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {PageLanding} from "../../pages/PageLanding/PageLanding";
import {PageLoginForm} from "../../pages/PageLoginForm/PageLoginForm";
import App from "../../App";
import {ModalRegistrationForm} from "../../pages/PageLanding/components/ModalRegistrationForm";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLanding/>}/>
      <Route path="/login" element={<PageLoginForm/>}/>
      <Route path="/registration" element={<ModalRegistrationForm/>}/>
      <Route path="/*" element={<App/>}/>
    </Routes>
  );
};