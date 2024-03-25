import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageOperationAccountingDetail } from '../../components/pages/PageOperationAccountingDetail/PageOperationAccountingDetail';
import {
  CLIENT,
  EMPLOYEE,
  MATERIAL,
  OPERATION_ACCOUNTING,
  PRODUCT,
  PURCHASE,
  SUBSCRIPTION,
  WRITE_OFF,
} from '../../api';
import { PageSubscription } from '../../components/pages/PageSubscription/PageSubscription';
import { EmployeeFormContainer } from '../../components/pages/Employee/EmployeeForm/EmployeeForm.container';
import { ClientFormContainer } from '../../components/pages/Client/ClientForm/ClientForm.container';
import { MaterialFormContainer } from '../../components/pages/Material/MaterialForm/MaterialForm.container';
import { PurchaseFormContainer } from '../../components/pages/Purchase/PurchaseForm/PurchaseForm.container';
import { ProductFormContainer } from '../../components/pages/Product/ProductForm/ProductForm.container';
import { WriteOffFormContainer } from '../../components/pages/WriteOff/WriteOffForm/WriteOffForm.container';

export const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={`${SUBSCRIPTION}`} element={<PageSubscription />} />
      <Route
        path={`${OPERATION_ACCOUNTING}/:id`}
        element={<PageOperationAccountingDetail />}
      />
      <Route path={`${EMPLOYEE}/:id?`} element={<EmployeeFormContainer />} />
      <Route path={`${CLIENT}/:id?`} element={<ClientFormContainer />} />
      <Route path={`${PURCHASE}/:id?`} element={<PurchaseFormContainer />} />
      <Route path={`${PRODUCT}/:id?`} element={<ProductFormContainer />} />
      <Route path={`${MATERIAL}/:id?`} element={<MaterialFormContainer />} />
      <Route path={`${WRITE_OFF}/:id?`} element={<WriteOffFormContainer />} />
    </Routes>
  );
};
