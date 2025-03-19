"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentForm } from "@/components/dashboard/agent-form";
import { useRouter } from "next/router";
import { Agent } from "@/apis/registry/types";
import { getAgentById } from "@/apis/registry";

export default function EditAgentPage({ params }: { params: { id: string } }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgent() {
      try {
        setLoading(true);
        const agent = await getAgentById(params.id);
        setAgent(agent);
      } catch (err) {
        setError("Failed to load agent details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAgent();
  }, [params.id]);

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
      <AgentForm agent={agent} isEditing={true} />
    </div>
  );
}
