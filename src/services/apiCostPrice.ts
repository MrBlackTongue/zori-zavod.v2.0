import { TypeCostPriceReport, TypeCostPriceReportFilter } from '../types';
import { api } from './api';
import { COST_PRICE, REPORT } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils'; // Получить список всех отчетов по себестоимости

// Получить список всех отчетов по себестоимости
export function getAllCostPriceByFilter(
  data: TypeCostPriceReportFilter,
): Promise<TypeCostPriceReport[] | undefined> {
  return api
    .post(`${REPORT}${COST_PRICE}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
