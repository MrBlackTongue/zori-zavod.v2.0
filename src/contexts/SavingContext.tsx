import React, { createContext, useContext, useState } from 'react';

interface SavingContextProps {
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}

// Создание контекста с типом и начальными значениями
const SavingContext = createContext<SavingContextProps>({
  isSaving: false,
  setIsSaving: () => {},
});

// Хук для удобного доступа к контексту
export const useSaving = () => useContext(SavingContext);

// Определение типа для компонента-провайдера
interface SavingProviderProps {
  children: React.ReactNode;
}

// Компонент-провайдер для контекста
export const SavingProvider: React.FC<SavingProviderProps> = ({ children }) => {
  const [isSaving, setIsSaving] = useState(false);

  // Обертка для установки состояния с задержкой
  const setIsSavingDelayed = (saving: boolean) => {
    // Если начинается процесс сохранения, устанавливаем состояние сразу
    if (saving) {
      setIsSaving(true);
    } else {
      // Если процесс сохранения завершен, добавляем задержку перед сбросом состояния
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  return (
    <SavingContext.Provider
      value={{ isSaving, setIsSaving: setIsSavingDelayed }}>
      {children}
    </SavingContext.Provider>
  );
};
