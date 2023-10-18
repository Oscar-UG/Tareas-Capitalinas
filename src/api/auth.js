import axios from "./axios.js";


export const registerRequest = (user) => axios.post("/register", user);

export const loginRequest = (user) => axios.post("/login", user);

export const verifyTokenRequest = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Realiza la solicitud de verificación de token con el token almacenado en localStorage.
      return axios.get("/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // Maneja el caso en el que no haya token almacenado en localStorage.
    return Promise.reject(new Error("Token no encontrado"));
  };
  