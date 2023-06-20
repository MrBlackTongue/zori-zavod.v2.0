import {TypeOperationReport, TypeOperationReportFilter} from "../types";
import {api} from "./api";
import {OPERATION, REPORT} from "./apiEndpoints";
import {handleErrorResponseMessage} from "../utils";

// Получить список всех отчетов по операциям
export function getAllOperationReportByFilter(data: TypeOperationReportFilter):
  Promise<TypeOperationReport[] | undefined> {
  return api.post(`${OPERATION}${REPORT}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}