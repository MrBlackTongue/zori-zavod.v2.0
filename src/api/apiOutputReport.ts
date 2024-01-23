import { TypeOutputReport, TypeOutputReportFilter } from '../types';
import { OUTPUT, REPORT } from './apiEndpoints';
import { handleErrorResponseMessage } from '../utils';
import { api } from './api';

// Получить список всех отчетов по выпускам
export async function getAllOutputReportByFilter(
  data: TypeOutputReportFilter,
): Promise<TypeOutputReport[] | undefined> {
  try {
    const response = await api.post(`${REPORT}${OUTPUT}`, data);
    return response.data;
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
