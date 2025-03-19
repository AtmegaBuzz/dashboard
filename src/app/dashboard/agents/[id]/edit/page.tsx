"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentForm } from "@/components/dashboard/agent-form";

export default function EditAgentPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <AgentForm />
    </div>
  );
}
