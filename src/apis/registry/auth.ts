import apiClient from "./client";
import { LoginDto, LoginResponse } from "./types";


export const login = async (
    data: LoginDto
  ): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  };
  