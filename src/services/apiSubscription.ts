import {SUBSCRIPTION} from "./apiEndpoints";
import {handleErrorResponseMessage,} from '../utils';
import {api} from "./api";
import {TypeSubscription} from "../types";

// Получить текущую информацию о пользователе
export function getUserSubscription(): Promise<TypeSubscription> {
  return api.get(SUBSCRIPTION)
    .then(response => {return response.data;})
    .catch(handleErrorResponseMessage);
}