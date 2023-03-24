import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {
  PageClients,
  PageEmployees,
  PageHome,
  PageOperations,
  PageOutputs,
  PageProducts,
  PagePurchases,
  PageUnits,
  PageProductMovementHistory,
  PageProductBatch,
} from '../../pages';

export const AppRoutes: React.FC = () => {
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
      <Route path="/product-movement-history" element={<PageProductMovementHistory/>}/>
      <Route path="/product-batch" element={<PageProductBatch/>}/>
    </Routes>
  );
};