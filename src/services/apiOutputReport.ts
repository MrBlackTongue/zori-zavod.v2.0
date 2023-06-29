import {TypeOutputReport, TypeOutputReportFilter} from "../types";
import {OUTPUT, REPORT} from "./apiEndpoints";
import {handleErrorResponseMessage} from '../utils';
import {api} from "./api";

// Получить список всех отчетов по выпускам
export function getAllOutputReportByFilter(data: TypeOutputReportFilter):
  Promise<TypeOutputReport[] | undefined> {
  return api.post(`${REPORT}${OUTPUT}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}