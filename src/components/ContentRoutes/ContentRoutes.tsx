import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageEmployee } from '../../pages/PageEmployee/PageEmployee';
import { PageOperation } from '../../pages/PageOperation/PageOperation';
import { PageProduct } from '../../pages/PageProduct/PageProduct';
import { PageOutput } from '../../pages/PageOutput/PageOutput';
import { PageUnit } from '../../pages/PageUnit/PageUnit';
import { PagePurchase } from '../../pages/PagePurchase/PagePurchase';
import { PageClient } from '../../pages/PageClient/PageClient';
import { PageProductBatch } from '../../pages/PageProductBatch/PageProductBatch';
import { PageProductMovementHistory } from '../../pages/PageProductMovementHistory/PageProductMovementHistory';
import { PageShipment } from '../../pages/PageShipment/PageShipment';
import { PageAcceptance } from '../../pages/PageAcceptance/PageAcceptance';
import { PageOperationAccounting } from '../../pages/PageOperationAccounting/PageOperationAccounting';
import { PageOperationAccountingDetail } from '../../pages/PageOperationAccountingDetail/PageOperationAccountingDetail';
import { PageStock } from '../../pages/PageStock/PageStock';
import { PageProductionType } from '../../pages/PageProductionType/PageProductionType';
import { PageProductGroup } from '../../pages/PageProductGroup/PageProductGroup';
import { PageMeterType } from '../../pages/PageMeterType/PageMeterType';
import { PageMeter } from '../../pages/PageMeter/PageMeter';
import { PageMeterRecord } from '../../pages/PageMeterRecord/PageMeterRecord';
import { PageProductReport } from '../../pages/PageProductReport/PageProductReport';
import { PageOutputReport } from '../../pages/PageOutputReport/PageOutputReport';
import { PageOperationReport } from '../../pages/PageOperationReport/PageOperationReport';
import { PageEmployeeReport } from '../../pages/PageEmployeeReport/PageEmployeeReport';
import { PageCostPriceReport } from '../../pages/PageCostPriceReport/PageCostPriceReport';
import { PageWriteOff } from '../../pages/PageWriteOff/PageWriteOff';
import { PageSubscription } from '../../pages/PageSubscription/PageSubscription';
import { PageEstimatedPrice } from '../../pages/PageEstimatedPrice/PageEstimatedPrice';
import { PageStoragePlace } from '../../pages/PageStoragePlace/PageStoragePlace';
import {
  ACCEPTANCE,
  BATCH,
  CLIENT,
  COST_PRICE,
  EMPLOYEE,
  ESTIMATED_PRICE,
  HISTORY,
  METER,
  METER_RECORD,
  METER_TYPE,
  OPERATION,
  OPERATION_ACCOUNTING,
  OUTPUT,
  PRODUCT,
  PRODUCT_GROUP,
  PRODUCT_MOVEMENT,
  PRODUCTION_TYPE,
  PURCHASE,
  REPORT,
  SHIPMENT,
  STOCK,
  STORAGE_PLACE,
  SUBSCRIPTION,
  UNIT,
  WRITE_OFF,
} from '../../services';

export const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={EMPLOYEE} element={<PageEmployee />} />
      <Route path={OPERATION} element={<PageOperation />} />
      <Route path={PRODUCT} element={<PageProduct />} />
      <Route path={OUTPUT} element={<PageOutput />} />
      <Route path={UNIT} element={<PageUnit />} />
      <Route path={PURCHASE} element={<PagePurchase />} />
      <Route path={CLIENT} element={<PageClient />} />
      <Route path={`${PRODUCT}${BATCH}`} element={<PageProductBatch />} />
      <Route
        path={`${PRODUCT_MOVEMENT}${HISTORY}`}
        element={<PageProductMovementHistory />}
      />
      <Route path={ACCEPTANCE} element={<PageAcceptance />} />
      <Route
        path={OPERATION_ACCOUNTING}
        element={<PageOperationAccounting />}
      />
      <Route
        path={`${OPERATION_ACCOUNTING}/:id/detail`}
        element={<PageOperationAccountingDetail />}
      />
      <Route path={STOCK} element={<PageStock />} />
      <Route path={SHIPMENT} element={<PageShipment />} />
      <Route path={PRODUCTION_TYPE} element={<PageProductionType />} />
      <Route path={PRODUCT_GROUP} element={<PageProductGroup />} />
      <Route path={METER_TYPE} element={<PageMeterType />} />
      <Route path={METER} element={<PageMeter />} />
      <Route path={METER_RECORD} element={<PageMeterRecord />} />
      <Route path={`${REPORT}${PRODUCT}`} element={<PageProductReport />} />
      <Route path={`${REPORT}${OUTPUT}`} element={<PageOutputReport />} />
      <Route path={`${REPORT}${OPERATION}`} element={<PageOperationReport />} />
      <Route path={`${REPORT}${EMPLOYEE}`} element={<PageEmployeeReport />} />
      <Route
        path={`${REPORT}${COST_PRICE}`}
        element={<PageCostPriceReport />}
      />
      <Route path={WRITE_OFF} element={<PageWriteOff />} />
      <Route path={SUBSCRIPTION} element={<PageSubscription />} />
      <Route path={ESTIMATED_PRICE} element={<PageEstimatedPrice />} />
      <Route path={STORAGE_PLACE} element={<PageStoragePlace />} />
    </Routes>
  );
};
