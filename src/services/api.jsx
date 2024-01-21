// src/services/api.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Fungsi untuk melakukan login
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Fungsi untuk melakukan register
export const register = async (email, phone, password, confirmPassword) => {
  try {
    const response = await api.post("/auth/register", {
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Fungsi untuk melakukan refresh token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error during refresh token:", error);
    throw error;
  }
};

export default { login, register, refreshToken };
