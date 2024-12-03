"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  agentName: z.string().min(2, {
    message: "Agent name must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select an agent type.",
  }),
  tags: z.string().refine((val) => val.trim().length > 0, {
    message: "Please enter at least one tag.",
  }),
  costPerResponse: z.number().min(0, {
    message: "Cost must be a positive number.",
  }),
})

export default function AddIdentityPage() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [generatedIdentity, setGeneratedIdentity] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: "",
      type: "",
      tags: "",
      costPerResponse: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the form data to your backend
    console.log(values)

    // Generate a mock identity (replace this with actual identity generation logic)
    const mockIdentity = {
      id: Math.random().toString(36).substr(2, 9),
      address: "0x" + Math.random().toString(36).substr(2, 40),
      did: "did:example:" + Math.random().toString(36).substr(2, 16),
      ...values,
    }

    setGeneratedIdentity(mockIdentity)
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Add AI Agent Identity</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter agent name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your AI agent.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="chatbot">Chatbot</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="analyzer">Analyzer</SelectItem>
                    <SelectItem value="generator">Generator</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of AI agent you&apos;re creating.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter tags separated by commas"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add multiple tags separated by commas (e.g., NLP, image processing, data analysis).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costPerResponse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost per Response (ETH)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.000001"
                    placeholder="Enter cost in ETH"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Set the cost for each response from this agent in ETH.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Generate Identity</Button>
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Identity Generated</DialogTitle>
            <DialogDescription>
              Here are the details of the generated AI agent identity:
            </DialogDescription>
          </DialogHeader>
          {generatedIdentity && (
            <div className="mt-4 space-y-2">
              <p><strong>ID:</strong> {generatedIdentity.id}</p>
              <p><strong>Name:</strong> {generatedIdentity.agentName}</p>
              <p><strong>Type:</strong> {generatedIdentity.type}</p>
              <p><strong>Tags:</strong> {generatedIdentity.tags}</p>
              <p><strong>Cost per Response:</strong> {generatedIdentity.costPerResponse} ETH</p>
              <p><strong>Address:</strong> {generatedIdentity.address}</p>
              <p><strong>DID:</strong> {generatedIdentity.did}</p>
            </div>
          )}
          <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

