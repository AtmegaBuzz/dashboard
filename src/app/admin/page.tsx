"use client"

import * as React from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

// Mock data for AI agents
const data = [
  {
    name: "Agent Alpha",
    address: "0x1234...5678",
    did: "did:example:123456789abcdefghi",
    totalVCs: 15,
  },
  {
    name: "Agent Beta",
    address: "0xabcd...efgh",
    did: "did:example:987654321ihgfedcba",
    totalVCs: 8,
  },
  {
    name: "Agent Gamma",
    address: "0x9876...5432",
    did: "did:example:abcdef123456789ghi",
    totalVCs: 23,
  },
  {
    name: "Agent Delta",
    address: "0xfedc...ba98",
    did: "did:example:456789abcdef123ghi",
    totalVCs: 12,
  },
]

function AdminDashboardHeader({ heading, text }: { heading: string; text?: string }) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
    </div>
  )
}

function AgentTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>DID</TableHead>
            <TableHead>Total VCs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((agent) => (
            <TableRow key={agent.did}>
              <TableCell>{agent.name}</TableCell>
              <TableCell>{agent.address}</TableCell>
              <TableCell>{agent.did}</TableCell>
              <TableCell>{agent.totalVCs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function AdminDashboardPage() {
  const totalAgents = data.length
  const totalVCs = data.reduce((sum, agent) => sum + agent.totalVCs, 0)

  return (
      <main className="flex-1 space-y-4 p-8 pt-6">
        <AdminDashboardHeader heading="Admin Panel" text="Approve all users into P3 Agent Network." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Verified Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAgents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Unverified Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVCs}</div>
            </CardContent>
          </Card>
        </div>
        <AgentTable />
      </main>
  )
}

