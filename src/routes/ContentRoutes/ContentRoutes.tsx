import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  CLIENT,
  ITEMS,
  MATERIAL,
  PRODUCT,
  PURCHASE,
  STOCK,
  STOCK_ADJUSTMENT,
} from '../../api';
import { ClientFormContainer } from '../../components/pages/Client/ClientForm/ClientForm.container';
import { MaterialFormContainer } from '../../components/pages/Material/MaterialForm/MaterialForm.container';
import { PurchaseFormContainer } from '../../components/pages/Purchase/PurchaseForm/PurchaseForm.container';
import { ProductFormContainer } from '../../components/pages/Product/ProductForm/ProductForm.container';
import { StockAdjustmentFormContainer } from '../../components/pages/StockAdjustment/StockAdjustmentForm/StockAdjustmentForm.container';
import { LoadingAndSavingProvider } from '../../contexts/LoadingAndSavingContext';

export const ContentRoutes: React.FC = () => {
  return (
    <LoadingAndSavingProvider>
      <Routes>
        {/*<Route path={`${SUBSCRIPTION}`} element={<PageSubscription />} />*/}
        <Route path={`${CLIENT}/:id?`} element={<ClientFormContainer />} />
        <Route path={`${PURCHASE}/:id?`} element={<PurchaseFormContainer />} />
        <Route
          path={`${ITEMS}${PRODUCT}/:id?`}
          element={<ProductFormContainer />}
        />
        <Route
          path={`${ITEMS}${MATERIAL}/:id?`}
          element={<MaterialFormContainer />}
        />
        <Route
          path={`${STOCK}${STOCK_ADJUSTMENT}/:id?`}
          element={<StockAdjustmentFormContainer />}
        />
      </Routes>
    </LoadingAndSavingProvider>
  );
};
