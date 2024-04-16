import { TypeProductReport, TypeProductReportFilter } from '../types';
import { PRODUCT, REPORT } from './apiEndpoints';
import { api } from './api';

// Получить список всех отчетов по товарам
export async function getAllProductReportByFilter(
  data: TypeProductReportFilter,
): Promise<TypeProductReport[] | undefined> {
  const response = await api.post(`${REPORT}${PRODUCT}`, data);
  return response.data;
}
