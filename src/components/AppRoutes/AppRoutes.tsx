import React from 'react';
import {Route, Routes} from 'react-router-dom';
// import {PageHome} from "../../pages/PageHome/PageHome";
import {PageLoginForm} from "../../pages/PageLoginForm/PageLoginForm";
import App from "../../App";
import {PageRegistration} from "../../pages/PageRegistration/PageRegistration";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/*<Route path="/" element={<PageHome/>}/>*/}
      <Route path="/" element={<PageLoginForm/>}/>
      <Route path="/login" element={<PageLoginForm/>}/>
      <Route path="/registration" element={<PageRegistration/>}/>
      <Route path="/*" element={<App/>}/>
    </Routes>
  );
};