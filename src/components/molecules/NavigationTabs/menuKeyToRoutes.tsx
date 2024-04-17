import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import {
  ALL,
  CATEGORY,
  CLIENTS,
  COST_PRICE,
  EMPLOYEE,
  EMPLOYEES,
  ESTIMATED_PRICE,
  MATERIALS,
  OPERATION,
  OPERATION_ACCOUNTING,
  OUTPUT,
  PRODUCTION_TYPE,
  PRODUCTS,
  PURCHASES,
  REPORT,
  SHIPMENT,
  STOCK,
  STOCK_ADJUSTMENTS,
  STOCKS,
  STORAGE_PLACE,
  UNIT,
  WORK_HOURS,
} from '../../../api';
import { PageShipment } from '../../pages/PageShipment/PageShipment';
import { PageOperationAccounting } from '../../pages/PageOperationAccounting/PageOperationAccounting';
import { PageOperation } from '../../pages/PageOperation/PageOperation';
import { PageProductionType } from '../../pages/PageProductionType/PageProductionType';
import { PageOutput } from '../../pages/PageOutput/PageOutput';
import { PurchaseTableContainer } from '../../pages/Purchase/PurchaseTable/PurchaseTable.container';
import { StockAllTableContainer } from '../../pages/Stock/StockAllTable/StockAllTable.container';
import { StockAdjustmentTableContainer } from '../../pages/StockAdjustment/StockAdjustmentTable/StockAdjustmentTable.container';
import { PageStoragePlace } from '../../pages/PageStoragePlace/PageStoragePlace';
import { PageOutputReport } from '../../pages/PageOutputReport/PageOutputReport';
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
import { StockProductsTableContainer } from '../../pages/Stock/StockProductsTable/StockProductsTable.container';
import { StockMaterialsTableContainer } from '../../pages/Stock/StockMaterialsTable/StockMaterialsTable.container';

export const menuKeyToRoutes: Record<
  string,
  {
    id: string;
    title: string;
    route?: ReactElement;
    childTabs?: {
      id: string;
      title: string;
      content: ReactElement;
    }[];
  }[]
> = {
  '01': [
    {
      id: '/sell',
      title: '',
      childTabs: [
        {
          id: SHIPMENT,
          title: 'Отгрузки',
          content: <PageShipment />,
        },
      ],
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
  ],
  '04': [
    {
      id: STOCKS,
      title: 'Остатки',
      childTabs: [
        {
          id: ALL,
          title: 'Все',
          content: <StockAllTableContainer />,
        },
        {
          id: PRODUCTS,
          title: 'Товары',
          content: <StockProductsTableContainer />,
        },
        {
          id: MATERIALS,
          title: 'Материалы',
          content: <StockMaterialsTableContainer />,
        },
      ],
    },
    {
      id: STOCK,
      title: 'Корректировка',
      childTabs: [
        {
          id: STOCK_ADJUSTMENTS,
          title: '',
          content: <StockAdjustmentTableContainer />,
        },
      ],
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
    // {
    //   id: `${REPORT}${PRODUCT}`,
    //   title: 'По товарам',
    //   route: (
    //     <Route
    //       key={`${REPORT}${PRODUCT}`}
    //       path={`${REPORT}${PRODUCT}`}
    //       element={<PageProductReport />}
    //     />
    //   ),
    // },
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
      title: 'Категория',
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
