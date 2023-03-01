import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../home/home';
import PageEmployees from '../employees/pageEmployees';
import PageOperations from '../operations/pageOperations';
import PageProducts from '../product/pageProducts';
import PageOutputs from '../output/pageOutputs';
import PageUnits from '../unit/pageUnits';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/employees" element={<PageEmployees/>}/>
      <Route path="/operations" element={<PageOperations/>}/>
      <Route path="/products" element={<PageProducts/>}/>
      <Route path="/outputs" element={<PageOutputs/>}/>
      <Route path="/units" element={<PageUnits/>}/>
    </Routes>
  );
};

export default AppRoutes;
