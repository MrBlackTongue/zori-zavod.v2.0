import { api } from './api';
import { REGISTRATION } from './apiEndpoints';
import { TypeApiResponse, TypeUserProfile } from '../types';
import {
  handleErrorResponseMessage,
  handleRegistrationUserMessage,
} from '../utils';

// Зарегистрировать нового пользователя
export async function registrationUser(
  data: TypeUserProfile,
): Promise<TypeApiResponse> {
  try {
    const response = await api.post(REGISTRATION, data);
    return handleRegistrationUserMessage(response);
  } catch (error) {
    return handleErrorResponseMessage(error);
  }
}
