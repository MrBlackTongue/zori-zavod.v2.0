import {TypeCostPriceReport, TypeCostPriceReportFilter} from '../types';
import {api} from './api';
import {COST_PRICE, REPORT} from './apiEndpoints';
import {handleErrorResponseMessage} from '../utils'; // Получить список всех отчетов по себестоимости

// Получить список всех отчетов по себестоимости
export async function getAllCostPriceByFilter(
  data: TypeCostPriceReportFilter,
): Promise<TypeCostPriceReport[] | undefined> {
  try {
    const response = await api.post(`${REPORT}${COST_PRICE}`, data);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
