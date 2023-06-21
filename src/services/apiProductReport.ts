import {
    TypeApiResponse,
    TypeProductReport,
    TypeProductReportFilter
} from "../types";
import {PRODUCT_REPORT, FILTER, OPERATION_ACCOUNTING} from "./apiEndpoints";
import {
    handleErrorResponseMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех отфильтрованных учетных операций
export function getAllProductReportByFilter(data: TypeProductReportFilter): Promise<TypeProductReport[]> {
    return api.post(`${PRODUCT_REPORT}${FILTER}`, data)
        .then(response => response.data)
        .catch(handleErrorResponseMessage);
}