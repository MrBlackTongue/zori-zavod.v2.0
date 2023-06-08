import React, {ReactNode} from 'react';
import {TypeAuthContext} from "../../types";

// Задаем начальные значения и типы для контекста
export const AuthContext = React.createContext<TypeAuthContext>({
  token: null,
  logIn: () => {
  },
  logOut: () => {
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = React.useState<string | null>(null);

  const logIn = (newToken: string) => {
    document.cookie = `jwt=${newToken}; path=/;`;
    setToken(newToken);
  };

  const logOut = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{token, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};