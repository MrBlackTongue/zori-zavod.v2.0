import { TypeCostPrice, TypeCostPriceFilter } from '../types';
import { api } from './api';
import { COST_PRICE, REPORT } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils';

// Получить список всех отчетов по себестоимости
export function getAllCostPriceByFilter(
  data: TypeCostPriceFilter,
): Promise<TypeCostPrice[] | undefined> {
  return api
    .post(`${REPORT}${COST_PRICE}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
