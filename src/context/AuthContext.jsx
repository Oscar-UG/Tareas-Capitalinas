import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado con un AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (values) => {
    try {
      const res = await registerRequest(values);
      Cookies.set("token", res.data.token); // Guardar el token en las cookies
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  
  const signin = async (values) => {
    try {
      const res = await loginRequest(values);
      Cookies.set("token", res.data.token); // Guardar el token en las cookies
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      try {
        const cookies = Cookies.get();
  
        if (!cookies.token) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }
  
        const res = await verifyTokenRequest(cookies.token);
  
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
  
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al verificar el inicio de sesión:", error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
  
    checkLogin();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
