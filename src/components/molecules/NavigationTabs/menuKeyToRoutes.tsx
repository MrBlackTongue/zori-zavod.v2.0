import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import {
  ACCEPTANCE,
  CATEGORY,
  CLIENTS,
  COST_PRICE,
  EMPLOYEE,
  EMPLOYEES,
  ESTIMATED_PRICE,
  HISTORY,
  MATERIALS,
  OPERATION,
  OPERATION_ACCOUNTING,
  OUTPUT,
  PRODUCT,
  PRODUCT_MOVEMENT,
  PRODUCTION_TYPE,
  PRODUCTS,
  PURCHASES,
  REPORT,
  SHIPMENT,
  STOCK,
  STORAGE_PLACE,
  UNIT,
  WORK_HOURS,
  WRITE_OFFS,
} from '../../../api';
import { PageShipment } from '../../pages/PageShipment/PageShipment';
import { PageOperationAccounting } from '../../pages/PageOperationAccounting/PageOperationAccounting';
import { PageOperation } from '../../pages/PageOperation/PageOperation';
import { PageProductionType } from '../../pages/PageProductionType/PageProductionType';
import { PageOutput } from '../../pages/PageOutput/PageOutput';
import { PurchaseTableContainer } from '../../pages/Purchase/PurchaseTable/PurchaseTable.container';
import { PageAcceptance } from '../../pages/PageAcceptance/PageAcceptance';
import { PageStock } from '../../pages/PageStock/PageStock';
import { WriteOffTableContainer } from '../../pages/WriteOff/WriteOffTable/WriteOffTable.container';
import { PageStoragePlace } from '../../pages/PageStoragePlace/PageStoragePlace';
import { PageProductMovementHistory } from '../../pages/PageProductMovementHistory/PageProductMovementHistory';
import { PageOutputReport } from '../../pages/PageOutputReport/PageOutputReport';
import { PageProductReport } from '../../pages/PageProductReport/PageProductReport';
import { PageOperationReport } from '../../pages/PageOperationReport/PageOperationReport';
import { PageEmployeeReport } from '../../pages/PageEmployeeReport/PageEmployeeReport';
import { PageCostPriceReport } from '../../pages/PageCostPriceReport/PageCostPriceReport';
import { ProductTableContainer } from '../../pages/Product/ProductTable/ProductTable.container';
import { PageCategory } from '../../pages/PageCategory/PageCategory';
import { PageEstimatedPrice } from '../../pages/PageEstimatedPrice/PageEstimatedPrice';
import { PageUnit } from '../../pages/PageUnit/PageUnit';
import { ClientTableContainer } from '../../pages/Client/ClientTable/ClientTable.container';
import { EmployeeTableContainer } from '../../pages/Employee/EmployeeTable/EmployeeTable.container';
import { MaterialTableContainer } from '../../pages/Material/MaterialTable/MaterialTable.container';
import { WorkHoursTableContainer } from '../../pages/WorkHours/WorkHoursTable/WorkHoursTable.container';

export const menuKeyToRoutes: Record<
  string,
  { id: string; route: ReactElement; title: string }[]
