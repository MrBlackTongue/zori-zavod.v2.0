import React from 'react';
import {Route, Routes} from 'react-router-dom';
import PageHome from '../../pages/PageHome/PageHome';
import PageEmployees from '../../pages/PageEmployees/PageEmployees';
import PageOperations from '../../pages/PageOperations/PageOperations';
import PageProducts from '../../pages/PageProducts/PageProducts';
import PageOutputs from '../../pages/PageOutputs/PageOutputs';
import PageUnits from '../../pages/PageUnits/PageUnits';
import PagePurchases from "../../pages/PagePurchases/PagePurchases";
import PageClients from "../../pages/PageClients/PageClients";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageHome/>}/>
      <Route path="/employees" element={<PageEmployees/>}/>
      <Route path="/operations" element={<PageOperations/>}/>
      <Route path="/products" element={<PageProducts/>}/>
      <Route path="/outputs" element={<PageOutputs/>}/>
      <Route path="/units" element={<PageUnits/>}/>
      <Route path="/purchases" element={<PagePurchases/>}/>
      <Route path="/clients" element={<PageClients/>}/>
    </Routes>
  );
};

export default AppRoutes;
