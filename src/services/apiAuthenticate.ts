import {api} from './api';
import {AUTHENTICATE} from "./apiEndpoints";
import {TypeAuthenticate} from "../types";
import {handleCatchError} from "../utils";

// Запрос для авторизации пользователя
export function loginUser(data: TypeAuthenticate): Promise<any> {
  return api.post(AUTHENTICATE, data)
    .then(response => {
      if (response.status === 200) {
        return {jwt: 'Authenticated'};
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(error => {
      console.error(error);
      return handleCatchError(error);
    });
}