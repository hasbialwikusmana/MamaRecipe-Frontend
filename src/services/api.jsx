import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();

      if (newToken) {
        localStorage.setItem("token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your session has expired. Please log in again.",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            window.location.replace("/");
          }
        });

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const response = await api.post("/auth/refresh-token", { refreshToken });
      console.log(response.data.data);

      const newToken = response.data.refreshToken;

      return newToken;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default api;
