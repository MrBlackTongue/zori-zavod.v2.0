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
import {PageProductMovementHistory} from "../../pages/PageProductMovementHistory/PageProductMovementHistory";
import {PageAcceptance} from "../../pages/PageAcceptance/PageAcceptance";
import {PageOperationAccounting} from "../../pages/PageOperationAccounting/PageOperationAccounting";
import {PageStock} from "../../pages/PageStock/PageStock";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageHome/>}/>
      <Route path="/employee" element={<PageEmployee/>}/>
      <Route path="/operation" element={<PageOperation/>}/>
      <Route path="/product" element={<PageProduct/>}/>
      <Route path="/output" element={<PageOutput/>}/>
      <Route path="/unit" element={<PageUnit/>}/>
      <Route path="/purchase" element={<PagePurchase/>}/>
      <Route path="/client" element={<PageClient/>}/>
      <Route path="/product-batch" element={<PageProductBatch/>}/>
      <Route path="/product-movement-history" element={<PageProductMovementHistory/>}/>
      <Route path="/acceptance" element={<PageAcceptance/>}/>
      <Route path="/operation-accounting" element={<PageOperationAccounting/>}/>
      <Route path="/Stock" element={<PageStock/>}/>
    </Routes>
  );
};