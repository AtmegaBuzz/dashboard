"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAgent } from "@/apis/registry";

// Define the agent schema
const agentSchema = z.object({
  did: z.string().min(1, "DID is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "DEPRECATED"]),
  capabilities: z.any(), // This would be more strongly typed in a real implementation
  message: z.string().min(1, "Message is required"),
});

type AgentFormProps = {
  agent?: any;
  isEditing?: boolean;
};

export function AgentForm({ agent, isEditing = false }: AgentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values or existing agent data
  const form = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: agent || {
      did: "",
      name: "",
      description: "",
      status: "ACTIVE",
      capabilities: {
        ai: [],
        integration: [],
        protocols: [],
      },
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof agentSchema>) {
    setIsSubmitting(true);
    try {
      const method = isEditing ? "PUT" : "POST";

      if (method === "POST") {
        // TODO: Implement signature and wallet address
        const res = await createAgent({
          ...values,
          walletAddress: "",
          signature: "",
        });
      } else if (method === "PUT") {
        // TODO: Update agent
      }

      router.push("/dashboard/agents");
      router.refresh();
    } catch (error) {
      console.error("Error saving agent:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Agent" : "Create New Agent"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="did"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DID (Decentralized Identifier)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="did:example:123456789abcdefghi"
                      disabled={isEditing} // DID shouldn't be editable
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Agent Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe the agent's functionality"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Message" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="DEPRECATED">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Capabilities would be implemented with a more complex custom component */}
            <FormField
              control={form.control}
              name="capabilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capabilities</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='{"ai": ["nlp", "vision"], "integration": ["slack", "discord"]}'
                      value={
                        field.value ? JSON.stringify(field.value, null, 2) : ""
                      }
                      onChange={(e) => {
                        try {
                          const value = JSON.parse(e.target.value);
                          field.onChange(value);
                        } catch (error) {
                          field.onChange(e.target.value);
                        }
                      }}
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Update Agent"
                  : "Create Agent"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
