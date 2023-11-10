import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageOperationAccountingDetail } from '../../modules/PageOperationAccountingDetail/PageOperationAccountingDetail';
import {
  CLIENT,
  EMPLOYEE,
  OPERATION_ACCOUNTING,
  SUBSCRIPTION,
} from '../../services';
import { PageSubscription } from '../../modules/PageSubscription/PageSubscription';
import { EmployeeFormContainer } from '../../modules/Employee/EmployeeForm/EmployeeForm.container';
import { ClientFormContainer } from '../../modules/Client/ClientForm/ClientForm.container';

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
    </Routes>
  );
};
