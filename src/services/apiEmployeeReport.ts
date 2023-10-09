import { api } from './api';
import { EMPLOYEE, REPORT } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils';
import { TypeEmployeeReport, TypeEmployeeReportFilter } from '../types';

// Получить список всех отчетов по сотрудникам
export function getAllEmployeeReportByFilter(
  data: TypeEmployeeReportFilter,
): Promise<TypeEmployeeReport[] | undefined> {
  return api
    .post(`${REPORT}${EMPLOYEE}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}
