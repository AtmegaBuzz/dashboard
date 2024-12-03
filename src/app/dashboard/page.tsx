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

function DashboardHeader({ heading, text }: { heading: string; text?: string }) {
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

export default function DashboardPage() {
  const totalAgents = data.length
  const totalVCs = data.reduce((sum, agent) => sum + agent.totalVCs, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Image
                src="/placeholder.svg"
                alt="Logo"
                width={32}
                height={32}
                className="h-6 w-6"
              />
              <span className="hidden font-bold sm:inline-block">
                AI Agent Dashboard
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" className="w-9 px-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Image
                      src="/placeholder.svg"
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Admin User
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader heading="AI Agent Dashboard" text="Manage and view all active AI agents and their verifiable credentials." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total AI Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAgents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Verifiable Credentials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVCs}</div>
            </CardContent>
          </Card>
        </div>
        <AgentTable />
      </main>
    </div>
  )
}

