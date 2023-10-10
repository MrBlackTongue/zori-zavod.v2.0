import {TypeOperationReport, TypeOperationReportFilter} from '../types';
import {api} from './api';
import {OPERATION, REPORT} from './apiEndpoints';
import {handleErrorResponseMessage} from '../utils';

// Получить список всех отчетов по операциям
export async function getAllOperationReportByFilter(
  data: TypeOperationReportFilter,
): Promise<TypeOperationReport[] | undefined> {
  try {
    const response = await api.post(`${REPORT}${OPERATION}`, data);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
