import {useState} from 'react';
import {registrationUser} from "../services";
import {TypeUserProfile} from "../types";

export const useRegistration = () => {
  // Состояние модального окна
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Функция для создания нового пользователя
  const handleCreateNewUser = (values: TypeUserProfile): void => {
    const user: TypeUserProfile = {
      password: values.password,
      email: values.email,
      phone: values.phone,
      firstname: values.firstname,
    };
    setIsModalOpen(false);
    void registrationUser(user);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    handleCreateNewUser
  };
};