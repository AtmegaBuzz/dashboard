export type AgentStatus = "ACTIVE" | "INACTIVE" | "DEPRECATED";
export type MetadataVisibility = "PUBLIC" | "PRIVATE";

export interface Capabilities {
  ai?: string[];
  integration?: string[];
  protocols?: string[];
  [key: string]: string[] | undefined;
}

// DTOs for Agents
export interface CreateAgentDto {
  did: string;
  name: string;
  description?: string;
  capabilities?: Capabilities;
  status?: AgentStatus;
  walletAddress: string;
  signature: string;
  message: string;
}

export interface UpdateAgentDto {
  name?: string;
  description?: string;
  capabilities?: Capabilities;
  status?: AgentStatus;
}

export interface AgentResponse {
  id: string;
  did: string;
  name: string;
  description?: string;
  capabilities?: Capabilities;
  status: AgentStatus;
  createdAt: string;
  updatedAt: string;
}

// DTOs for Metadata
export interface CreateMetadataDto {
  key: string;
  value: string;
  visibility?: MetadataVisibility;
}

export interface UpdateMetadataDto {
  value: string;
  visibility?: MetadataVisibility;
}

export interface MetadataResponse {
  id: string;
  key: string;
  value: string;
  visibility: MetadataVisibility;
  createdAt: string;
  updatedAt: string;
}

// DTOs for Users
export interface CreateUserDto {
  walletAddress: string;
  signature: string;
  message: string;
  name: string;
}

export interface UserResponse {
  id: string;
  walletAddress: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Query Params
export interface GetAgentsParams {
  name?: string;
  status?: AgentStatus;
  capabilities?: string[];
  did?: string;
  limit?: number;
  offset?: number;
}

export interface GetMetadataParams {
  visibility?: MetadataVisibility;
}

export interface SearchAgentsParams {
  keyword?: string;
  capabilities?: string[];
  status?: AgentStatus;
  limit?: number;
  offset?: number;
}
