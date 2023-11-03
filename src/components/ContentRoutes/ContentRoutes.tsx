import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageOperationAccountingDetail } from '../../modules/PageOperationAccountingDetail/PageOperationAccountingDetail';
import { EMPLOYEE, OPERATION_ACCOUNTING, SUBSCRIPTION } from '../../services';
import { PageSubscription } from '../../modules/PageSubscription/PageSubscription';
import { EmployeeFormContainer } from '../../modules/Employee/pages/EmployeeFormContainer';

export const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={`${SUBSCRIPTION}`} element={<PageSubscription />} />
      <Route
        path={`${OPERATION_ACCOUNTING}/:id`}
        element={<PageOperationAccountingDetail />}
      />
      <Route path={`${EMPLOYEE}/:id?`} element={<EmployeeFormContainer />} />
    </Routes>
  );
};
