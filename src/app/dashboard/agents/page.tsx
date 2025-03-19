"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { getAgents } from "@/apis/registry";
import { Agent, Capabilities } from "@/apis/registry/types";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true);
        const response = await getAgents({ status: "ACTIVE", limit: 10 });
        setAgents(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load agents");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  // Helper function to display capabilities
  const renderCapabilities = (capabilities?: Capabilities) => {
    return Object.entries(capabilities ?? {}).flatMap(([category, items]) =>
      items?.slice(0, 2).map((item) => (
        <Badge key={`${category}-${item}`} variant="outline" className="mr-1">
          {item}
        </Badge>
      ))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
        <Link href="/dashboard/agents/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Registry</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">Loading agents...</div>
          ) : error ? (
            <div className="text-red-500 py-8 text-center">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>DID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Capabilities</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {agent.did.substring(0, 16)}...
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          agent.status === "ACTIVE"
                            ? "default"
                            : agent.status === "INACTIVE"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {renderCapabilities(agent.capabilities)}
                      {Object.values(agent.capabilities ?? {}).flat().length >
                        2 && <Badge variant="outline">+more</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link href={`/dashboard/agents/${agent.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/agents/${agent.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
