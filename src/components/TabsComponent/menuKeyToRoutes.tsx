import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { OPERATION, OPERATION_ACCOUNTING, SHIPMENT } from '../../services';
import { PageShipment } from '../../pages/PageShipment/PageShipment';
import { PageOperationAccounting } from '../../pages/PageOperationAccounting/PageOperationAccounting';
import { PageOperation } from '../../pages/PageOperation/PageOperation';

export const menuKeyToRoutes: Record<
  string,
  { route: ReactElement; title: string }[]
> = {
  '01': [
    {
      route: (
        <Route key={SHIPMENT} path={SHIPMENT} element={<PageShipment />} />
      ),
      title: 'Отгрузка',
    },
  ],
  '02': [
    {
      route: (
        <Route
          key={OPERATION_ACCOUNTING}
          path={OPERATION_ACCOUNTING}
          element={<PageOperationAccounting />}
        />
      ),
      title: 'Учет операций',
    },
    {
      route: (
        <Route key={OPERATION} path={OPERATION} element={<PageOperation />} />
      ),
      title: 'Операции',
    },
    // ... остальные маршруты для ключа '02'
  ],
  // ... остальные ключи и маршруты
};
