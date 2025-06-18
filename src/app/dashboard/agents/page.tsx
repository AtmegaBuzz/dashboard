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
import { PlusIcon, ExternalLinkIcon, Pencil, EyeIcon, SearchIcon } from "lucide-react";
import { getMyAgents } from "@/apis/registry";
import { Agent, Capabilities } from "@/apis/registry/types";
import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/store/global.store";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [accessToken] = useAtom(accessTokenAtom)


  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true);
        const response = await getMyAgents(accessToken!);
        setAgents(response);
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

  // Filter agents based on search term
  const filteredAgents = (agents || []).filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.didIdentifier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to display capabilities with better styling
  const renderCapabilities = (capabilities?: Capabilities) => {
    if (!capabilities || Object.keys(capabilities).length === 0) {
      return <span className="text-gray-400 italic text-xs">No capabilities</span>;
    }

    // Get all capability items flattened
    const allItems = Object.values(capabilities).flat();

    // Show first 2 items
    return (
      <div className="flex flex-wrap gap-1">
        {allItems.slice(0, 2).map((item, idx) => (
          <Badge
            key={idx}
            variant="outline"
            className="bg-gradient-to-r from-[#7678ed10] to-[#3B82F610] text-[#3B82F6] border-[#3B82F620]"
          >
            {item}
          </Badge>
        ))}
        {allItems.length > 2 && (
          <Badge className="bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100">
            +{allItems.length - 2} more
          </Badge>
        )}
      </div>
    );
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 border-emerald-200";
      case "INACTIVE":
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border-gray-200";
      default:
        return "bg-gradient-to-r from-red-50 to-orange-50 text-red-600 border-red-200";
    }
  };


  return (
    <div className="space-y-6 bg-white text-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">Agents</h2>
          <p className="text-gray-500 mt-1">Manage your P3 AI Network agents</p>
        </div>
        <Link href="/dashboard/agents/create">
          <Button className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white border-none">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </Link>
      </div>

      <Card className="bg-white border border-gray-200 overflow-hidden shadow-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 py-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-black text-xl">Agent Registry</CardTitle>
            <div className="relative w-full sm:w-64">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search agents..."
                className="pl-8 bg-white text-black border-gray-200 focus:border-[#7678ed] focus:ring-1 focus:ring-[#7678ed]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white text-black p-0">
          {loading ? (
            <div className="flex justify-center items-center py-16 text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7678ed]"></div>
              <span className="ml-3">Loading agents...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 py-8 px-4 m-6 rounded-lg text-center">
              <span className="font-medium">{error}</span>
            </div>
          ) : filteredAgents.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 m-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.75 2.198m0 0a2.25 2.25 0 002.25-2.198c0-.616-.197-1.185-.52-1.657M3 10.5v-7.25a1.5 1.5 0 111.5 0v7.5a2.25 2.25 0 002.25 2.25c.896 0 1.7-.393 2.25-1.016m0 0c.512.654 1.311 1.076 2.25 1.076a2.25 2.25 0 002.25-2.25V6a3 3 0 00-3-3H6A3 3 0 003 6v4.5"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-black">
                {searchTerm ? "No matching agents found" : "No agents found"}
              </h3>
              <p className="mt-1 text-gray-500">
                {searchTerm ? `Try a different search term or create a new agent.` : `Get started by creating your first agent.`}
              </p>
              {searchTerm ? (
                <div className="mt-6 flex justify-center gap-3">
                  <Button
                    onClick={() => setSearchTerm("")}
                    className="bg-white text-black border border-gray-300 hover:bg-gray-50"
                  >
                    Clear Search
                  </Button>
                  <Link href="/dashboard/agents/create">
                    <Button className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Create Agent
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-6">
                  <Link href="/dashboard/agents/create">
                    <Button className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 text-white">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Create Agent
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="border-b border-gray-200">
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider py-4">Name</TableHead>
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider">DID</TableHead>
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider">Capabilities</TableHead>
                    <TableHead className="text-black font-medium text-xs uppercase tracking-wider text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow
                      key={agent.id}
                      className="hover:bg-blue-50/40 border-b border-gray-200 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="font-medium text-black">{agent.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">ID: {agent.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm text-black flex items-center space-x-1">
                          <div className="bg-gray-50 px-2 py-1 rounded border border-gray-200 max-w-[180px] truncate">
                            {agent.didIdentifier.substring(0, 18)}...
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${getStatusBadgeStyle(agent.status)}`}
                        >
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {renderCapabilities(agent.capabilities)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex space-x-2 justify-end">
                          <Link href={`/dashboard/agents/${agent.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white text-[#3B82F6] border-[#3B82F640] hover:bg-[#3B82F610] h-8 px-3"
                            >
                              <EyeIcon className="h-3.5 w-3.5" />
                              <span className="ml-1.5">View</span>
                            </Button>
                          </Link>
                          <Link href={`/dashboard/agents/${agent.id}/edit`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white text-gray-600 border-gray-200 hover:bg-gray-50 h-8 px-3"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span className="ml-1.5">Edit</span>
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}