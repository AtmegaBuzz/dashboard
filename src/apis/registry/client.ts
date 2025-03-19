// api/client.ts
import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REGISTRY_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request/response interceptors if needed
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
