// api/users.ts
import apiClient from "./client";
import { CreateUserDto, UserResponse, VCResponse } from "./types";

/**
 * Register a new user
 */
export const createUser = async (
  data: CreateUserDto
): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>("/users", data);
  return response.data;
};


export const getMe = async (authToken: string): Promise<{user: UserResponse, credentials: VCResponse[]}> => {
  const response = await apiClient.get<{user: UserResponse, credentials: VCResponse[]}>("/users", {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return response.data
}