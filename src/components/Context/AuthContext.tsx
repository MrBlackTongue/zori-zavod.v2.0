import React, {ReactNode} from 'react';

export type TypeAuthContext = {
  isAuthenticated: boolean;
  logOut: () => void;
  logIn: () => void,
};

export const AuthContext = React.createContext<TypeAuthContext>({
  isAuthenticated: false,
  logOut: () => {},
  logIn: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    return Boolean(localStorage.getItem('isAuthenticated'));
  });

  const logOut = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  const logIn = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, logOut, logIn}}>
      {children}
    </AuthContext.Provider>
  );
};