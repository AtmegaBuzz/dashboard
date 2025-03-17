"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
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

interface Metadata {
  key: string;
  value: string;
  visibility: "PUBLIC" | "PRIVATE";
}

interface MetadataTableProps {
  agentId: string;
}

export function MetadataTable({ agentId }: MetadataTableProps) {
  const [metadata, setMetadata] = useState<Metadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(`/api/agents/${agentId}/metadata`);
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError("Failed to load metadata");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, [agentId]);

  const handleDelete = async (key: string) => {
    try {
      const response = await fetch(`/api/agents/${agentId}/metadata/${key}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete metadata");
      }

      setMetadata(metadata.filter((item) => item.key !== key));
    } catch (err) {
      console.error("Error deleting metadata:", err);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-4">Loading metadata...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-4 text-center">{error}</div>;
  }

  if (metadata.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500 mb-4">No metadata found for this agent.</p>
        <Link href={`/dashboard/agents/${agentId}/metadata/create`}>
          <Button>Add Metadata</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metadata.map((item) => (
            <TableRow key={item.key}>
              <TableCell className="font-medium">{item.key}</TableCell>
              <TableCell className="font-mono text-sm">{item.value}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.visibility === "PUBLIC" ? "default" : "secondary"
                  }
                >
                  {item.visibility}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/agents/${agentId}/metadata/${item.key}/edit`}
                  >
                    <Button variant="outline" size="sm">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Metadata</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the metadata with key
                          "{item.key}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.key)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
