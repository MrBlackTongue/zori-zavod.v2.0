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
import {PageShipment} from "../../pages/PageShipment/PageShipment";
import {PageAcceptance} from "../../pages/PageAcceptance/PageAcceptance";
import {PageOperationAccounting} from "../../pages/PageOperationAccounting/PageOperationAccounting";
import {PageOperationAccountingDetail} from "../../pages/PageOperationAccountingDetail/PageOperationAccountingDetail";
import {PageStock} from "../../pages/PageStock/PageStock";
import {PageProductionType} from "../../pages/PageProductionType/PageProductionType";
import {PageProductGroup} from "../../pages/PageProductGroup/PageProductGroup";
import {PageMeterType} from "../../pages/PageMeterType/PageMeterType";
import {PageMeter} from "../../pages/PageMeter/PageMeter";
import {PageMeterRecord} from "../../pages/PageMeterRecord/PageMeterRecord";
import {PageLoginForm} from "../../pages/PageLoginForm/PageLoginForm";

export const ContentRoutes: React.FC = () => {
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
      <Route path="/operation-accounting/:id/detail" element={<PageOperationAccountingDetail/>}/>
      <Route path="/stock" element={<PageStock/>}/>
      <Route path="/shipment" element={<PageShipment/>}/>
      <Route path="/production-type" element={<PageProductionType/>}/>
      <Route path="/product-group" element={<PageProductGroup/>}/>
      <Route path="/meter-type" element={<PageMeterType/>}/>
      <Route path="/meter" element={<PageMeter/>}/>
      <Route path="/meter-record" element={<PageMeterRecord/>}/>
      <Route path="/login" element={<PageLoginForm/>}/>
    </Routes>
  );
};