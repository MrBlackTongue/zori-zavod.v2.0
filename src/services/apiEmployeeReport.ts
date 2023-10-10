import {api} from './api';
import {EMPLOYEE, REPORT} from './apiEndpoints';
import {handleErrorResponseMessage} from '../utils';
import {TypeEmployeeReport, TypeEmployeeReportFilter} from '../types';

// Получить список всех отчетов по сотрудникам
export async function getAllEmployeeReportByFilter(
  data: TypeEmployeeReportFilter,
): Promise<TypeEmployeeReport[] | undefined> {
  try {
    const response = await api.post(`${REPORT}${EMPLOYEE}`, data);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
