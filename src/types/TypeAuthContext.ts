export type TypeAuthContext = {
  token: string | null;
  logIn: (newToken: string) => void;
  logOut: () => void;
};