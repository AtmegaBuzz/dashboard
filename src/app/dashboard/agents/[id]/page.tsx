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
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CopyIcon,
  CheckIcon,
  KeyIcon,
  ShieldIcon
} from "lucide-react";
import Link from "next/link";
import { MetadataTable } from "@/components/dashboard/metadata-table";
import { Agent, VCResponse } from "@/apis/registry/types";
import { getAgentById } from "@/apis/registry";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CredentialCard from "@/components/dashboard/credential-card";

// Helper component for copying text to clipboard
const CopyButton = ({ text = "", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 bg-white hover:bg-gray-100 ${className}`}
            onClick={handleCopy}
          >
            {copied ?
              <CheckIcon className="h-4 w-4 text-green-500" /> :
              <CopyIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black border-gray-200">
          <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Helper component for truncated text display
const TruncatedText = ({ text = "", maxLength = 20 }) => {
  if (!text) return null;

  const truncated = text.length > maxLength ?
    `${text.substring(0, maxLength)}...${text.substring(text.length - 8)}` :
    text;

  return (
    <div className="flex items-center font-mono">
      <span className="text-sm overflow-hidden text-ellipsis">{truncated}</span>
    </div>
  );
};

export default function AgentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentCredentials, setAgentCredentials] = useState<VCResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgent() {
      try {
        setLoading(true);
        const { agent, credentials } = await getAgentById(params.id);
        setAgent(agent);
        setAgentCredentials(credentials);
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
      <div className="flex justify-center items-center py-16 bg-white text-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading agent details...</span>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 py-8 px-4 rounded-lg text-center">
        <span className="font-medium">{error || "Agent not found"}</span>
        <div className="mt-4">
          <Button
            onClick={() => router.push("/dashboard/agents")}
            className="bg-white text-black border border-gray-300 hover:bg-gray-50"
          >
            Return to Agent List
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-6 bg-white text-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
        <div>
          <div className="flex items-center">
            <h2 className="text-3xl font-bold tracking-tight text-black">{agent.name}</h2>
            <Badge variant="outline" className="ml-3 bg-white text-black border-gray-300">
              {agent.status}
            </Badge>
          </div>
          <p className="text-gray-500 mt-1">ID: {params.id}</p>
        </div>
        <div className="flex space-x-3">
          <Link href={`/dashboard/agents/${params.id}/edit`}>
            <Button variant="outline" className="bg-white text-black border-gray-300 hover:bg-gray-50">
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled className="bg-red-600 text-white hover:bg-red-700">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-black border-gray-200">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black">Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  This action cannot be undone. This will permanently delete the
                  agent "{agent.name}" and all associated metadata.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white text-black border-gray-300 hover:bg-gray-50">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full sm:w-auto border-b bg-gray-50 text-black">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black">Overview</TabsTrigger>
          <TabsTrigger value="metadata" className="data-[state=active]:bg-white data-[state=active]:text-black">Metadata</TabsTrigger>
          <TabsTrigger value="credentials" className="data-[state=active]:bg-white data-[state=active]:text-black">Credentials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="overflow-hidden border-gray-200 bg-white">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-black">Agent Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 text-black">
              <dl className="divide-y divide-gray-100">
                <div className="py-4 grid grid-cols-12 items-center">
                  <dt className="col-span-12 sm:col-span-3 font-medium text-gray-500">DID</dt>
                  <dd className="col-span-12 sm:col-span-9 mt-1 sm:mt-0 flex items-center">
                    <div className="bg-gray-50 px-3 py-2 rounded-md w-full flex items-center justify-between text-black border border-gray-200">
                      <TruncatedText text={agent.didIdentifier} maxLength={30} />
                      <CopyButton text={agent.didIdentifier} />
                    </div>
                  </dd>
                </div>
                <div className="py-4 grid grid-cols-12">
                  <dt className="col-span-12 sm:col-span-3 font-medium text-gray-500">Description</dt>
                  <dd className="col-span-12 sm:col-span-9 mt-1 sm:mt-0">
                    {agent.description ||
                      <span className="text-gray-400 italic">No description provided</span>
                    }
                  </dd>
                </div>
                <div className="py-4 grid grid-cols-12">
                  <dt className="col-span-12 sm:col-span-3 font-medium text-gray-500">Status</dt>
                  <dd className="col-span-12 sm:col-span-9 mt-1 sm:mt-0">
                    <Badge
                      variant={
                        agent.status === "ACTIVE"
                          ? "default"
                          : agent.status === "INACTIVE"
                            ? "secondary"
                            : "destructive"
                      }
                      className="font-medium"
                    >
                      {agent.status}
                    </Badge>
                  </dd>
                </div>
                <div className="py-4 grid grid-cols-12">
                  <dt className="col-span-12 sm:col-span-3 font-medium text-gray-500">Capabilities</dt>
                  <dd className="col-span-12 sm:col-span-9 mt-1 sm:mt-0">
                    {Object.entries(agent.capabilities || {}).length === 0 ? (
                      <span className="text-gray-400 italic">No capabilities defined</span>
                    ) : (
                      Object.entries(agent.capabilities!).map(
                        ([category, items]) => (
                          <div key={category} className="mb-4 last:mb-0">
                            <h4 className="text-sm font-semibold mb-2 text-gray-700">
                              {category}
                            </h4>
                            <div className="flex flex-wrap gap-2 ">
                              {items?.map((item) => (
                                <Badge
                                  key={`${category}-${item}`}
                                  variant="outline"
                                  className="bg-gray-50 text-black"
                                >
                                  {item.toUpperCase()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )
                      )
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-black">Agent Metadata</h3>
            <Link href={`/dashboard/agents/${params.id}/metadata/create`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Metadata
              </Button>
            </Link>
          </div>

          <MetadataTable agentId={params.id} />
        </TabsContent>

        <TabsContent value="credentials" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-black">Agent Credentials</h3>
            <Link href={`/dashboard/agents/${params.id}/credentials/issue`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <ShieldIcon className="mr-2 h-4 w-4" />
                Issue New Credential
              </Button>
            </Link>
          </div>

          {agentCredentials.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <KeyIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-1">No credentials found</h3>
              <p className="text-gray-500 mb-4">This agent doesn't have any credentials yet.</p>
              <Link href={`/dashboard/agents/${params.id}/credentials/issue`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Issue First Credential</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {agentCredentials.map((credential, index) => (
                <CredentialCard key={index} credential={credential} index={index} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}