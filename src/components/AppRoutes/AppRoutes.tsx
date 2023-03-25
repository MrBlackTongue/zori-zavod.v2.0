import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {PageHome} from "../../pages/PageHome/PageHome";
import {PageEmployee} from "../../pages/PageEmployee/PageEmployee";
import {PageOperation} from "../../pages/PageOperation/PageOperation";
import {PageProduct} from "../../pages/PageProduct/PageProduct";
import {PageOutput} from "../../pages/PageOutput/PageOutput";
import {PageUnit} from "../../pages/PageUnit/PageUnit";
import {PagePurchase} from "../../pages/PagePurchase/PagePurchase";
import {PageClient} from "../../pages/PageClient/PageClient";
import {PageProductBatch} from "../../pages/PageProductBatch/PageProductBatch";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageHome/>}/>
      <Route path="/employees" element={<PageEmployee/>}/>
      <Route path="/operations" element={<PageOperation/>}/>
      <Route path="/products" element={<PageProduct/>}/>
      <Route path="/outputs" element={<PageOutput/>}/>
      <Route path="/units" element={<PageUnit/>}/>
      <Route path="/purchases" element={<PagePurchase/>}/>
      <Route path="/clients" element={<PageClient/>}/>
      <Route path="/product-batch" element={<PageProductBatch/>}/>
    </Routes>
  );
};