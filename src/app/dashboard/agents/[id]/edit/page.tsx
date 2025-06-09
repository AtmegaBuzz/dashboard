"use client";

import { useEffect, useState } from "react";
import { AgentForm } from "@/components/dashboard/agent-form";
import { Agent } from "@/apis/registry/types";
import { getAgentById } from "@/apis/registry";

export default function EditAgentPage({ params }: { params: Promise<{ id: string }> }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);

  // Resolve params Promise
  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setAgentId(resolvedParams.id);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!agentId) return;

    async function fetchAgent() {
      try {
        setLoading(true);
        const agent = await getAgentById(agentId!);
        setAgent(agent.agent);
      } catch (err) {
        setError("Failed to load agent details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAgent();
  }, [agentId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">Loading agent details...</div>
    );
  }

  if (error || !agent) {
    return (
      <div className="text-red-500 py-8 text-center">
        {error || "Agent not found"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AgentForm 
        agent={{
          name: agent.name,
          description: agent.description!,
          capabilities: agent.capabilities,
        }} 
        isEditing={true} 
      />
    </div>
  );
}