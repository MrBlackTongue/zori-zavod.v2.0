import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrationUser } from '../services';
import { TypeUserInfo } from '../types';

export const useRegistration = () => {
  // Состояние модального окна
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Хук для перенаправления
  const navigate = useNavigate();

  // Функция для создания нового пользователя
  const handleCreateNewUser = async (values: TypeUserInfo): Promise<void> => {
    const user: TypeUserInfo = {
      password: values.password,
      email: values.email,
      phone: values.phone,
      firstname: values.firstname,
    };
    setIsModalOpen(false);

    try {
      await registrationUser(user);
      navigate('/employee');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    handleCreateNewUser,
  };
};
