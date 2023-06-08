import React, {ReactNode, useEffect} from 'react';
// import {TypeAuthContext} from "../../types";

export type TypeAuthContext = {
  isAuthenticated: boolean;
  logOut: () => void;
  logIn: () => void,
};

export function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const AuthContext = React.createContext<TypeAuthContext>({
  isAuthenticated: false,
  logOut: () => {},
  logIn: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const logOut = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
  };

  const logIn = () => { // добавлено
    setIsAuthenticated(true);
  }

  useEffect(() => {
    const jwtToken = getCookie('jwt');
    setIsAuthenticated(Boolean(jwtToken));
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, logOut, logIn}}>
      {children}
    </AuthContext.Provider>
  );
};