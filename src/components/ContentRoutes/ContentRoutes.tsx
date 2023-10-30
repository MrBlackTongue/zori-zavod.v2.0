import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageOperationAccountingDetail } from '../../pages/PageOperationAccountingDetail/PageOperationAccountingDetail';
import { OPERATION_ACCOUNTING, SUBSCRIPTION } from '../../services';
import { PageSubscription } from '../../pages/PageSubscription/PageSubscription';

export const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={`${SUBSCRIPTION}`} element={<PageSubscription />} />
      <Route
        path={`${OPERATION_ACCOUNTING}/:id`}
        element={<PageOperationAccountingDetail />}
      />
    </Routes>
  );
};
