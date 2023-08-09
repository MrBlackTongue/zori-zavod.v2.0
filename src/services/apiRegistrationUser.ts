import {api} from './api';
import {REGISTRATION} from "./apiEndpoints";
import {TypeApiResponse, TypeUserProfile} from "../types";
import {handleErrorResponseMessage, handleRegistrationUserMessage} from "../utils";

// Зарегистрировать нового пользователя
export function registrationUser(data: TypeUserProfile): Promise<TypeApiResponse> {
  return api.post(REGISTRATION, data)
    .then(handleRegistrationUserMessage)
    .catch(handleErrorResponseMessage);
}