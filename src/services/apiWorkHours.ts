import {TypeWorkHours} from "../types";
import {WORK_HOURS} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех сотрудников
export function getAllWorkHours(): Promise<TypeWorkHours[]> {
  return api.get(WORK_HOURS)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

