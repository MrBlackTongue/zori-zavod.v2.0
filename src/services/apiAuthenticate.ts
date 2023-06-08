import {API_URL, AUTHENTICATE} from "./apiEndpoints";
import {
  handleError,
  BASE_HEADERS,
  handleCatchError,
} from '../utils';
import {TypeAuthenticate} from "../types";

export function loginUser(data: TypeAuthenticate): Promise<any> {
  try {
    return fetch(API_URL + AUTHENTICATE, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json()
      })
      .catch(handleError);
  } catch (error) {
    return handleCatchError(error);
  }
}
