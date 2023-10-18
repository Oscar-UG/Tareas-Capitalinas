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
        const token = Cookies.get("token");
        if (!token.token) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }
        
        try {
            const res = await verifyTokenRequest(token);
            if (!res.data) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
    }

    // Verifica si hay un token antes de llamar a checkLogin
    const token = Cookies.get("token");
    if (token) {
        checkLogin();
    } else {
        setLoading(false);
    }
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