> = {
  '01': [
    {
      id: SHIPMENT,
      title: 'Отгрузки',
      route: (
        <Route key={SHIPMENT} path={SHIPMENT} element={<PageShipment />} />
      ),
    },
  ],
  '02': [
    {
      id: OPERATION_ACCOUNTING,
      title: 'Учет операций',
      route: (
        <Route
          key={OPERATION_ACCOUNTING}
          path={OPERATION_ACCOUNTING}
          element={<PageOperationAccounting />}
        />
      ),
    },
    {
      id: OPERATION,
      title: 'Операции',
      route: (
        <Route key={OPERATION} path={OPERATION} element={<PageOperation />} />
      ),
    },
    {
      id: PRODUCTION_TYPE,
      title: 'Типы производства',
      route: (
        <Route
          key={PRODUCTION_TYPE}
          path={PRODUCTION_TYPE}
          element={<PageProductionType />}
        />
      ),
    },
    {
      id: OUTPUT,
      title: 'Выпуски продукции',
      route: <Route key={OUTPUT} path={OUTPUT} element={<PageOutput />} />,
    },
  ],
  '03': [
    {
      id: PURCHASES,
      title: 'Закупки',
      route: (
        <Route
          key={PURCHASES}
          path={PURCHASES}
          element={<PurchaseTableContainer />}
        />
      ),
    },
    {
      id: ACCEPTANCE,
      title: 'Приемка товаров',
      route: (
        <Route
          key={ACCEPTANCE}
          path={ACCEPTANCE}
          element={<PageAcceptance />}
        />
      ),
    },
  ],
  '04': [
    {
      id: STOCK,
      title: 'Остатки',
      route: <Route key={STOCK} path={STOCK} element={<PageStock />} />,
    },
    {
      id: WRITE_OFFS,
      title: 'Списание',
      route: (
        <Route
          key={WRITE_OFFS}
          path={WRITE_OFFS}
          element={<WriteOffTableContainer />}
        />
      ),
    },
    {
      id: STORAGE_PLACE,
      title: 'Место хранения',
      route: (
        <Route
          key={STORAGE_PLACE}
          path={STORAGE_PLACE}
          element={<PageStoragePlace />}
        />
      ),
    },
    {
      id: `${PRODUCT_MOVEMENT}${HISTORY}`,
      title: 'История товаров',
      route: (
        <Route
          key={`${PRODUCT_MOVEMENT}${HISTORY}`}
          path={`${PRODUCT_MOVEMENT}${HISTORY}`}
          element={<PageProductMovementHistory />}
        />
      ),
    },
  ],
  '05': [
    {
      id: `${REPORT}${OPERATION}`,
      title: 'По операциям',
      route: (
        <Route
          key={`${REPORT}${OPERATION}`}
          path={`${REPORT}${OPERATION}`}
          element={<PageOperationReport />}
        />
      ),
    },
    {
      id: `${REPORT}${OUTPUT}`,
      title: 'По выпускам',
      route: (
        <Route
          key={`${REPORT}${OUTPUT}`}
          path={`${REPORT}${OUTPUT}`}
          element={<PageOutputReport />}
        />
      ),
    },
    {
      id: `${REPORT}${PRODUCT}`,
      title: 'По товарам',
      route: (
        <Route
          key={`${REPORT}${PRODUCT}`}
          path={`${REPORT}${PRODUCT}`}
          element={<PageProductReport />}
        />
      ),
    },
    {
      id: `${REPORT}${EMPLOYEE}`,
      title: 'По сотрудникам',
      route: (
        <Route
          key={`${REPORT}${EMPLOYEE}`}
          path={`${REPORT}${EMPLOYEE}`}
          element={<PageEmployeeReport />}
        />
      ),
    },
    {
      id: `${REPORT}${COST_PRICE}`,
      title: 'По себестоимости',
      route: (
        <Route
          key={`${REPORT}${COST_PRICE}`}
          path={`${REPORT}${COST_PRICE}`}
          element={<PageCostPriceReport />}
        />
      ),
    },
  ],
  '06': [
    {
      id: PRODUCTS,
      title: 'Товары',
      route: (
        <Route
          key={PRODUCTS}
          path={PRODUCTS}
          element={<ProductTableContainer />}
        />
      ),
    },
    {
      id: MATERIALS,
      title: 'Материалы',
      route: (
        <Route
          key={MATERIALS}
          path={MATERIALS}
          element={<MaterialTableContainer />}
        />
      ),
    },
    {
      id: CATEGORY,
      title: 'Категория товаров',
      route: (
        <Route key={CATEGORY} path={CATEGORY} element={<PageCategory />} />
      ),
    },
    {
      id: ESTIMATED_PRICE,
      title: 'Расчетные цены',
      route: (
        <Route
          key={ESTIMATED_PRICE}
          path={ESTIMATED_PRICE}
          element={<PageEstimatedPrice />}
        />
      ),
    },
    {
      id: UNIT,
      title: 'Единицы измерения',
      route: <Route key={UNIT} path={UNIT} element={<PageUnit />} />,
    },
  ],
  '07': [
    {
      id: CLIENTS,
      title: 'Клиенты',
      route: (
        <Route
          key={CLIENTS}
          path={CLIENTS}
          element={<ClientTableContainer />}
        />
      ),
    },
  ],
  '08': [
    {
      id: WORK_HOURS,
      title: 'Табель учета рабочего времени',
      route: (
        <Route
          key={WORK_HOURS}
          path={WORK_HOURS}
          element={<WorkHoursTableContainer />}
        />
      ),
    },
    {
      id: EMPLOYEES,
      title: 'Сотрудники',
      route: (
        <Route
          key={EMPLOYEES}
          path={EMPLOYEES}
          element={<EmployeeTableContainer />}
        />
      ),
    },
  ],
};
