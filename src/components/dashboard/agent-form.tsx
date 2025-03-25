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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAgent } from "@/apis/registry";
import { useAccount, useSignMessage } from "wagmi";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/store/global.store";

// Define the agent schema with required fields
const agentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  capabilities: z.object({
    ai: z.array(z.string()).optional(),
    integration: z.array(z.string()).optional(),
    protocols: z.array(z.string()).optional()
  }).optional()
});

type AgentFormProps = {
  agent?: z.infer<typeof agentSchema>;
  isEditing?: boolean;
};

export function AgentForm({ agent, isEditing = false }: AgentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected } = useAccount();

  const [authToken,] = useAtom(accessTokenAtom);

  // Initialize form with default values or existing agent data
  const form = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: agent || {
      name: "Test Agent",
      description: "This is a test agent",
      capabilities: {
        ai: ["nlp", "vision"],
        integration: ["slack", "discord"],
        protocols: ["http", "grpc"]
      }
    },
  });

  async function onSubmit(values: z.infer<typeof agentSchema>) {
    setIsSubmitting(true);
    try {

      await createAgent(authToken!, values);

      router.push("/dashboard/agents");
      router.refresh();
    } catch (error) {
      console.error("Error saving agent:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isConnected) {
    return (
      <div className="text-gray-700 py-8 text-center">
        Connect your wallet to create an agent
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pt-8 pb-16"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-none shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7678ed] via-[#3B82F6] to-[#06B6D4]">
              {isEditing ? "Edit Agent" : "Create New Agent"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Agent Name"
                          className="text-gray-900 placeholder-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe the agent's functionality"
                          rows={4}
                          className="text-gray-900 placeholder-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capabilities.ai"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">AI Capabilities</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => {
                            field.onChange(
                              e.target.value.split(",").map(cap => cap.trim())
                            );
                          }}
                          placeholder="Enter AI capabilities (comma-separated)"
                          className="text-gray-900 placeholder-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capabilities.integration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Integration Capabilities</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => {
                            field.onChange(
                              e.target.value.split(",").map(cap => cap.trim())
                            );
                          }}
                          placeholder="Enter integration capabilities (comma-separated)"
                          className="text-gray-900 placeholder-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capabilities.protocols"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Protocols</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => {
                            field.onChange(
                              e.target.value.split(",").map(cap => cap.trim())
                            );
                          }}
                          placeholder="Enter supported protocols (comma-separated)"
                          className="text-gray-900 placeholder-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-gray-700 hover:bg-gray-100 bg-white"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] hover:opacity-90 transition-opacity text-white"
                  >
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
      </div>
    </motion.div>
  );
}

export default AgentForm;