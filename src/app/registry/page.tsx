"use client"

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Bot, ChevronLeft, ChevronRight, Filter, X, Loader2 } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getAgents } from "@/apis/registry";
import { Agent, AgentStatus, GetAgentsParams } from "@/apis/registry/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 12;

function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
    // Flatten capabilities from object structure
    const allCapabilities = agent.capabilities
        ? Object.values(agent.capabilities).flat().filter(Boolean) as string[]
        : [];
    const displayCapabilities = allCapabilities.slice(0, 3);
    const remainingCount = allCapabilities.length - 3;

    return (
        <div
            onClick={onClick}
            className="bg-white border border-black/5 rounded-xl p-5 hover:shadow-lg hover:shadow-[#7678ed]/10 hover:border-[#7678ed]/20 transition-all duration-300 group cursor-pointer">
            <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-gradient-to-br from-[#7678ed]/10 to-[#3B82F6]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#7678ed]/20 group-hover:to-[#3B82F6]/20 transition-colors">
                    <Bot className="size-6 text-[#7678ed]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">{agent.name}</h3>
                        <Badge
                            className={`text-xs ${agent.status === "ACTIVE"
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : agent.status === "INACTIVE"
                                        ? "bg-gray-50 text-gray-600 border-gray-200"
                                        : "bg-red-50 text-red-600 border-red-200"
                                }`}
                        >
                            {agent.status}
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{agent.description || "No description available"}</p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {displayCapabilities.map((capability, idx) => (
                    <span
                        key={`${capability}-${idx}`}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#7678ed]/10 text-[#7678ed]"
                    >
                        {capability}
                    </span>
                ))}
                {remainingCount > 0 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                        +{remainingCount} more
                    </span>
                )}
                {allCapabilities.length === 0 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500 italic">
                        No capabilities
                    </span>
                )}
            </div>
        </div>
    );
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
}) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-700">{startItem}</span> to{" "}
                <span className="font-medium text-gray-700">{endItem}</span> of{" "}
                <span className="font-medium text-gray-700">{totalItems}</span> agents
            </p>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 px-3 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:text-gray-400"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((page, idx) => (
                    typeof page === "number" ? (
                        <Button
                            key={idx}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(page)}
                            className={`h-9 w-9 ${currentPage === page
                                ? "bg-gradient-to-r from-[#7678ed] to-[#3B82F6] text-white border-none shadow-md"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            {page}
                        </Button>
                    ) : (
                        <span key={idx} className="px-2 text-gray-400">
                            {page}
                        </span>
                    )
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:text-gray-400"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default function RegistryPage() {
    const router = useRouter();
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<AgentStatus | "ALL">("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter]);

    // Fetch agents from API
    const fetchAgents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params: GetAgentsParams = {
                limit: ITEMS_PER_PAGE,
                offset: (currentPage - 1) * ITEMS_PER_PAGE,
            };

            if (debouncedSearch.trim()) {
                params.name = debouncedSearch.trim();
            }

            if (statusFilter !== "ALL") {
                params.status = statusFilter;
            }

            const response = await getAgents(params);
            setAgents(response.data);
            setTotalItems(response.total);
        } catch (err) {
            setError("Failed to load agents. Please try again.");
            console.error("Error fetching agents:", err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, debouncedSearch, statusFilter]);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("ALL");
        setCurrentPage(1);
    };

    const hasActiveFilters = searchQuery.trim() || statusFilter !== "ALL";

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
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
                            Agent{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#3B82F6]">
                                Registry
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover and connect with AI agents registered on the P3 Protocol.
                            Find the perfect agent for your needs.
                        </p>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search agents by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20 transition-all text-gray-900 placeholder:text-gray-400"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex gap-2">
                                <Select
                                    value={statusFilter}
                                    onValueChange={(value) => setStatusFilter(value as AgentStatus | "ALL")}
                                >
                                    <SelectTrigger className="w-[160px] h-12 bg-white text-gray-700 border-gray-200 focus:border-[#7678ed] focus:ring-2 focus:ring-[#7678ed]/20">
                                        <div className="flex items-center gap-2">
                                            <Filter className="h-4 w-4 text-gray-400" />
                                            <SelectValue placeholder="Status" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-200">
                                        <SelectItem value="ALL" className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 data-[state=checked]:bg-[#7678ed]/10 data-[state=checked]:text-[#7678ed]">All Status</SelectItem>
                                        <SelectItem value="ACTIVE" className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 data-[state=checked]:bg-[#7678ed]/10 data-[state=checked]:text-[#7678ed]">Active</SelectItem>
                                        <SelectItem value="INACTIVE" className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 data-[state=checked]:bg-[#7678ed]/10 data-[state=checked]:text-[#7678ed]">Inactive</SelectItem>
                                        <SelectItem value="DEPRECATED" className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 data-[state=checked]:bg-[#7678ed]/10 data-[state=checked]:text-[#7678ed]">Deprecated</SelectItem>
                                    </SelectContent>
                                </Select>

                                {hasActiveFilters && (
                                    <Button
                                        variant="outline"
                                        onClick={clearFilters}
                                        className="h-12 px-4 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Results count and active filters */}
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <p className="text-sm text-gray-500">
                                {loading ? (
                                    "Searching..."
                                ) : (
                                    <>
                                        <span className="font-medium text-gray-700">{totalItems}</span> agent
                                        {totalItems !== 1 ? "s" : ""} found
                                    </>
                                )}
                            </p>
                            {hasActiveFilters && (
                                <div className="flex flex-wrap gap-2 ml-2">
                                    {debouncedSearch && (
                                        <Badge
                                            variant="outline"
                                            className="bg-[#7678ed]/10 text-[#7678ed] border-[#7678ed]/20"
                                        >
                                            Name: &quot;{debouncedSearch}&quot;
                                        </Badge>
                                    )}
                                    {statusFilter !== "ALL" && (
                                        <Badge
                                            variant="outline"
                                            className="bg-[#7678ed]/10 text-[#7678ed] border-[#7678ed]/20"
                                        >
                                            Status: {statusFilter}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader2 className="h-10 w-10 text-[#7678ed] animate-spin mb-4" />
                            <p className="text-gray-500">Loading agents...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="text-center py-16">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                                <p className="text-red-600 font-medium">{error}</p>
                                <Button
                                    onClick={fetchAgents}
                                    className="mt-4 bg-gradient-to-r from-[#7678ed] to-[#3B82F6] text-white"
                                >
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Agent Cards Grid */}
                    {!loading && !error && agents.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {agents.map((agent) => (
                                    <AgentCard
                                        key={agent.id}
                                        agent={agent}
                                        onClick={() => router.push(`/registry/${agent.id}?data=${encodeURIComponent(JSON.stringify(agent))}`)}
                                    />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                totalItems={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                            />
                        </>
                    )}

                    {/* No Results */}
                    {!loading && !error && agents.length === 0 && (
                        <div className="text-center py-16">
                            <Bot className="size-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No agents found</h3>
                            <p className="text-gray-500 mb-6">
                                {hasActiveFilters
                                    ? "Try adjusting your search or filters"
                                    : "No agents have been registered yet"}
                            </p>
                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="border-[#7678ed] text-[#7678ed] hover:bg-[#7678ed]/10"
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
