// api/agents.ts
import apiClient from "./client";
import {
  Agent,
  AgentResponse,
  CreateAgentDto,
  GetAgentsParams,
  SearchAgentsParams,
  UpdateAgentDto,
  VCResponse,
} from "./types";

// Helper function to convert array params to comma-separated strings for query params
const prepareQueryParams = (params: any) => {
  const result = { ...params };

  // Convert array parameters to comma-separated strings
  Object.keys(result).forEach((key) => {
    if (Array.isArray(result[key])) {
      result[key] = result[key].join(",");
    }
  });

  return result;
};

/**
 * Create a new agent
 */
export const createAgent = async (authToken: string, data: CreateAgentDto): Promise<Agent> => {
  const response = await apiClient.post<Agent>("/agents", {...data, status: "ACTIVE"}, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return response.data;
};

/**
 * Get agents with optional filtering
 */
export const getAgents = async (
  params?: GetAgentsParams
): Promise<AgentResponse> => {
  const queryParams = params ? prepareQueryParams(params) : {};
  const response = await apiClient.get<AgentResponse>("/agents", {
    params: queryParams,
  });

  return response.data;
};

/**
 * Get agent by ID
 */
export const getAgentById = async (id: string): Promise<{agent: Agent, credentials: VCResponse[]}> => {
  const response = await apiClient.get<{agent: Agent, credentials: VCResponse[]}>(`/agents/${id}`);
  return response.data;
};

/**
 * Update agent information
 */
export const updateAgent = async (
  id: string,
  data: UpdateAgentDto
): Promise<Agent> => {
  const response = await apiClient.put<Agent>(`/agents/${id}`, data);
  return response.data;
};

/**
 * Delete agent
 */
export const deleteAgent = async (id: string): Promise<void> => {
  await apiClient.delete(`/agents/${id}`);
};

/**
 * Search for agents by capabilities and keywords
 */
export const searchAgents = async (
  params?: SearchAgentsParams
): Promise<{ items: AgentResponse[]; total: number }> => {
  const queryParams = params ? prepareQueryParams(params) : {};
  const response = await apiClient.get<{
    items: AgentResponse[];
    total: number;
  }>("/agents/search", {
    params: queryParams,
  });
  return response.data;
};
