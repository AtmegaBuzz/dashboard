// api/users.ts
import apiClient from "./client";
import { CreateUserDto, UserResponse } from "./types";

/**
 * Register a new user
 */
export const createUser = async (
  data: CreateUserDto
): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>("/users", data);
  return response.data;
};
