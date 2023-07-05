import {TypeCostPrice, TypeCostPriceFilter} from "../types";
import {api} from "./api";
import { REPORT, COST_PRICE} from "./apiEndpoints";
import {handleErrorResponseMessage} from "../utils";

// Получить список всех отчетов по себестоимости
export function getAllCostPriceByFilter(data: TypeCostPriceFilter):
  Promise<TypeCostPrice[] | undefined> {
  return api.post(`${REPORT}${COST_PRICE}`, data)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}