import React, { ReactNode, useEffect } from 'react';
import { TypeAuthContext } from "../../types";
import { getCookie } from '../../utils'; // Вспомогательная функция, которую нужно создать

export const AuthContext = React.createContext<TypeAuthContext>({
  token: null,
  logIn: () => {},
  logOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = React.useState<string | null>(null);

  const logIn = (newToken: string) => {
    document.cookie = `jwt=${newToken}; path=/; Secure; HttpOnly`;
    setToken(newToken);
  };

  const logOut = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setToken(null);
  };

  useEffect(() => {
    const jwtToken = getCookie('jwt'); // Здесь мы читаем cookie
    if (jwtToken) {
      setToken(jwtToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{token, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};
