"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Bot, ArrowLeft, Globe, Copy, Check, Send, Loader2, Calendar, User, Hash } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Agent } from "@/apis/registry/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AgentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [agent, setAgent] = useState<Agent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    useEffect(() => {
        const dataParam = searchParams.get("data");
        if (dataParam) {
            try {
                const agentData = JSON.parse(decodeURIComponent(dataParam));
                setAgent(agentData);
            } catch (err) {
                setError("Invalid agent data");
                console.error("Error parsing agent data:", err);
            }
        } else {
            setError("Agent not found");
        }
        setLoading(false);
    }, [searchParams]);

    const httpUrl = agent ? `https://api.p3ai.network/agents/${agent.id}/invoke` : "";

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmitPrompt = async () => {
        if (!prompt.trim()) return;

        setIsSubmitting(true);
        setResponse(null);

        // Simulate API call with dummy response
        await new Promise(resolve => setTimeout(resolve, 1500));

        const dummyResponse = {
            status: "success",
            agent: agent?.name,
            response: `This is a dummy response from ${agent?.name}. In production, this would be the actual response from the agent after processing your prompt: "${prompt}"`,
            timestamp: new Date().toISOString(),
            metadata: {
                processingTime: "1.2s",
                tokensUsed: 150
            }
        };

        setResponse(JSON.stringify(dummyResponse, null, 2));
        setIsSubmitting(false);
    };

    const allCapabilities = agent?.capabilities
        ? Object.entries(agent.capabilities).filter(([_, values]) => values && values.length > 0)
        : [];

    return (
        <>
            <SiteHeader />
            <main className="min-h-screen bg-white pt-24">
                {/* Background decorative elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#10B981] opacity-10 blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 pb-24">
                    {/* Back Button */}
                    <Button
                        variant="outline"
                        onClick={() => router.push("/registry")}
                        className="mb-6 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Registry
                    </Button>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader2 className="h-10 w-10 text-[#7678ed] animate-spin mb-4" />
                            <p className="text-gray-500">Loading agent details...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="text-center py-16">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                                <p className="text-red-600 font-medium">{error}</p>
                                <Button
                                    onClick={() => router.push("/registry")}
                                    className="mt-4 bg-gradient-to-r from-[#7678ed] to-[#3B82F6] text-white"
                                >
                                    Return to Registry
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Agent Details */}
                    {!loading && !error && agent && (
                        <div className="max-w-4xl mx-auto">
                            {/* Agent Header */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="size-16 rounded-xl bg-gradient-to-br from-[#7678ed]/10 to-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                                        <Bot className="size-8 text-[#7678ed]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                                            <Badge
                                                className={`text-sm ${agent.status === "ACTIVE"
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                                    : agent.status === "INACTIVE"
                                                        ? "bg-gray-50 text-gray-600 border-gray-200"
                                                        : "bg-red-50 text-red-600 border-red-200"
                                                    }`}
                                            >
                                                {agent.status}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 mt-2">{agent.description || "No description available"}</p>
                                    </div>
                                </div>

                                {/* Agent Meta Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Hash className="h-4 w-4" />
                                        <span className="truncate" title={agent.did}>DID: {agent.did.slice(0, 20)}...</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <User className="h-4 w-4" />
                                        <span className="truncate">Owner: {agent.owner?.walletAddress?.slice(0, 10)}...</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="h-4 w-4" />
                                        <span>Created: {new Date(agent.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Capabilities */}
                            {allCapabilities.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Capabilities</h2>
                                    <div className="space-y-4">
                                        {allCapabilities.map(([category, capabilities]) => (
                                            <div key={category}>
                                                <h3 className="text-sm font-medium text-gray-500 capitalize mb-2">{category}</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {capabilities?.map((cap, idx) => (
                                                        <span
                                                            key={`${cap}-${idx}`}
                                                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-[#7678ed]/10 text-[#7678ed]"
                                                        >
                                                            {cap}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* HTTP Endpoint */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">HTTP Endpoint</h2>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm text-gray-700 overflow-x-auto">
                                        {httpUrl}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(httpUrl)}
                                        className="bg-white text-gray-700 border-gray-200 hover:bg-gray-50 flex-shrink-0"
                                    >
                                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            {/* Prompt Section */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Agent</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                                            Prompt
                                        </label>
                                        <textarea
                                            id="prompt"
                                            rows={4}
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="Enter your prompt to test this agent..."
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20 transition-all resize-none"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleSubmitPrompt}
                                        disabled={!prompt.trim() || isSubmitting}
                                        className="bg-gradient-to-r from-[#7678ed] to-[#3B82F6] text-white hover:opacity-90 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Submit
                                            </>
                                        )}
                                    </Button>

                                    {/* Response Section */}
                                    {response && (
                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Response
                                            </label>
                                            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                                                    {response}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
