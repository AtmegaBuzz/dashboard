// api/index.ts
import registryApiClient from "./client";

// Re-export all API functions
export * from "./agents";
export * from "./metadata";
export * from "./users";
export * from "./auth";

// Export the client for custom API calls
export { registryApiClient };
