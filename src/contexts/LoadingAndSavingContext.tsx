import React, { createContext, useContext, useMemo, useState } from 'react';

interface LoadingAndSavingContextProps {
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

// Создание контекста с типом и начальными значениями
const LoadingAndSavingContext = createContext<LoadingAndSavingContextProps>({
  isSaving: false,
  setIsSaving: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

// Хук для удобного доступа к контексту
export const useLoadingAndSaving = () => useContext(LoadingAndSavingContext);

// Определение типа для компонента-провайдера
interface LoadingAndSavingProviderProps {
  children: React.ReactNode;
}

// Компонент-провайдер для контекста
export const LoadingAndSavingProvider: React.FC<
  LoadingAndSavingProviderProps
> = ({ children }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Обертка для установки состояния загрузки
  const setIsLoadingImmediate = (loading: boolean) => {
    setIsLoading(loading);
  };

  const contextValue = useMemo(
    () => ({
      isSaving,
      setIsSaving: setIsSavingDelayed,
      isLoading,
      setIsLoading: setIsLoadingImmediate,
    }),
    [isSaving, isLoading],
  );

  return (
    <LoadingAndSavingContext.Provider value={contextValue}>
      {children}
    </LoadingAndSavingContext.Provider>
  );
};
