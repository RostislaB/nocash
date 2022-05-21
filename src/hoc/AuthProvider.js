import { createContext, useState } from "react";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  const signIn = (newAuth, cb) => {
    setAuth(newAuth);
    cb();
  };
  const signOut = (cb = () => {}) => {
    setAuth(null);
    Cookie.remove("token");
    cb();
  };
  const authChecked = (token) => {
    const auth = jwt_decode(token);
    setAuth({ ...auth, token });
  };

  const value = { auth, signIn, signOut, authChecked };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
