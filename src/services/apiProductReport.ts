import { TypeProductReport, TypeProductReportFilter } from '../types';
import { PRODUCT, REPORT } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils';
import { api } from './api';

// Получить список всех отчетов по товарам
export function getAllProductReportByFilter(
  data: TypeProductReportFilter,
): Promise<TypeProductReport[] | undefined> {
  return api
    .post(`${REPORT}${PRODUCT}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
