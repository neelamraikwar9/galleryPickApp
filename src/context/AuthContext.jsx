import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); 

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const handleGoogleSignIn = () => {
      // Redirect to YOUR backend's Google auth endpoint
  window.location.href = 'http://localhost:4000/auth/google';
  }; 



  return (
    <AuthContext.Provider value={{ token, login, logout,  handleGoogleSignIn}}>
      {children}
    </AuthContext.Provider>
  );
};
