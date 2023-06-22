import {TypeOutputReport, TypeOutputReportFilter} from "../types";
import {OUTPUT, REPORT} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
} from '../utils';
import {api} from "./api";

export function getAllProductReportByFilter(data: TypeOutputReportFilter):
  Promise<TypeOutputReport[] | undefined> {
  return api.post(`${OUTPUT}${REPORT}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}