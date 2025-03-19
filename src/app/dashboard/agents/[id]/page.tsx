"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { MetadataTable } from "@/components/dashboard/metadata-table";
import { Agent } from "@/apis/registry/types";
import { getAgentById } from "@/apis/registry";

export default function AgentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgent() {
      try {
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

  // TODO: Implement delete agent functionality
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/agents/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete agent");
      }

      router.push("/dashboard/agents");
      router.refresh();
    } catch (err) {
      console.error("Error deleting agent:", err);
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{agent.name}</h2>
          <p className="text-gray-500">ID: {params.id}</p>
        </div>
        <div className="flex space-x-3">
          <Link href={`/dashboard/agents/${params.id}/edit`}>
            <Button variant="outline">
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled>
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  agent "{agent.name}" and all associated metadata.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-gray-200">
                <div className="py-4 grid grid-cols-3">
                  <dt className="font-medium text-gray-500">DID</dt>
                  <dd className="col-span-2 font-mono">{agent.did}</dd>
                </div>
                <div className="py-4 grid grid-cols-3">
                  <dt className="font-medium text-gray-500">Description</dt>
                  <dd className="col-span-2">
                    {agent.description || "No description provided"}
                  </dd>
                </div>
                <div className="py-4 grid grid-cols-3">
                  <dt className="font-medium text-gray-500">Status</dt>
                  <dd className="col-span-2">
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
                  </dd>
                </div>
                <div className="py-4 grid grid-cols-3">
                  <dt className="font-medium text-gray-500">Capabilities</dt>
                  <dd className="col-span-2">
                    {Object.entries(agent.capabilities).map(
                      ([category, items]) => (
                        <div key={category} className="mb-2">
                          <h4 className="text-sm font-semibold mb-1">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {items.map((item) => (
                              <Badge
                                key={`${category}-${item}`}
                                variant="outline"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">Agent Metadata</h3>
            <Link href={`/dashboard/agents/${params.id}/metadata/create`}>
              <Button size="sm">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Metadata
              </Button>
            </Link>
          </div>

          <MetadataTable agentId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
