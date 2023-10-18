import axios from "axios";

const instance = axios.create({
  baseURL: "https://tareas-capitalinas-api-production-82e9.up.railway.app/api",
  withCredentials: true,
});


export default instance;
