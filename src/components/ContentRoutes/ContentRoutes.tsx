import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageOperationAccountingDetail } from '../../pages/PageOperationAccountingDetail/PageOperationAccountingDetail';
import { OPERATION_ACCOUNTING } from '../../services';

export const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={`${OPERATION_ACCOUNTING}/:id`}
        element={<PageOperationAccountingDetail />}
      />
    </Routes>
  );
};
