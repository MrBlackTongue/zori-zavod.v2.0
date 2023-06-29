import {TypeApiResponse, TypeProductGroup} from "../types";
import {PRODUCT_GROUP, GROUP, TREE} from "./apiEndpoints";
import {
  handleErrorResponseMessage,
  handleResponseCreateMessage,
  handleResponseDeleteMessage,
  handleResponseUpdateMessage,
} from '../utils';
import {api} from "./api";

// Получить список всех товарных групп
export function getAllProductGroup(): Promise<TypeProductGroup[]> {
  return api.get(`${PRODUCT_GROUP}${GROUP}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Получить товарную группу по id
export function getProductGroupById(id: number): Promise<TypeProductGroup | undefined> {
  return api.get(`${PRODUCT_GROUP}${GROUP}/${id}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}

// Добавить новую товарную группу
export function createProductGroup(data: TypeProductGroup): Promise<TypeApiResponse> {
  return api.post(`${PRODUCT_GROUP}${GROUP}`, data)
    .then(handleResponseCreateMessage)
    .catch(handleErrorResponseMessage);
}

// Удалить товарную группу по id
export function deleteProductGroupById(id: number): Promise<TypeApiResponse> {
  return api.delete(`${PRODUCT_GROUP}${GROUP}/${id}`)
    .then(handleResponseDeleteMessage)
    .catch(handleErrorResponseMessage);
}

// Редактировать товарную группу
export function updateProductGroup(data: TypeProductGroup): Promise<TypeApiResponse> {
  return api.put(`${PRODUCT_GROUP}${GROUP}`, data)
    .then(handleResponseUpdateMessage)
    .catch(handleErrorResponseMessage);
}

// Получить дерево группы товаров
export function getProductGroupTree(): Promise<TypeProductGroup[]> {
  return api.get(`${PRODUCT_GROUP}${GROUP}${TREE}`)
    .then(response => response.data)
    .catch(handleErrorResponseMessage);
}