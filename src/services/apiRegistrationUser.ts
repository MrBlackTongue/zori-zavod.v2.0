import {api} from './api';
import {REGISTRATION} from "./apiEndpoints";
import {TypeApiResponse, TypeProfile} from "../types";
import {handleErrorResponseMessage, handleRegistrationUserMessage} from "../utils";

// Зарегистировать нового пользователя
export function registrationUser(data: TypeProfile): Promise<TypeApiResponse> {
  return api.post(REGISTRATION, data)
    .then(handleRegistrationUserMessage)
    .catch(handleErrorResponseMessage);
}