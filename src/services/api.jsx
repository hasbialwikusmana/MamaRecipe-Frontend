import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `${token}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const navigate = useNavigate();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await api.post("/auth/refresh-token", {
          refreshToken,
        });
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        return api(originalRequest);
      } catch (error) {
        localStorage.clear();
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Please log in again.",
        });
        navigate("/auth/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
